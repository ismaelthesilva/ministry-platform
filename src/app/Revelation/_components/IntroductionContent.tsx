"use client";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import {
  bookMeta as bookMetaPt,
  introductionBlocks as introductionBlocksPt,
  authorBio as authorBioPt,
  introTitle as introTitlePt,
  introSubtitle as introSubtitlePt,
} from "../content/front-matter";
import { getChapterMeta as getChapterMetaPt } from "../content/registry";
import {
  bookMeta as bookMetaEn,
  introductionBlocks as introductionBlocksEn,
  authorBio as authorBioEn,
  introTitle as introTitleEn,
  introSubtitle as introSubtitleEn,
} from "../content-en/front-matter";
import { getChapterMeta as getChapterMetaEn } from "../content-en/registry";
import { useLanguage } from "@/context/LanguageContext";
import { revStrings, revLang } from "./i18n";
import { RichText } from "./RichText";

export default function IntroductionContent() {
  const { language } = useLanguage();
  const isBr = revLang(language) === "br";
  const t = revStrings[revLang(language)];

  const bookMeta = isBr ? bookMetaPt : bookMetaEn;
  const introductionBlocks = isBr ? introductionBlocksPt : introductionBlocksEn;
  const authorBio = isBr ? authorBioPt : authorBioEn;
  const introTitle = isBr ? introTitlePt : introTitleEn;
  const introSubtitle = isBr ? introSubtitlePt : introSubtitleEn;
  const chapter1 = isBr ? getChapterMetaPt(1) : getChapterMetaEn(1);

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      <Link
        href="/Revelation"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        {t.backTo} {bookMeta.title}
      </Link>

      <header className="mb-10">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4">
          <BookOpen className="h-4 w-4" />
          {t.introduction}
        </div>
        <h1
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {introTitle}
        </h1>
        <p className="mt-3 text-lg italic text-gray-500 dark:text-gray-400">
          {introSubtitle}
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
          {t.aboutAuthor}
        </div>
        <div className="space-y-4 text-[15px] leading-[1.8] text-gray-700 dark:text-gray-300">
          {authorBio.slice(1).map((text, index) => (
            <p key={index}>
              <RichText text={text} />
            </p>
          ))}
        </div>
      </div>

      {chapter1 && (
        <div className="mt-14">
          <Link
            href="/Revelation/chapter/1"
            className="group flex items-center justify-end gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all text-right"
          >
            <div>
              <div className="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-0.5">
                {t.nextChapterLabel} 1
              </div>
              <div className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {chapter1.title}
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 flex-shrink-0 transition-colors" />
          </Link>
        </div>
      )}
    </article>
  );
}
