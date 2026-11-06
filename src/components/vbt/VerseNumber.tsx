import { getVbtStrings } from "@/lib/vbt/strings";
import type { VbtLang } from "@/lib/vbt/lang";

export function VerseNumber({ n, lang = "pt" }: { n: number; lang?: VbtLang }) {
  return (
    <sup id={`v${n}`} className="verse-num" style={{ scrollMarginTop: "80px" }}>
      <a
        href={`#v${n}`}
        aria-label={getVbtStrings(lang).verseLabel(n)}
        tabIndex={0}
      >
        {n}
      </a>
    </sup>
  );
}
