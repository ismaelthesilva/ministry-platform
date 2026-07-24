"use client";
import Image from "next/image";
import Link from "next/link";
import { Clock, Layers, Library, ArrowRight, ChevronDown } from "lucide-react";
import {
  chapterRegistry as chapterRegistryPt,
  partRegistry as partRegistryPt,
  getChaptersForPart as getChaptersForPartPt,
  estimateReadingMinutes,
} from "../content/registry";
import {
  bookMeta as bookMetaPt,
  backCoverBlurb as backCoverBlurbPt,
  seriesBooks as seriesBooksPt,
} from "../content/front-matter";
import {
  chapterRegistry as chapterRegistryEn,
  partRegistry as partRegistryEn,
  getChaptersForPart as getChaptersForPartEn,
} from "../content-en/registry";
import {
  bookMeta as bookMetaEn,
  backCoverBlurb as backCoverBlurbEn,
  seriesBooks as seriesBooksEn,
} from "../content-en/front-matter";
import { useLanguage } from "@/context/LanguageContext";
import { revStrings, revLang, stripPartPrefix } from "./i18n";
import { RichText } from "./RichText";
import HeroActions from "./HeroActions";

export default function RevelationLanding() {
  const { language } = useLanguage();
  const isBr = revLang(language) === "br";
  const t = revStrings[revLang(language)];

  const chapterRegistry = isBr ? chapterRegistryPt : chapterRegistryEn;
  const partRegistry = isBr ? partRegistryPt : partRegistryEn;
  const getChaptersForPart = isBr ? getChaptersForPartPt : getChaptersForPartEn;
  const bookMeta = isBr ? bookMetaPt : bookMetaEn;
  const backCoverBlurb = isBr ? backCoverBlurbPt : backCoverBlurbEn;
  const seriesBooks = isBr ? seriesBooksPt : seriesBooksEn;

  const totalChapters = chapterRegistry.length;
  const totalWords = chapterRegistry.reduce((sum, c) => sum + c.wordCount, 0);
  const totalMinutes = estimateReadingMinutes(totalWords);

  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4">
                <Library className="h-4 w-4" />
                {bookMeta.series} · Volume {bookMeta.volume}
              </div>
              <h1
                className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {bookMeta.title}
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 italic">
                {bookMeta.subtitle}
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {t.byWord} {bookMeta.author} · {bookMeta.edition}
              </p>

              <HeroActions />

              <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-x-8 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="inline-flex items-center gap-1.5">
                  <Layers className="h-4 w-4" /> {totalChapters}{" "}
                  {t.chaptersWord} {t.inWord} {partRegistry.length}{" "}
                  {t.partsWord}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" /> ~{totalMinutes}{" "}
                  {t.totalReadTime}
                </span>
              </div>
            </div>

            <div className="flex-shrink-0">
              <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">
                <Image
                  src="/ministry-images/ismael-profile23.jpg"
                  alt={bookMeta.author}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back cover blurb */}
      <div className="max-w-3xl mx-auto px-6 py-14">
        <div className="space-y-4 text-[17px] leading-[1.85] text-gray-700 dark:text-gray-300">
          {backCoverBlurb.map((text, i) => (
            <p key={i}>
              <RichText text={text} />
            </p>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/Revelation/introduction"
            className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            {t.readIntroLink} &rarr;
          </Link>
        </div>
      </div>

      {/* Chapters grouped by part */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <h2
          className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {t.contents}
        </h2>

        <div className="space-y-4">
          {partRegistry.map((part) => {
            const chapters = getChaptersForPart(part.number);
            return (
              <details
                key={part.number}
                className="group rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-900/20"
                open={part.number === 1}
              >
                <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer flex items-center justify-between gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-900/40 transition-colors">
                  <div className="min-w-0">
                    <div className="text-xs font-semibold uppercase tracking-widest text-purple-600 dark:text-purple-400">
                      {t.part} {part.number}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                      {stripPartPrefix(part.title)}
                    </h3>
                    {part.tagline && (
                      <p className="mt-0.5 text-sm italic text-gray-500 dark:text-gray-400 truncate">
                        {part.tagline}
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-3">
                    <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
                      {chapters.length} {t.chaptersWord}
                    </span>
                    <ChevronDown className="h-5 w-5 text-gray-400 transition-transform duration-200 group-open:rotate-180" />
                  </div>
                </summary>
                <div className="px-5 pb-5 pt-1 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-gray-100 dark:border-gray-800">
                  {chapters.map((c) => (
                    <Link
                      key={c.number}
                      href={`/Revelation/chapter/${c.number}`}
                      className="group/card flex items-start gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/40 p-4 mt-3 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold flex items-center justify-center">
                        {c.number}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-900 dark:text-white group-hover/card:text-blue-600 dark:group-hover/card:text-blue-400 transition-colors truncate">
                          {c.title}
                        </div>
                        {c.subtitle && (
                          <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                            {c.subtitle}
                          </div>
                        )}
                      </div>
                      <ArrowRight className="ml-auto h-4 w-4 flex-shrink-0 text-gray-300 dark:text-gray-600 group-hover/card:text-blue-500 transition-colors mt-1.5" />
                    </Link>
                  ))}
                </div>
              </details>
            );
          })}
        </div>
      </div>

      {/* Series */}
      <div className="bg-gray-50 dark:bg-gray-900/40 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">
              <Library className="h-4 w-4" />
              {t.fullSeries}
            </div>
            <h2
              className="text-2xl font-bold text-gray-900 dark:text-white"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              {bookMeta.series}
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-sm">
              {isBr
                ? `Uma jornada de ${seriesBooks.length} livros cobrindo toda a história da redenção, teologia e prática cristã.`
                : `A journey of ${seriesBooks.length} books covering the entire story of redemption, theology, and Christian practice.`}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {seriesBooks.map((book) => (
              <div
                key={book.title}
                className={`rounded-xl border p-4 ${
                  book.available
                    ? "border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-900"
                    : "border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/30"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="font-semibold text-sm text-gray-900 dark:text-white">
                    {book.title}
                  </div>
                  <span
                    className={`flex-shrink-0 text-[10px] font-bold uppercase tracking-wide rounded-full px-2 py-0.5 ${
                      book.available
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                        : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                    }`}
                  >
                    {book.available ? t.available : t.inProduction}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {book.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
