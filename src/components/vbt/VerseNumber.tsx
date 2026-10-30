export function VerseNumber({ n }: { n: number }) {
  return (
    <sup id={`v${n}`} className="verse-num" style={{ scrollMarginTop: "80px" }}>
      <a href={`#v${n}`} aria-label={`Versículo ${n}`} tabIndex={0}>
        {n}
      </a>
    </sup>
  );
}
