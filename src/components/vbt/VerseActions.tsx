"use client";
import { useState } from "react";
import { quoteWithCite, verseUrl } from "@/lib/vbt/cite";
import { getVbtStrings } from "@/lib/vbt/strings";
import type { VbtLang } from "@/lib/vbt/lang";

type Props = { chapter: number; verse: number; text: string; lang?: VbtLang };

export function VerseActions({ chapter, verse, text, lang = "pt" }: Props) {
  const vbtStrings = getVbtStrings(lang);
  const [copied, setCopied] = useState<"verse" | "link" | null>(null);

  async function handleCopyVerse() {
    await navigator.clipboard.writeText(
      quoteWithCite(text, chapter, verse, lang)
    );
    setCopied("verse");
    setTimeout(() => setCopied(null), 2000);
  }

  async function handleCopyLink() {
    await navigator.clipboard.writeText(verseUrl(chapter, verse, lang));
    setCopied("link");
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div
      className="verse-actions"
      role="group"
      aria-label={vbtStrings.verseActionsLabel(verse)}
    >
      <button onClick={handleCopyVerse} className="verse-action-btn">
        {copied === "verse" ? vbtStrings.copied : vbtStrings.copyVerse}
      </button>
      <button onClick={handleCopyLink} className="verse-action-btn">
        {copied === "link" ? vbtStrings.copied : vbtStrings.copyLink}
      </button>
    </div>
  );
}
