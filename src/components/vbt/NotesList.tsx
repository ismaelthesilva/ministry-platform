import type { VbtVerse } from "@/lib/vbt/types";
import { vbtStrings } from "@/lib/vbt/strings";

export function NotesList({
  chapter,
  verses,
}: {
  chapter: number;
  verses: VbtVerse[];
}) {
  const notedVerses = verses.filter((v) => v.note);
  if (notedVerses.length === 0) return null;
  return (
    <section aria-label={vbtStrings.notesTitle} className="notes-section">
      <h2 className="notes-heading">{vbtStrings.notesTitle}</h2>
      <ol className="notes-list">
        {notedVerses.map((v) => (
          <li key={v.verse} id={`nota-${v.verse}`} className="note-item">
            <strong>
              {chapter}:{v.verse}
            </strong>{" "}
            {v.note}{" "}
            <a href={`#v${v.verse}`} aria-label={vbtStrings.backToVerse}>
              ↩
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
