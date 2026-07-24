"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, ScrollText } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { revStrings, revLang } from "./i18n";

interface SavedProgress {
  number: number;
}

const STORAGE_KEY = "revelation:progress";

export default function HeroActions() {
  const { language } = useLanguage();
  const t = revStrings[revLang(language)];
  const [progress, setProgress] = useState<SavedProgress | null>(null);

  useEffect(() => {
    // Reading localStorage must happen post-mount: it's unavailable during
    // SSR and would otherwise cause a hydration mismatch between server and
    // client markup.
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as SavedProgress;
      if (saved && typeof saved.number === "number" && saved.number > 1) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from an external store (localStorage) on mount, not derived render state
        setProgress(saved);
      }
    } catch {
      // ignore malformed/unavailable storage
    }
  }, []);

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4">
      <Link
        href={`/Revelation/chapter/${progress?.number ?? 1}`}
        className="inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold shadow-sm transition-colors"
      >
        <BookOpen className="h-5 w-5" />
        {progress ? `${t.continueReading} ${progress.number}` : t.startReading}
      </Link>
      {progress && (
        <Link
          href="/Revelation/chapter/1"
          className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {t.startFromBeginning}
        </Link>
      )}
      <Link
        href="/Revelation/references"
        className="inline-flex items-center gap-2 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 font-semibold hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
      >
        <ScrollText className="h-5 w-5" />
        {t.references}
      </Link>
    </div>
  );
}
