"use client";
import { useState, useEffect } from "react";
import { vbtStrings } from "@/lib/vbt/strings";

export type FontSize = "S" | "M" | "L";

export const FONT_SIZE_MAP: Record<FontSize, string> = {
  S: "0.95rem",
  M: "1.1rem",
  L: "1.25rem",
};

export function ReaderSettings({
  onSizeChange,
  onNotesChange,
}: {
  onSizeChange: (size: FontSize) => void;
  onNotesChange: (show: boolean) => void;
}) {
  const [size, setSize] = useState<FontSize>(() => {
    try {
      const s = localStorage.getItem("vbt-font-size") as FontSize | null;
      if (s && (["S", "M", "L"] as string[]).includes(s)) return s;
    } catch {}
    return "M";
  });

  const [showNotes, setShowNotes] = useState<boolean>(() => {
    try {
      const n = localStorage.getItem("vbt-show-notes");
      if (n !== null) return n !== "false";
    } catch {}
    return true;
  });

  useEffect(() => {
    onSizeChange(size);
    onNotesChange(showNotes);
  }, [size, showNotes, onSizeChange, onNotesChange]);

  function handleSize(s: FontSize) {
    setSize(s);
    onSizeChange(s);
    try {
      localStorage.setItem("vbt-font-size", s);
    } catch {}
  }

  function handleNotes() {
    const next = !showNotes;
    setShowNotes(next);
    onNotesChange(next);
    try {
      localStorage.setItem("vbt-show-notes", String(next));
    } catch {}
  }

  return (
    <div className="reader-settings" aria-label={vbtStrings.fontSizeLabel}>
      <div role="group" aria-label={vbtStrings.fontSizeLabel}>
        {(["S", "M", "L"] as FontSize[]).map((s) => (
          <button
            key={s}
            onClick={() => handleSize(s)}
            aria-pressed={size === s}
            style={{ fontWeight: size === s ? "700" : "400" }}
          >
            {s}
          </button>
        ))}
      </div>
      <button onClick={handleNotes} aria-pressed={showNotes}>
        {showNotes ? vbtStrings.hideNotes : vbtStrings.showNotes}
      </button>
    </div>
  );
}
