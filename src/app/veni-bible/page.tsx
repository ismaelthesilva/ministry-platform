import type { Metadata } from "next";
import VeniBibleContent from "./VeniBibleContent";

type Props = {
  searchParams: Promise<{ lang?: string }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const params = await searchParams;
  const isEn = params.lang === "en";

  const base = {
    alternates: { canonical: "/veni-bible" },
    openGraph: {
      type: "website" as const,
      images: [
        {
          url: "/ministry-images/vbt-logo.jpeg",
          width: 2048,
          height: 2048,
          alt: isEn ? "VBT seal" : "Selo da Veni Bible Translation",
        },
      ],
    },
  };

  if (isEn) {
    return {
      ...base,
      title: "Veni Bible Translation (VBT)",
      description:
        "An independent translation of the Bible from the Greek and Hebrew, in Portuguese and English. Starting with Revelation.",
      openGraph: {
        ...base.openGraph,
        title: "Veni Bible Translation (VBT)",
        description:
          "An independent translation of the Bible from the Greek and Hebrew, in Portuguese and English. Starting with Revelation.",
      },
    };
  }

  return {
    ...base,
    title: "Veni Bible Translation (VBT)",
    description:
      "Uma tradução independente da Bíblia a partir do grego e do hebraico, em português e inglês. Começando pelo Apocalipse.",
    openGraph: {
      ...base.openGraph,
      title: "Veni Bible Translation (VBT)",
      description:
        "Uma tradução independente da Bíblia a partir do grego e do hebraico, em português e inglês. Começando pelo Apocalipse.",
    },
  };
}

export default function VeniBiblePage() {
  return <VeniBibleContent />;
}
