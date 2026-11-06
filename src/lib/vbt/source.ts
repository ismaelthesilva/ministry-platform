import "server-only";
import fs from "fs";
import path from "path";
import type { VbtBook } from "./types";
import { VBT_LANGS, type VbtLang } from "./lang";

const REPO_RAW =
  "https://raw.githubusercontent.com/ismaelthesilva/veni-bible/main";

function sourceUrl(lang: VbtLang) {
  // VBT_SOURCE_URL overrides the Portuguese source; VBT_SOURCE_URL_EN the English one
  const override =
    lang === "en" ? process.env.VBT_SOURCE_URL_EN : process.env.VBT_SOURCE_URL;
  return override ?? `${REPO_RAW}/${VBT_LANGS[lang].repoJsonPath}`;
}

export async function getRevelation(lang: VbtLang = "pt"): Promise<VbtBook> {
  try {
    const res = await fetch(sourceUrl(lang), {
      next: { revalidate: 86400, tags: ["vbt"] },
    });
    if (!res.ok) throw new Error(`VBT source failed: ${res.status}`);
    const book = (await res.json()) as VbtBook;
    assertBook(book);
    return book;
  } catch (err) {
    console.warn(
      `[VBT] Remote fetch failed (${lang}), using local fallback. Error: ${err}`
    );
    const localPath = path.resolve(
      process.cwd(),
      VBT_LANGS[lang].localJsonPath
    );
    const raw = fs.readFileSync(localPath, "utf8");
    const book = JSON.parse(raw) as VbtBook;
    assertBook(book);
    return book;
  }
}

function assertBook(b: VbtBook) {
  const verses = b.chapters.reduce((n, c) => n + c.verses.length, 0);
  if (b.book !== "REV" || b.chapters.length !== 22 || verses !== 404) {
    throw new Error(
      `VBT data check failed: ${b.chapters.length} chapters, ${verses} verses`
    );
  }
}
