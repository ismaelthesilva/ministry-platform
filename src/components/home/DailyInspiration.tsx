"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";

export default function DailyInspiration() {
  const { t, tObj, language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use translations for verses
  const verses = (
    mounted ? tObj("home.dailyInspiration.verses") : []
  ) as Array<{
    text: string;
    reference: string;
  }>;

  // For now, show a random verse. In production, you could rotate daily
  const todayVerse =
    Array.isArray(verses) && verses.length > 0
      ? verses[new Date().getDate() % verses.length]
      : {
          text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
          reference: "João 3:16",
        };

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        <Card className="max-w-3xl mx-auto shadow-xl border-2 border-blue-100 dark:border-slate-700 dark:bg-slate-900/50">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-3xl text-blue-900 dark:text-blue-100">
              {mounted ? t("home.dailyInspiration.title") : "Versículo do Dia"}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 italic leading-relaxed">
              "{todayVerse.text}"
            </blockquote>
            <cite className="text-lg font-semibold text-blue-600 dark:text-blue-400 not-italic">
              - {todayVerse.reference}
            </cite>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
