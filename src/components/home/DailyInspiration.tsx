"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const verses = [
  {
    text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
    reference: "João 3:16",
  },
  {
    text: "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.",
    reference: "Provérbios 3:5",
  },
  {
    text: "Posso todas as coisas naquele que me fortalece.",
    reference: "Filipenses 4:13",
  },
];

export default function DailyInspiration() {
  // For now, show a random verse. In production, you could rotate daily
  const todayVerse = verses[new Date().getDate() % verses.length];

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <Card className="max-w-3xl mx-auto shadow-xl border-2 border-blue-100">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-3xl text-blue-900">
              Versículo do Dia
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <blockquote className="text-xl md:text-2xl text-gray-700 italic leading-relaxed">
              "{todayVerse.text}"
            </blockquote>
            <cite className="text-lg font-semibold text-blue-600 not-italic">
              - {todayVerse.reference}
            </cite>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
