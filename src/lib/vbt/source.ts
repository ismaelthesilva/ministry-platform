import "server-only";
import fs from "fs";
import path from "path";
import type { VbtBook } from "./types";

const DEFAULT_URL =
  "https://raw.githubusercontent.com/ismaelthesilva/veni-bible/main/pt-BR/revelation/json/revelation.json";

export async function getRevelation(): Promise<VbtBook> {
  const url = process.env.VBT_SOURCE_URL ?? DEFAULT_URL;
  try {
    const res = await fetch(url, {
      next: { revalidate: 86400, tags: ["vbt"] },
    });
    if (!res.ok) throw new Error(`VBT source failed: ${res.status}`);
    const book = (await res.json()) as VbtBook;
    assertBook(book);
    return book;
  } catch (err) {
    console.warn(
      `[VBT] Remote fetch failed, using local fallback. Error: ${err}`
    );
    const localPath = path.resolve(
      process.cwd(),
      "src/content/vbt/revelation.json"
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
