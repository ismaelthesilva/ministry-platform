"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Music, Zap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Video {
  link: string;
  title: string;
  description: string;
}

interface Props {
  songs: Video[];
  getYouTubeVideoId: (url: string) => string;
}

export default function Songs({ songs, getYouTubeVideoId }: Props) {
  const { t } = useLanguage();

  return (
    <section
      id="songs"
      className="py-20 bg-gradient-to-b from-purple-50 to-white relative"
    >
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ec4899' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mb-6 shadow-xl">
            <Music className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">
            {t("home.songs.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t(
              "home.songs.subtitle",
              "Heavenly melodies that lift the soul and prepare hearts for worship in His presence",
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {songs.map((song: Video, index: number) => (
            <Card
              key={index}
              className="group overflow-hidden bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(song.link)}?rel=0&showinfo=0&modestbranding=1&autoplay=0&controls=1`}
                  title={song.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>

              <CardHeader className="p-6">
                <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors duration-300 mb-3">
                  {song.title}
                </CardTitle>
                <CardDescription className="text-gray-600 flex items-center mb-3">
                  <Music className="h-4 w-4 mr-2 text-pink-500" />
                  {song.description}
                </CardDescription>

                <div className="flex items-center text-pink-500">
                  <Zap className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">
                    {t("home.songs.label", "Worship Song")}
                  </span>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
