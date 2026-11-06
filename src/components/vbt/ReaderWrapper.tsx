"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import type { VbtBook, VbtChapter } from "@/lib/vbt/types";
import { ChapterText } from "./ChapterText";
import { ChapterNav } from "./ChapterNav";
import { NotesList } from "./NotesList";
import { ReaderSettings, FONT_SIZE_MAP, type FontSize } from "./ReaderSettings";
import { getVbtStrings } from "@/lib/vbt/strings";
import { vbtLang, type VbtLang } from "@/lib/vbt/lang";

export function ReaderWrapper({
  book,
  chapter,
  lang = "pt",
}: {
  book: VbtBook;
  chapter: VbtChapter;
  lang?: VbtLang;
}) {
  const vbtStrings = getVbtStrings(lang);
  const { htmlLang } = vbtLang(lang);
  const other = vbtLang(lang === "en" ? "pt" : "en");
  const [fontSize, setFontSize] = useState<FontSize>("M");
  const [showNotes, setShowNotes] = useState(true);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash.startsWith("#v")) return;
    const el = document.getElementById(hash.slice(1));
    if (!el) return;
    el.classList.add("verse-highlight");
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => el.classList.remove("verse-highlight"), 2000);
  }, []);

  return (
    <main
      id="main-content"
      lang={htmlLang}
      style={{ fontSize: FONT_SIZE_MAP[fontSize] }}
    >
      <a
        href="#main-content"
        className="skip-link"
        style={{
          position: "absolute",
          left: "-9999px",
          top: "auto",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
        onFocus={(e) => {
          e.currentTarget.style.cssText =
            "position:fixed;left:1rem;top:1rem;z-index:9999;padding:0.5rem 1rem;background:#fff;border:2px solid #1D4E89;border-radius:4px;color:#1D4E89;font-weight:600;width:auto;height:auto;overflow:auto";
        }}
        onBlur={(e) => {
          e.currentTarget.style.cssText =
            "position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden";
        }}
      >
        {vbtStrings.skipToText}
      </a>

      <div className="reader-header">
        <ChapterNav chapter={chapter.chapter} total={22} lang={lang} />
        <ReaderSettings
          onSizeChange={setFontSize}
          onNotesChange={setShowNotes}
          lang={lang}
        />
      </div>

      <article className="reader-article">
        <h1 style={{ marginBottom: "2rem" }}>
          {vbtStrings.chapterTitle(chapter.chapter)}
        </h1>
        <ChapterText chapter={chapter} lang={lang} />
        {showNotes && (
          <NotesList
            chapter={chapter.chapter}
            verses={chapter.verses}
            lang={lang}
          />
        )}
      </article>

      <ChapterNav chapter={chapter.chapter} total={22} lang={lang} />

      <footer className="reader-footer">
        <p>
          <Link
            href={`${other.basePath}/${chapter.chapter}`}
            hrefLang={other.htmlLang}
          >
            {vbtStrings.otherLanguage}
          </Link>
        </p>
        <p>{vbtStrings.attribution(book.version)}</p>
        <p>{vbtStrings.sblgntAttribution}</p>
        <p>
          <a
            href={vbtStrings.licenseUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            CC BY-ND 4.0
          </a>
        </p>
      </footer>
    </main>
  );
}
