import type { VbtBlock, VbtChapter, VbtSegment } from "@/lib/vbt/types";
import { VerseNumber } from "./VerseNumber";
import { NoteMarker } from "./NoteMarker";

type BlockGroup =
  | { type: "heading"; blocks: [Extract<VbtBlock, { type: "heading" }>] }
  | { type: "paragraph"; blocks: [Extract<VbtBlock, { type: "paragraph" }>] }
  | { type: "poetry-group"; blocks: Extract<VbtBlock, { type: "poetry" }>[] };

function isLastSegmentOfVerse(
  segments: VbtSegment[],
  idx: number,
  verse: number
): boolean {
  for (let i = idx + 1; i < segments.length; i++) {
    if (segments[i].verse === verse) return false;
  }
  return true;
}

export function ChapterText({ chapter }: { chapter: VbtChapter }) {
  const versesWithNotes = new Set(
    chapter.verses.filter((v) => v.note).map((v) => v.verse)
  );

  const groups: BlockGroup[] = [];
  for (const block of chapter.blocks) {
    if (block.type === "poetry") {
      const last = groups[groups.length - 1];
      if (last?.type === "poetry-group") {
        last.blocks.push(block);
      } else {
        groups.push({ type: "poetry-group", blocks: [block] });
      }
    } else if (block.type === "heading") {
      groups.push({ type: "heading", blocks: [block] });
    } else {
      groups.push({ type: "paragraph", blocks: [block] });
    }
  }

  return (
    <div className="chapter-text">
      {groups.map((group, gi) => {
        if (group.type === "heading") {
          return (
            <h2 key={gi} className="section-heading">
              {group.blocks[0].text}
            </h2>
          );
        }

        if (group.type === "paragraph") {
          const { segments } = group.blocks[0];
          return (
            <p key={gi} className="verse-paragraph">
              {segments.map((seg, si) => (
                <span key={si}>
                  {seg.startsVerse && <VerseNumber n={seg.verse} />}
                  {seg.text}
                  {versesWithNotes.has(seg.verse) &&
                    isLastSegmentOfVerse(segments, si, seg.verse) && (
                      <NoteMarker verse={seg.verse} />
                    )}
                </span>
              ))}
            </p>
          );
        }

        // poetry-group
        return (
          <div key={gi} className="poetry-group">
            {group.blocks.map((block, bi) => {
              const { segments } = block;
              return (
                <span key={bi} className="poetry-line">
                  {segments.map((seg, si) => (
                    <span key={si}>
                      {seg.startsVerse && <VerseNumber n={seg.verse} />}
                      {seg.text}
                      {versesWithNotes.has(seg.verse) &&
                        isLastSegmentOfVerse(segments, si, seg.verse) && (
                          <NoteMarker verse={seg.verse} />
                        )}
                    </span>
                  ))}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
