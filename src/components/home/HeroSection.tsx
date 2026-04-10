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
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";

export default function HeroSection() {
  const { t, language } = useLanguage();
  const [showVideo, setShowVideo] = useState(false);

  // Video IDs: EN and BR
  const videoId = language === "br" ? "jf9Kogw6FU4" : "Gk1NMp3g_b0";

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Image with Enhanced Divine Overlay */}
      <div className="absolute inset-0 group">
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={() => setShowVideo(true)}
        >
          <Image
            src="/ministry-images/the-preacher.png"
            alt="Ministry Header"
            fill
            priority
            className="w-full h-full object-cover object-center scale-105 animate-[zoom_20s_ease-in-out_infinite_alternate] transition-all duration-700 group-hover:scale-110 group-hover:brightness-50"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 via-purple-900/60 to-black/70 group-hover:bg-black/40 transition-all duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent"></div>

          {/* Play Icon Hint Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="bg-white/20 backdrop-blur-md rounded-full p-8 border border-white/30 shadow-2xl">
              <Play className="h-20 w-20 text-white fill-white animate-pulse" />
            </div>
          </div>
        </div>
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

      {/* Video Modal Display */}
      {showVideo && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm">
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 bg-white/10 rounded-full hover:bg-white/20"
            aria-label="Close video"
          >
            <X className="h-8 w-8" />
          </button>
          <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 ring-1 ring-white/20 transform animate-in fade-in zoom-in duration-300">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
