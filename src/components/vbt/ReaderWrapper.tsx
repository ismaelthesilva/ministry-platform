"use client";
import { useState, useEffect } from "react";
import type { VbtBook, VbtChapter } from "@/lib/vbt/types";
import { ChapterText } from "./ChapterText";
import { ChapterNav } from "./ChapterNav";
import { NotesList } from "./NotesList";
import { ReaderSettings, FONT_SIZE_MAP, type FontSize } from "./ReaderSettings";
import { vbtStrings } from "@/lib/vbt/strings";

export function ReaderWrapper({
  book,
  chapter,
}: {
  book: VbtBook;
  chapter: VbtChapter;
}) {
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
      lang="pt-BR"
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
        <ChapterNav chapter={chapter.chapter} total={22} />
        <ReaderSettings
          onSizeChange={setFontSize}
          onNotesChange={setShowNotes}
        />
      </div>

      <article className="reader-article">
        <h1 style={{ marginBottom: "2rem" }}>
          {vbtStrings.chapterTitle(chapter.chapter)}
        </h1>
        <ChapterText chapter={chapter} />
        {showNotes && (
          <NotesList chapter={chapter.chapter} verses={chapter.verses} />
        )}
      </article>

      <ChapterNav chapter={chapter.chapter} total={22} />

      <footer className="reader-footer">
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
