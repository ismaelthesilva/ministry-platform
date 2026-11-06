import type { Metadata } from "next";
import Link from "next/link";
import { getRevelation } from "@/lib/vbt/source";
import { VbtSearch } from "@/components/vbt/VbtSearch";
import { getVbtStrings } from "@/lib/vbt/strings";

export const revalidate = 86400;

const strings = getVbtStrings("en");

export const metadata: Metadata = {
  title: "Revelation — Veni Bible Translation (VBT)",
  description:
    "Contents of the 22 chapters of Revelation in the Veni Bible Translation.",
  alternates: {
    canonical: "https://ismaelsilva.org/venibible/revelation",
    languages: {
      en: "https://ismaelsilva.org/venibible/revelation",
      "pt-BR": "https://ismaelsilva.org/venibible/apocalipse",
    },
  },
};

export default async function RevelationIndexPage() {
  const book = await getRevelation("en");

  return (
    <main id="main-content" lang="en">
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
        {strings.skipToText}
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
            href="/venibible?lang=en"
            style={{ color: "#1D4E89", fontSize: "0.9rem" }}
          >
            ← Veni Bible Translation
          </Link>
          <Link
            href="/venibible/apocalipse"
            hrefLang="pt-BR"
            style={{ color: "#1D4E89", fontSize: "0.9rem" }}
          >
            {strings.otherLanguage}
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
          {strings.chapterIndexTitle}
        </h1>

        <VbtSearch book={book} lang="en" />

        <ul className="chapter-grid">
          {book.chapters.map((ch) => (
            <li key={ch.chapter}>
              <Link href={`/venibible/revelation/${ch.chapter}`}>
                <strong>Revelation {ch.chapter}</strong>
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
