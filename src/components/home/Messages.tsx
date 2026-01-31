"use client";
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Star, Cross, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

interface Video {
  link: string;
  title: string;
  description: string;
}

interface Props {
  messages: Video[];
  getYouTubeVideoId: (url: string) => string;
}

export default function Messages({ messages, getYouTubeVideoId }: Props) {
  const { t } = useLanguage();

  return (
    <section id="messages" className="py-24 bg-gradient-to-b from-white via-blue-50 to-purple-50 relative">
      <div className="absolute inset-0 bg-grace-aura opacity-30"></div>
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="relative mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-2xl animate-divine-pulse">
              <MessageCircle className="h-10 w-10 text-white" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse scale-150"></div>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 text-divine-glow">
            {t("home.messages.title")}
          </h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            {t("home.messages.subtitle")}
          </p>

          <div className="flex items-center justify-center mt-8 space-x-4">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-blue-400"></div>
            <Star className="h-6 w-6 text-blue-500 animate-pulse" />
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-purple-400"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {messages.map((video: Video, index: number) => (
            <Card key={index} className="group card-divine overflow-hidden bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-3 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-blue-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

              <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(video.link)}?rel=0&showinfo=0&modestbranding=1&autoplay=0&controls=1`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>

              <CardHeader className="p-8 relative">
                <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 mb-4 leading-tight">
                  {video.title}
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed text-lg mb-6">
                  {video.description}
                </CardDescription>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-blue-500">
                    <Star className="h-5 w-5 mr-3 animate-pulse" />
                    <span className="text-sm font-semibold tracking-wide uppercase">{t("home.messages.label")}</span>
                  </div>
                  <Cross className="h-5 w-5 text-blue-300 animate-grace-glow" />
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 text-lg mb-6 italic">&quot;Faith comes by hearing, and hearing by the word of God&quot; - Romans 10:17</p>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold shadow-xl transform hover:scale-105 transition-all duration-300">
            <Youtube className="h-5 w-5 mr-2" />
            Watch More Messages
          </Button>
        </div>
      </div>
    </section>
  );
}
