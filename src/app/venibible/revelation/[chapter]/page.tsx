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
  const book = await getRevelation("en");
  const ch = book.chapters.find((c) => c.chapter === n);
  const firstVerse = ch?.verses[0]?.text ?? "";
  const description =
    firstVerse.slice(0, 150) + (firstVerse.length > 150 ? "…" : "");
  return {
    title: `Revelation ${n} — Veni Bible Translation (VBT)`,
    description,
    alternates: {
      canonical: `https://ismaelsilva.org/venibible/revelation/${n}`,
      languages: {
        en: `https://ismaelsilva.org/venibible/revelation/${n}`,
        "pt-BR": `https://ismaelsilva.org/venibible/apocalipse/${n}`,
      },
    },
    openGraph: {
      title: `Revelation ${n} — VBT`,
      description,
      url: `https://ismaelsilva.org/venibible/revelation/${n}`,
    },
  };
}

export default async function RevelationChapterPage({ params }: Props) {
  const { chapter: chapterStr } = await params;
  const n = parseInt(chapterStr);
  if (isNaN(n) || n < 1 || n > 22) notFound();

  const book = await getRevelation("en");
  const chapter = book.chapters.find((c) => c.chapter === n);
  if (!chapter) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Chapter",
    name: `Revelation ${n}`,
    isPartOf: {
      "@type": "Book",
      name: book.bookName,
      inLanguage: "en",
      author: { "@type": "Person", name: "Ismael Silva" },
      license: "https://creativecommons.org/licenses/by-nd/4.0/",
    },
    url: `https://ismaelsilva.org/venibible/revelation/${n}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReaderWrapper book={book} chapter={chapter} lang="en" />
    </>
  );
}
