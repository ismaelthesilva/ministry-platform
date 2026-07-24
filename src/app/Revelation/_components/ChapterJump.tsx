"use client";
import { useRouter } from "next/navigation";
import {
  partRegistry as partRegistryPt,
  getChaptersForPart as getChaptersForPartPt,
} from "../content/registry";
import {
  partRegistry as partRegistryEn,
  getChaptersForPart as getChaptersForPartEn,
} from "../content-en/registry";
import { useLanguage } from "@/context/LanguageContext";
import { revStrings, revLang, stripPartPrefix } from "./i18n";

export default function ChapterJump({ current }: { current: number }) {
  const router = useRouter();
  const { language } = useLanguage();
  const isBr = revLang(language) === "br";
  const t = revStrings[revLang(language)];
  const parts = isBr ? partRegistryPt : partRegistryEn;
  const getChaptersForPart = isBr ? getChaptersForPartPt : getChaptersForPartEn;

  return (
    <select
      value={current}
      onChange={(e) => router.push(`/Revelation/chapter/${e.target.value}`)}
      aria-label={t.jumpToChapter}
      className="text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 pl-3 pr-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-[220px]"
    >
      {parts.map((part) => (
        <optgroup
          key={part.number}
          label={`${t.part} ${part.number} — ${stripPartPrefix(part.title)}`}
        >
          {getChaptersForPart(part.number).map((c) => (
            <option key={c.number} value={c.number}>
              {c.number}. {c.title}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}
