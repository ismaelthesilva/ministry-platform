"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Music, Play, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";

export default function FeaturesGrid() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: mounted ? t("home.features.items.bibleYear.title") : "Ano Bíblico",
      description: mounted
        ? t("home.features.items.bibleYear.description")
        : "Leia a Bíblia completa em um ano com planos guiados e comentários inspiradores.",
      link: "/dashboard",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Play,
      title: mounted ? t("home.features.items.messages.title") : "Sermões",
      description: mounted
        ? t("home.features.items.messages.description")
        : "Assista mensagens poderosas que transformam vidas e fortalecem a fé.",
      link: "#messages",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: Music,
      title: mounted ? t("home.features.items.songs.title") : "Músicas",
      description: mounted
        ? t("home.features.items.songs.description")
        : "Ouça canções originais de adoração disponíveis em todas as plataformas.",
      link: "#music",
      color: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-t dark:border-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {mounted ? t("home.features.title") : "Recursos do Ministério"}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {mounted
              ? t("home.features.subtitle")
              : "Explore nossos recursos para crescer em sua jornada espiritual"}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-transparent hover:ring-2 hover:ring-offset-2 dark:bg-slate-800 dark:border-slate-700"
                style={
                  {
                    "--tw-ring-color": `linear-gradient(${feature.color})`,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  } as any
                }
              >
                <CardHeader>
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl dark:text-gray-100">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-base dark:text-gray-400">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full group-hover:bg-gray-100 dark:group-hover:bg-slate-700 dark:text-gray-300"
                  >
                    {feature.link.startsWith("#") ? (
                      <a
                        href={feature.link}
                        className="flex items-center justify-between"
                      >
                        {mounted ? t("home.features.explore") : "Explorar"}
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    ) : (
                      <Link
                        href={feature.link}
                        className="flex items-center justify-between"
                      >
                        {mounted ? t("home.features.explore") : "Explorar"}
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
