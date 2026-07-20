import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ScrollText } from "lucide-react";
import Navbar from "../../../components/Navbar";
import { references, bookMeta } from "../content/front-matter";
import { RichText } from "../_components/RichText";

export const metadata: Metadata = {
  title: `Referências — ${bookMeta.title}`,
  description: `Fontes e referências citadas em ${bookMeta.title}, Volume ${bookMeta.volume} da série O Conflito Cósmico.`,
};

export default function RevelationReferencesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link
          href="/Revelation"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para todos os capítulos
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4">
            <ScrollText className="h-4 w-4" />
            Referências
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Fontes &amp; Referências
          </h1>
          <p className="mt-3 text-gray-500 dark:text-gray-400">
            {references.length} obras citadas em <em>{bookMeta.title}</em>. As
            citações bíblicas seguem, salvo indicação em contrário, a versão
            Almeida Revista e Atualizada (ARA).
          </p>
        </header>

        <ol className="space-y-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          {references.map((ref, index) => (
            <li
              key={index}
              className="border-b border-gray-100 dark:border-gray-800 pb-3"
            >
              <RichText text={ref} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
