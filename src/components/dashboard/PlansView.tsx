"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  BookOpen,
  BookMarked,
  ScrollText,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PlansView() {
  const { language } = useLanguage();
  const isBr = language === "br";
  const t = (br: string, en: string) => (isBr ? br : en);

  const plans = [
    {
      slug: "bible",
      icon: BookOpen,
      title: t("Só a Bíblia", "Bible Only"),
      description: t(
        "Leia a Bíblia inteira em um ano com leituras diárias organizadas. Ideal para quem quer focar exclusivamente na Palavra de Deus.",
        "Read the entire Bible in one year with organized daily readings. Ideal for those who want to focus exclusively on God's Word."
      ),
      includes: [
        t("Leitura bíblica diária", "Daily Bible reading"),
        t("365 dias completos", "Complete 365 days"),
        t("Antigo e Novo Testamento", "Old and New Testament"),
      ],
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      slug: "prophetic",
      icon: ScrollText,
      title: t("Leitura Profética", "Prophetic Reading"),
      description: t(
        "Combine a leitura bíblica com comentários proféticos e devocionais inspirados. Aprofunde sua compreensão espiritual.",
        "Combine Bible reading with prophetic and devotional commentary. Deepen your spiritual understanding."
      ),
      includes: [
        t("Leitura bíblica diária", "Daily Bible reading"),
        t("Comentários proféticos", "Prophetic commentary"),
        t("Títulos e temas de cada capítulo", "Chapter titles and themes"),
      ],
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-950/30",
    },
    {
      slug: "classic",
      icon: BookMarked,
      title: t("Leitura Clássica", "Classic Reading"),
      description: t(
        "Leituras bíblicas combinadas com literatura cristã clássica. Descubra a sabedoria dos grandes autores da fé.",
        "Bible readings paired with classical Christian literature. Discover the wisdom of great authors of the faith."
      ),
      includes: [
        t("Leitura bíblica diária", "Daily Bible reading"),
        t("Autores cristãos clássicos", "Classic Christian authors"),
        t(
          "Obras de referência e temas-chave",
          "Reference works and key themes"
        ),
      ],
      color: "text-amber-600",
      bg: "bg-amber-50 dark:bg-amber-950/30",
    },
  ];

  return (
    <div className="container max-w-6xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          {t("Planos de Leitura", "Reading Plans")}
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          {t(
            "Três planos diferentes para guiar seu estudo bíblico diário. Cada plano tem 365 dias e está disponível em Português e Inglês. Você pode trocar de plano e idioma a qualquer momento na página de leituras.",
            "Three different plans to guide your daily Bible study. Each plan has 365 days and is available in Portuguese and English. You can switch plans and language anytime on the readings page."
          )}
        </p>
      </div>

      {/* Plans */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <Card key={plan.slug} className="flex flex-col">
              <CardHeader>
                <div
                  className={`rounded-lg w-12 h-12 flex items-center justify-center ${plan.bg}`}
                >
                  <Icon className={`h-6 w-6 ${plan.color}`} />
                </div>
                <CardTitle className="mt-3">{plan.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  {t("Inclui", "Includes")}
                </p>
                <ul className="space-y-1.5">
                  {plan.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2
                        className={`h-4 w-4 mt-0.5 shrink-0 ${plan.color}`}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-2 mt-4">
                  <Badge variant="outline">🇺🇸 EN</Badge>
                  <Badge variant="outline">🇧🇷 PT</Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* How it works */}
      <Card>
        <CardHeader>
          <CardTitle>{t("Como funciona", "How it works")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-primary/10 w-8 h-8 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-primary">1</span>
              </div>
              <div>
                <p className="font-medium text-sm">
                  {t("Vá para Leituras", "Go to Readings")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t(
                    "Acesse a página de leituras para ver o calendário de 12 meses com todas as leituras do ano.",
                    "Go to the readings page to see the 12-month calendar with all yearly readings."
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-primary/10 w-8 h-8 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-primary">2</span>
              </div>
              <div>
                <p className="font-medium text-sm">
                  {t("Escolha plano e idioma", "Choose plan and language")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t(
                    "Use o seletor no topo para alternar entre os 3 planos e os 2 idiomas a qualquer momento.",
                    "Use the switcher at the top to toggle between the 3 plans and 2 languages anytime."
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-primary/10 w-8 h-8 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-primary">3</span>
              </div>
              <div>
                <p className="font-medium text-sm">
                  {t("Marque como lido", "Mark as read")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t(
                    "Clique no botão de cada dia para registrar seu progresso. O progresso é salvo por plano.",
                    "Click the button for each day to record your progress. Progress is saved per plan."
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-primary/10 w-8 h-8 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-primary">4</span>
              </div>
              <div>
                <p className="font-medium text-sm">
                  {t("Acompanhe seu progresso", "Track your progress")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t(
                    "Veja quantas leituras faltam em cada mês e no total. Continue até completar o ano!",
                    "See how many readings remain each month and in total. Keep going until you complete the year!"
                  )}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="flex justify-center">
        <Link href="/dashboard/readings">
          <Button size="lg" className="gap-2">
            {t("Ir para Leituras", "Go to Readings")}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
