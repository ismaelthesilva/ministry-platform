import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Encontros com o Cordeiro | Devocional Diário sobre o Apocalipse",
  description:
    "365 devocionais diários que transformam o livro mais temido da Bíblia no mais consolador — versículo por versículo, do capítulo 1 ao 22.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Encontros com o Cordeiro | Devocional Diário sobre o Apocalipse",
    description:
      "365 devocionais diários que transformam o livro mais temido da Bíblia no mais consolador — versículo por versículo, do capítulo 1 ao 22.",
    siteName: "Ismael Silva Ministry",
    images: [
      {
        url: "/ministry-images/ismael-profile23.jpg",
        width: 1000,
        height: 1000,
        alt: "Ismael Silva — Encontros com o Cordeiro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Encontros com o Cordeiro | Devocional Diário sobre o Apocalipse",
    description:
      "365 devocionais diários que transformam o livro mais temido da Bíblia no mais consolador.",
    images: ["/ministry-images/ismael-profile23.jpg"],
  },
};

export default function EncontrosCordeiroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
