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
import {
  getChapterMeta as getChapterMetaEn,
  getPartMeta as getPartMetaEn,
} from "../../content-en/registry";
import { loadChapter as loadChapterEn } from "../../content-en/loaders";
import { bookMeta as bookMetaEn } from "../../content-en/front-matter";

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
  const meta = getChapterMetaEn(Number(number));
  if (!meta) return {};
  return {
    title: `${meta.title} — ${bookMetaEn.title}, Chapter ${meta.number}`,
    description:
      meta.subtitle ??
      `Chapter ${meta.number} of ${bookMetaEn.title}: a chronological journey through the book of Revelation.`,
  };
}

export default async function RevelationChapterPage({ params }: PageProps) {
  const { number } = await params;
  const chapterNumber = Number(number);

  if (!Number.isInteger(chapterNumber) || !getChapterMeta(chapterNumber)) {
    notFound();
  }

  const [chapterPt, chapterEn] = await Promise.all([
    loadChapter(chapterNumber),
    loadChapterEn(chapterNumber),
  ]);
  if (!chapterPt || !chapterEn) {
    notFound();
  }

  const prevPt = getChapterMeta(chapterNumber - 1);
  const nextPt = getChapterMeta(chapterNumber + 1);
  const prevEn = getChapterMetaEn(chapterNumber - 1);
  const nextEn = getChapterMetaEn(chapterNumber + 1);
  const partPt = getPartMeta(chapterPt.part);
  const partEn = getPartMetaEn(chapterEn.part);

  return (
    <>
      <Navbar />
      <ChapterReader
        chapterPt={chapterPt}
        chapterEn={chapterEn}
        prevPt={prevPt}
        nextPt={nextPt}
        prevEn={prevEn}
        nextEn={nextEn}
        partPt={partPt}
        partEn={partEn}
      />
    </>
  );
}
