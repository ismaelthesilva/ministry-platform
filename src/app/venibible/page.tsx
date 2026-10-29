import type { Metadata } from "next";
import VeniBibleContent from "./VeniBibleContent";

const SITE_URL = "https://ismaelsilva.org";
const OG_IMAGE = `${SITE_URL}/ministry-images/vbt-logo-star-v3-premium-web.jpg`;

type Props = {
  searchParams: Promise<{ lang?: string }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const params = await searchParams;
  // Plain link (/venibible) is the EN entry point; PT only when ?lang=pt
  const isPt = params.lang === "pt" || params.lang === "br";

  const title = "Veni Bible Translation (VBT)";
  const descriptionEn =
    "An independent translation of the Bible from the Greek and Hebrew, in Portuguese and English. Starting with Revelation.";
  const descriptionPt =
    "Uma tradução independente da Bíblia a partir do grego e do hebraico, em português e inglês. Começando pelo Apocalipse.";
  const description = isPt ? descriptionPt : descriptionEn;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/venibible` },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/venibible`,
      siteName: "Veni Bible Translation",
      title,
      description,
      images: [
        {
          url: OG_IMAGE,
          width: 2048,
          height: 2048,
          alt: "Veni Bible Translation — VBT",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}

export default function VeniBiblePage() {
  return <VeniBibleContent />;
}
