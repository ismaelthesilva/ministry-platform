import type { Metadata } from "next";
import Link from "next/link";
import { getRevelation } from "@/lib/vbt/source";
import { VbtSearch } from "@/components/vbt/VbtSearch";
import { vbtStrings } from "@/lib/vbt/strings";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Apocalipse — Veni Bible Translation (VBT)",
  description:
    "Índice dos 22 capítulos do Apocalipse na Veni Bible Translation.",
  alternates: {
    canonical: "https://ismaelsilva.org/venibible/apocalipse",
    languages: {
      "pt-BR": "https://ismaelsilva.org/venibible/apocalipse",
      en: "https://ismaelsilva.org/venibible/revelation",
    },
  },
};

export default async function ApocalipseIndexPage() {
  const book = await getRevelation();

  return (
    <main id="main-content" lang="pt-BR">
      <a
        href="#main-content"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        {vbtStrings.skipToText}
      </a>

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "2rem 1rem",
        }}
      >
        <div
          style={{
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <Link
            href="/venibible?lang=pt"
            style={{ color: "#1D4E89", fontSize: "0.9rem" }}
          >
            ← Veni Bible Translation
          </Link>
          <Link
            href="/venibible/revelation"
            hrefLang="en"
            style={{ color: "#1D4E89", fontSize: "0.9rem" }}
          >
            {vbtStrings.otherLanguage}
          </Link>
        </div>

        <h1
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
            fontWeight: "700",
            color: "#0F2747",
            marginBottom: "1.5rem",
          }}
        >
          {vbtStrings.chapterIndexTitle}
        </h1>

        <VbtSearch book={book} />

        <ul className="chapter-grid">
          {book.chapters.map((ch) => (
            <li key={ch.chapter}>
              <Link href={`/venibible/apocalipse/${ch.chapter}`}>
                <strong>Apocalipse {ch.chapter}</strong>
                {ch.headings.length > 0 && (
                  <ul>
                    {ch.headings.map((h, i) => (
                      <li key={i}>{h.text}</li>
                    ))}
                  </ul>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
