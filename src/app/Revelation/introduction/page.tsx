import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import Navbar from "../../../components/Navbar";
import {
  bookMeta,
  introductionBlocks,
  authorBio,
} from "../content/front-matter";
import { RichText } from "../_components/RichText";

export const metadata: Metadata = {
  title: `Introdução — ${bookMeta.title}`,
  description: `Introdução de ${bookMeta.title}, por ${bookMeta.author}.`,
};

export default function RevelationIntroductionPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      <article className="max-w-3xl mx-auto px-6 py-12">
        <Link
          href="/Revelation"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para {bookMeta.title}
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4">
            <BookOpen className="h-4 w-4" />
            Introdução
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            O Fim é Apenas o Começo
          </h1>
          <p className="mt-3 text-lg italic text-gray-500 dark:text-gray-400">
            Por que você não precisa ter medo do futuro
          </p>
        </header>

        <div
          className="space-y-5 text-[17px] leading-[1.85] text-gray-800 dark:text-gray-200"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {introductionBlocks.map((block, index) => (
            <p key={index}>
              <RichText text={block.text} />
            </p>
          ))}
        </div>

        <div className="mt-14 pt-10 border-t border-gray-200 dark:border-gray-800">
          <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
            Sobre o Autor
          </div>
          <div className="space-y-4 text-[15px] leading-[1.8] text-gray-700 dark:text-gray-300">
            {authorBio.slice(1).map((text, index) => (
              <p key={index}>
                <RichText text={text} />
              </p>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <Link
            href="/Revelation/chapter/1"
            className="group flex items-center justify-end gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all text-right"
          >
            <div>
              <div className="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-0.5">
                Próximo · Capítulo 1
              </div>
              <div className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                O Fim do Medo
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 flex-shrink-0 transition-colors" />
          </Link>
        </div>
      </article>
    </div>
  );
}
