"use client";

import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Music,
  Play,
  Crown,
  Cross,
  Sparkles,
  Book,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image with Enhanced Divine Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/ministry-images/the-preacher.png"
          alt="Ministry Header"
          fill
          priority
          className="w-full h-full object-cover object-center scale-105 animate-[zoom_20s_ease-in-out_infinite_alternate]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 via-purple-900/60 to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent"></div>
      </div>

      {/* Floating Divine Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-yellow-300 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white rounded-full opacity-50"></div>
        <div className="absolute bottom-1/3 left-1/5 w-2.5 h-2.5 bg-blue-200 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute top-1/6 right-1/6">
          <Cross className="h-8 w-8 text-yellow-300/30" />
        </div>
      </div>

      <div className="container mx-auto h-full flex flex-col items-center justify-center relative z-10 px-4 text-center">
        {/* Divine Crown */}
        <div className="mb-8 relative">
          <Crown className="h-20 w-20 text-yellow-400 drop-shadow-2xl mx-auto mb-4 animate-pulse" />
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-yellow-200 drop-shadow-2xl leading-tight mb-6">
          {t("home.hero.title")}
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-3xl lg:text-4xl text-blue-100 font-light tracking-wider drop-shadow-lg uppercase mb-8">
          {t("home.hero.subtitle")}
        </p>

        {/* Primary CTA - Bible Tracker */}
        <div className="space-y-4 mb-8">
          <Button
            asChild
            size="lg"
            className="group bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 hover:from-green-700 hover:via-emerald-700 hover:to-green-700 text-white px-12 py-6 text-xl font-bold shadow-2xl border-0 transform hover:scale-105 transition-all duration-300"
          >
            <Link href="/dashboard" className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 group-hover:animate-pulse" />
              {t("home.hero.cta")}
              <Sparkles className="h-6 w-6 group-hover:animate-pulse" />
            </Link>
          </Button>
        </div>

        {/* Secondary CTAs */}
        <div className="flex flex-wrap gap-6 justify-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 h-auto py-4 min-w-[140px]"
          >
            <a href="#messages" className="flex flex-col items-center">
              <div className="flex items-center mb-1">
                <Play className="h-5 w-5 mr-2" />
                <span className="font-bold">{t("home.hero.sermons")}</span>
              </div>
              <span className="text-xs opacity-70 italic">
                {t("home.hero.voice")} 1
              </span>
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 h-auto py-4 min-w-[140px]"
          >
            <a href="#music" className="flex flex-col items-center">
              <div className="flex items-center mb-1">
                <Music className="h-5 w-5 mr-2" />
                <span className="font-bold">{t("home.hero.music")}</span>
              </div>
              <span className="text-xs opacity-70 italic">
                {t("home.hero.voice")} 2
              </span>
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 h-auto py-4 min-w-[140px]"
          >
            <a href="#books" className="flex flex-col items-center">
              <div className="flex items-center mb-1">
                <Book className="h-5 w-5 mr-2" />
                <span className="font-bold">{t("home.hero.books")}</span>
              </div>
              <span className="text-xs opacity-70 italic">
                {t("home.hero.voice")} 3
              </span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
