import Link from "next/link";
import { vbtStrings } from "@/lib/vbt/strings";

export function ChapterNav({
  chapter,
  total,
}: {
  chapter: number;
  total: number;
}) {
  return (
    <nav aria-label="Navegação entre capítulos" className="chapter-nav">
      {chapter > 1 ? (
        <Link href={`/venibible/apocalipse/${chapter - 1}`}>
          {vbtStrings.prevChapter}
        </Link>
      ) : (
        <span />
      )}
      <Link href="/venibible/apocalipse">{vbtStrings.indexLink}</Link>
      {chapter < total ? (
        <Link href={`/venibible/apocalipse/${chapter + 1}`}>
          {vbtStrings.nextChapter}
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
