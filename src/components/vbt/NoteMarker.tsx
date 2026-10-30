export function NoteMarker({ verse }: { verse: number }) {
  return (
    <sup aria-label={`Nota do versículo ${verse}`}>
      <a href={`#nota-${verse}`} className="note-marker">
        •
      </a>
    </sup>
  );
}
