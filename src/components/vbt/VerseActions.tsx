"use client";
import { useState } from "react";
import { quoteWithCite, verseUrl } from "@/lib/vbt/cite";
import { vbtStrings } from "@/lib/vbt/strings";

type Props = { chapter: number; verse: number; text: string };

export function VerseActions({ chapter, verse, text }: Props) {
  const [copied, setCopied] = useState<"verse" | "link" | null>(null);

  async function handleCopyVerse() {
    await navigator.clipboard.writeText(quoteWithCite(text, chapter, verse));
    setCopied("verse");
    setTimeout(() => setCopied(null), 2000);
  }

  async function handleCopyLink() {
    await navigator.clipboard.writeText(verseUrl(chapter, verse));
    setCopied("link");
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div
      className="verse-actions"
      role="group"
      aria-label={`Ações do versículo ${verse}`}
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
