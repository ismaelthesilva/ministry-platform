import Link from "next/link";
import { getVbtStrings } from "@/lib/vbt/strings";
import { vbtLang, type VbtLang } from "@/lib/vbt/lang";

export function ChapterNav({
  chapter,
  total,
  lang = "pt",
}: {
  chapter: number;
  total: number;
  lang?: VbtLang;
}) {
  const s = getVbtStrings(lang);
  const base = vbtLang(lang).basePath;
  return (
    <nav aria-label={s.chapterNavLabel} className="chapter-nav">
      {chapter > 1 ? (
        <Link href={`${base}/${chapter - 1}`}>{s.prevChapter}</Link>
      ) : (
        <span />
      )}
      <Link href={base}>{s.indexLink}</Link>
      {chapter < total ? (
        <Link href={`${base}/${chapter + 1}`}>{s.nextChapter}</Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
