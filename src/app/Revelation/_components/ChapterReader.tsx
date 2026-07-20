import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  ArrowLeft,
  ArrowRight,
  ScrollText,
} from "lucide-react";
import type { ChapterContent } from "../content/types";
import type { ChapterMeta, PartMeta } from "../content/types";
import { estimateReadingMinutes, TOTAL_CHAPTERS } from "../content/registry";
import { RichText } from "./RichText";
import ReadingProgressBar from "./ReadingProgressBar";

function ChapterCardLink({
  meta,
  direction,
}: {
  meta: ChapterMeta;
  direction: "prev" | "next";
}) {
  return (
    <Link
      href={`/Revelation/chapter/${meta.number}`}
      className={`group flex-1 flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all ${
        direction === "next" ? "justify-end text-right" : ""
      }`}
    >
      {direction === "prev" && (
        <ArrowLeft className="h-5 w-5 text-gray-400 group-hover:text-blue-600 flex-shrink-0 transition-colors" />
      )}
      <div className={direction === "next" ? "order-first" : ""}>
        <div className="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-0.5">
          {direction === "prev" ? "Anterior" : "Próximo"} · Capítulo{" "}
          {meta.number}
        </div>
        <div className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {meta.title}
        </div>
      </div>
      {direction === "next" && (
        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 flex-shrink-0 transition-colors" />
      )}
    </Link>
  );
}

export default function ChapterReader({
  chapter,
  prev,
  next,
  part,
}: {
  chapter: ChapterContent;
  prev?: ChapterMeta;
  next?: ChapterMeta;
  part?: PartMeta;
}) {
  const readingMinutes = estimateReadingMinutes(chapter.wordCount);
  const headings = chapter.blocks
    .map((block, index) => ({ block, index }))
    .filter((entry) => entry.block.type === "heading");

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <ReadingProgressBar />

      <article className="max-w-3xl mx-auto px-6 py-12">
        <Link
          href="/Revelation"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para todos os capítulos
        </Link>

        <header className="mb-10">
          {part && (
            <div className="text-xs font-semibold uppercase tracking-widest text-purple-600 dark:text-purple-400 mb-2">
              Parte {part.number} · {part.title.replace(/^Parte\s+\d+:\s*/, "")}
            </div>
          )}
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4">
            <BookOpen className="h-4 w-4" />
            Capítulo {chapter.number} de {TOTAL_CHAPTERS}
            <span className="text-gray-300 dark:text-gray-600">·</span>
            <span className="inline-flex items-center gap-1 text-gray-500 dark:text-gray-400 normal-case font-medium tracking-normal">
              <Clock className="h-3.5 w-3.5" />
              {readingMinutes} min de leitura
            </span>
          </div>

          <h1
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {chapter.title}
          </h1>

          {chapter.subtitle && (
            <p className="mt-3 text-lg italic text-gray-500 dark:text-gray-400">
              {chapter.subtitle}
            </p>
          )}
        </header>

        {headings.length >= 3 && (
          <nav className="mb-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 p-5">
            <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
              Neste capítulo
            </div>
            <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
              {headings.map(({ block, index }) => (
                <li key={index}>
                  <a
                    href={`#section-${index}`}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {block.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div
          className="space-y-5 text-[17px] leading-[1.85] text-gray-800 dark:text-gray-200"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {chapter.blocks.map((block, index) => {
            switch (block.type) {
              case "heading":
                return (
                  <h2
                    key={index}
                    id={`section-${index}`}
                    className="!mt-12 !mb-2 scroll-mt-24 text-xl font-bold text-purple-700 dark:text-purple-400"
                    style={{ fontFamily: "inherit" }}
                  >
                    {block.text}
                  </h2>
                );
              case "scripture":
                return (
                  <blockquote
                    key={index}
                    className="!my-8 border-l-4 border-blue-400 dark:border-blue-500 bg-blue-50/60 dark:bg-blue-900/20 rounded-r-lg py-4 pl-5 pr-4 italic text-gray-700 dark:text-gray-300"
                  >
                    <RichText text={block.text} />
                  </blockquote>
                );
              case "prayer":
                return (
                  <div
                    key={index}
                    className="!my-8 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50/60 dark:bg-purple-900/20 p-5"
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-purple-600 dark:text-purple-400 mb-2">
                      Uma Oração
                    </div>
                    <p className="italic text-gray-700 dark:text-gray-300">
                      <RichText text={block.text} />
                    </p>
                  </div>
                );
              case "paragraph":
              default:
                return (
                  <p key={index}>
                    <RichText text={block.text} />
                  </p>
                );
            }
          })}
        </div>

        {chapter.notes && chapter.notes.length > 0 && (
          <details className="mt-14 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 p-5 group">
            <summary className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-gray-600 dark:text-gray-300 select-none">
              <ScrollText className="h-4 w-4" />
              Fontes &amp; Notas ({chapter.notes.length})
            </summary>
            <ol className="mt-4 space-y-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {chapter.notes.map((note) => (
                <li key={note.number} className="flex gap-2">
                  <span className="font-semibold text-gray-400 dark:text-gray-500 flex-shrink-0">
                    {note.number}.
                  </span>
                  <span>
                    <RichText text={note.text} />
                  </span>
                </li>
              ))}
            </ol>
          </details>
        )}

        <div className="mt-14 flex flex-col sm:flex-row gap-4">
          {prev ? (
            <ChapterCardLink meta={prev} direction="prev" />
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <ChapterCardLink meta={next} direction="next" />
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </article>
    </div>
  );
}
