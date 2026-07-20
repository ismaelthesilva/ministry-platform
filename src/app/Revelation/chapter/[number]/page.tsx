import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "../../../../components/Navbar";
import ChapterReader from "../../_components/ChapterReader";
import {
  chapterRegistry,
  getChapterMeta,
  getPartMeta,
} from "../../content/registry";
import { loadChapter } from "../../content/loaders";
import { bookMeta } from "../../content/front-matter";

export function generateStaticParams() {
  return chapterRegistry.map((c) => ({ number: String(c.number) }));
}

type PageProps = {
  params: Promise<{ number: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { number } = await params;
  const meta = getChapterMeta(Number(number));
  if (!meta) return {};
  return {
    title: `${meta.title} — ${bookMeta.title}, Capítulo ${meta.number}`,
    description:
      meta.subtitle ??
      `Capítulo ${meta.number} de ${bookMeta.title}: uma jornada cronológica pelo livro do Apocalipse.`,
  };
}

export default async function RevelationChapterPage({ params }: PageProps) {
  const { number } = await params;
  const chapterNumber = Number(number);

  if (!Number.isInteger(chapterNumber) || !getChapterMeta(chapterNumber)) {
    notFound();
  }

  const chapter = await loadChapter(chapterNumber);
  if (!chapter) {
    notFound();
  }

  const prev = getChapterMeta(chapterNumber - 1);
  const next = getChapterMeta(chapterNumber + 1);
  const part = getPartMeta(chapter.part);

  return (
    <>
      <Navbar />
      <ChapterReader chapter={chapter} prev={prev} next={next} part={part} />
    </>
  );
}
