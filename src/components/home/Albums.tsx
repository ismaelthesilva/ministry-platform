"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Disc3, Music, Sparkles, Hammer, Lightbulb, Play } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type Status = "comingSoon" | "inProduction" | "future";

interface Album {
  title: string;
  cover: string;
  status: Status;
  tracks: string[];
}

const STATUS_STYLE: Record<
  Status,
  { badge: string; icon: React.ElementType; glow: string }
> = {
  comingSoon: {
    badge: "from-amber-400 to-orange-500",
    icon: Sparkles,
    glow: "from-amber-300/40 to-orange-300/40",
  },
  inProduction: {
    badge: "from-purple-500 to-pink-500",
    icon: Hammer,
    glow: "from-purple-300/40 to-pink-300/40",
  },
  future: {
    badge: "from-sky-500 to-indigo-500",
    icon: Lightbulb,
    glow: "from-sky-300/40 to-indigo-300/40",
  },
};

export default function Albums() {
  const { t, tObj } = useLanguage();
  const albums = (tObj("home.albums.items", []) as Album[]) || [];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="albums"
      className="py-20 bg-gradient-to-b from-white via-purple-50 to-blue-50 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl text-purple-600">
          ♫
        </div>
        <div className="absolute bottom-20 right-16 text-7xl text-pink-500">
          ♪
        </div>
        <div className="absolute top-1/2 left-1/2 text-5xl text-blue-500">
          ♬
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-6 shadow-xl">
            <Disc3 className="h-8 w-8 text-white animate-[spin_8s_linear_infinite]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
            {t("home.albums.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t("home.albums.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {albums.map((album, i) => {
            const s = STATUS_STYLE[album.status];
            const Icon = s.icon;
            const isOpen = open === i;
            return (
              <article
                key={i}
                className="group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col"
              >
                <div
                  className={`absolute -inset-1 bg-gradient-to-br ${s.glow} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`}
                />
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`album-tracks-${i}`}
                  className="relative text-left flex flex-col flex-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-300 rounded-2xl"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={album.cover}
                      alt={album.title}
                      fill
                      sizes="(min-width: 1280px) 20rem, (min-width: 640px) 45vw, 90vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span
                      className={`absolute top-3 left-3 inline-flex items-center gap-1.5 bg-gradient-to-r ${s.badge} text-white text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full shadow-lg`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {t(`home.albums.status.${album.status}`)}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <span className="inline-flex items-center gap-2 text-white text-sm font-semibold">
                        <Play className="h-4 w-4" />
                        {t("home.albums.tracks")}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                      {album.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                      <Music className="h-3.5 w-3.5" />
                      {album.tracks.length} {t("home.albums.songs")}
                    </p>
                  </div>
                </button>

                <div
                  id={`album-tracks-${i}`}
                  className={`grid transition-all duration-500 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <ol className="overflow-hidden px-5 text-gray-700">
                    <div className={isOpen ? "pb-5" : ""}>
                      {album.tracks.map((track, n) => (
                        <li
                          key={n}
                          className="flex items-center gap-3 py-2 border-t border-purple-100 text-sm"
                        >
                          <span className="w-5 text-right text-purple-400 font-semibold">
                            {n + 1}
                          </span>
                          {track}
                        </li>
                      ))}
                    </div>
                  </ol>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
