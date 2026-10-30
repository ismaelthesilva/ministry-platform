import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getRevelation } from "@/lib/vbt/source";
import { ReaderWrapper } from "@/components/vbt/ReaderWrapper";

export const revalidate = 86400;

export async function generateStaticParams() {
  return Array.from({ length: 22 }, (_, i) => ({ chapter: String(i + 1) }));
}

type Props = { params: Promise<{ chapter: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { chapter: chapterStr } = await params;
  const n = parseInt(chapterStr);
  if (isNaN(n) || n < 1 || n > 22) return {};
  const book = await getRevelation();
  const ch = book.chapters.find((c) => c.chapter === n);
  const firstVerse = ch?.verses[0]?.text ?? "";
  const description =
    firstVerse.slice(0, 150) + (firstVerse.length > 150 ? "…" : "");
  return {
    title: `Apocalipse ${n} — Veni Bible Translation (VBT)`,
    description,
    alternates: {
      canonical: `https://ismaelsilva.org/venibible/apocalipse/${n}`,
      languages: {
        "pt-BR": `https://ismaelsilva.org/venibible/apocalipse/${n}`,
      },
    },
    openGraph: {
      title: `Apocalipse ${n} — VBT`,
      description,
      url: `https://ismaelsilva.org/venibible/apocalipse/${n}`,
    },
  };
}

export default async function ChapterPage({ params }: Props) {
  const { chapter: chapterStr } = await params;
  const n = parseInt(chapterStr);
  if (isNaN(n) || n < 1 || n > 22) notFound();

  const book = await getRevelation();
  const chapter = book.chapters.find((c) => c.chapter === n);
  if (!chapter) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Chapter",
    name: `Apocalipse ${n}`,
    isPartOf: {
      "@type": "Book",
      name: book.bookName,
      inLanguage: "pt-BR",
      author: { "@type": "Person", name: "Ismael Silva" },
      license: "https://creativecommons.org/licenses/by-nd/4.0/",
    },
    url: `https://ismaelsilva.org/venibible/apocalipse/${n}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReaderWrapper book={book} chapter={chapter} />
    </>
  );
}
