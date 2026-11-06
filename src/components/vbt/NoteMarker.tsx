import { getVbtStrings } from "@/lib/vbt/strings";
import type { VbtLang } from "@/lib/vbt/lang";

export function NoteMarker({
  verse,
  lang = "pt",
}: {
  verse: number;
  lang?: VbtLang;
}) {
  return (
    <sup aria-label={getVbtStrings(lang).noteLabel(verse)}>
      <a href={`#nota-${verse}`} className="note-marker">
        •
      </a>
    </sup>
  );
}
