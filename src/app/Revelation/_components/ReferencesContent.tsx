"use client";
import Link from "next/link";
import { ArrowLeft, ScrollText } from "lucide-react";
import {
  references as referencesPt,
  bookMeta as bookMetaPt,
} from "../content/front-matter";
import {
  references as referencesEn,
  bookMeta as bookMetaEn,
} from "../content-en/front-matter";
import { useLanguage } from "@/context/LanguageContext";
import { revStrings, revLang } from "./i18n";
import { RichText } from "./RichText";

export default function ReferencesContent() {
  const { language } = useLanguage();
  const isBr = revLang(language) === "br";
  const t = revStrings[revLang(language)];
  const references = isBr ? referencesPt : referencesEn;
  const bookMeta = isBr ? bookMetaPt : bookMetaEn;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link
        href="/Revelation"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        {t.backToChapters}
      </Link>

      <header className="mb-10">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4">
          <ScrollText className="h-4 w-4" />
          {t.references}
        </div>
        <h1
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {t.sourcesReferencesHeading}
        </h1>
        <p className="mt-3 text-gray-500 dark:text-gray-400">
          {references.length} {t.citedIn} <em>{bookMeta.title}</em>.{" "}
          {t.scriptureNote}
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
  );
}
