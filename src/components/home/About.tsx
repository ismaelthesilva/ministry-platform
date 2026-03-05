"use client";
import React from "react";
import Image from "next/image";
// import Card from "@/components/ui/card"; // Removed unused import
import { Heart, Cross, Globe, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  const aboutContent: string[] = Array.from({ length: 6 }, (_, i) =>
    t(`home.about.content.${i}`),
  );

  return (
    <section
      className="py-24 bg-gradient-to-b from-white via-green-50 to-blue-50 relative"
      id="about"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-green-200/20 rounded-full blur-3xl animate-grace-glow"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl animate-breathe"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-200/10 rounded-full blur-3xl animate-divine-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="relative mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full shadow-2xl animate-grace-glow">
              <Heart className="h-10 w-10 text-white" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/30 to-teal-400/30 rounded-full blur-xl animate-pulse scale-150"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 text-grace-shadow">
            {t("home.about.title")}
          </h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            {t("home.about.subtitle")}
          </p>
          <div className="flex items-center justify-center mt-8 space-x-4">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-green-400"></div>
            <Heart className="h-6 w-6 text-green-500 animate-pulse" />
            <div className="w-8 h-0.5 bg-green-400"></div>
            <Cross className="h-6 w-6 text-teal-500 animate-grace-glow" />
            <div className="w-8 h-0.5 bg-teal-400"></div>
            <Heart className="h-6 w-6 text-teal-500 animate-pulse" />
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-teal-400"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start mb-12">
          <div className="flex justify-center">
            <div className="relative group w-80">
              <div className="absolute -top-8 -left-8 w-full h-full bg-gradient-to-br from-green-400/30 to-teal-400/30 rounded-3xl blur-2xl animate-grace-glow"></div>
              <div className="absolute -top-4 -left-4 w-full h-full bg-green-600/60 rounded-2xl shadow-2xl"></div>
              <div className="absolute -top-2 -left-2 w-full h-full bg-gradient-to-br from-green-500/40 to-teal-500/40 rounded-2xl blur-lg"></div>
              <div className="relative overflow-hidden rounded-2xl border-4 border-white shadow-2xl">
                <Image
                  src="/ministry-images/ismael-profile20.jpg"
                  alt="Ismael Silva"
                  width={320}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 20rem, 100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -top-6 -right-6 bg-yellow-400 rounded-full p-4 shadow-xl animate-divine-pulse">
                <Star className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-teal-500 rounded-full p-3 shadow-xl animate-grace-glow">
                <Heart className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="group relative w-full">
              <div className="absolute -left-4 top-2 w-1 h-full bg-gradient-to-b from-green-400 to-teal-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <p className="text-gray-700 leading-relaxed text-lg group-hover:text-gray-900 transition-all duration-300 p-6 rounded-xl hover:bg-white/60 hover:shadow-lg border border-transparent hover:border-green-200/50">
                {aboutContent[0]}
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="space-y-0">
              {aboutContent.slice(1).map((paragraph: string, index: number) => (
                <div key={index} className="group relative">
                  <div className="absolute -left-4 top-2 w-1 h-full bg-gradient-to-b from-green-400 to-teal-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <p className="text-gray-700 leading-relaxed text-lg group-hover:text-gray-900 transition-all duration-300 p-6 rounded-xl hover:bg-white/60 hover:shadow-lg border border-transparent hover:border-green-200/50">
                    {paragraph}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mb-8">
          <div className="p-8 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50 rounded-3xl border border-green-200/50 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4">
                <Globe className="h-16 w-16 text-green-500 animate-breathe" />
              </div>
              <div className="absolute bottom-4 left-4">
                <Heart className="h-12 w-12 text-teal-500 animate-pulse" />
              </div>
            </div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-green-500 to-teal-500 p-3 rounded-full mr-4 shadow-lg">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-800">
                  {t("home.about.mission")}
                </h3>
              </div>
              <p className="text-green-700 leading-relaxed text-lg mb-6">
                {t("home.about.missionText")}
              </p>
              <div className="border-l-4 border-green-400 pl-6 bg-white/50 p-4 rounded-r-lg">
                <p className="text-green-800 italic font-medium">
                  &quot;{t("home.about.missionScripture")}&quot;
                  <span className="text-green-600 font-bold ml-2">
                    - {t("home.about.missionScriptureRef")}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center p-8 bg-gradient-to-r from-green-100 to-teal-100 rounded-2xl border-2 border-green-300/30 shadow-xl">
            <div className="flex items-center justify-center mb-4 space-x-2">
              <Heart className="h-6 w-6 text-red-500 animate-pulse" />
              <span className="text-2xl font-bold text-green-800">
                {t("home.about.godIsLoveTitle")}
              </span>
              <Heart className="h-6 w-6 text-red-500 animate-pulse" />
            </div>
            <p className="text-green-700 text-lg italic">
              &quot;{t("home.about.godIsLoveScripture")}&quot; -{" "}
              {t("home.about.godIsLoveScriptureRef")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
