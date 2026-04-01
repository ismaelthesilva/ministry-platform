"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { selectPlan } from "@/app/dashboard/actions";
import { useState } from "react";
import { CheckCircle2, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface Plan {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  language: string;
}

interface PlansViewProps {
  plans: Plan[];
  userId: string;
  currentPlanId?: string;
}

export function PlansView({ plans, userId, currentPlanId }: PlansViewProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const { language } = useLanguage();
  const isBr = language === "br";
  const t = (br: string, en: string) => (isBr ? br : en);

  const handleSelectPlan = async (planSlug: string, language: string) => {
    setLoading(planSlug);
    const result = await selectPlan(userId, planSlug, language);

    if (result.success) {
      router.push("/dashboard/readings");
      router.refresh();
    }
    setLoading(null);
  };

  // Group plans by slug (combining languages)
  const groupedPlans = plans.reduce((acc, plan) => {
    if (!acc[plan.slug]) {
      acc[plan.slug] = [];
    }
    acc[plan.slug].push(plan);
    return acc;
  }, {} as Record<string, Plan[]>);

  const planDescriptions: Record<
    string,
    { title: string; description: string }
  > = {
    bible: {
      title: t("Só a Bíblia", "Bible Only"),
      description: t(
        "Leituras diárias da Bíblia completa em um ano.",
        "Focus on daily Bible readings through the entire scripture in one year."
      ),
    },
    prophetic: {
      title: t("Leitura Profética", "Prophetic Reading"),
      description: t(
        "Combine leituras bíblicas com comentários proféticos e devocionais.",
        "Combine Bible readings with prophetic commentary and devotional insights."
      ),
    },
    classic: {
      title: t("Leitura Clássica", "Classical Reading"),
      description: t(
        "Leituras bíblicas combinadas com literatura cristã clássica.",
        "Bible readings paired with classical Christian literature and commentary."
      ),
    },
  };

  return (
    <div className="container max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t("Planos de Leitura", "Reading Plans")}
        </h1>
        <p className="text-muted-foreground">
          {t(
            "Escolha um plano de leitura para guiar seu estudo bíblico diário",
            "Choose a reading plan to guide your daily Bible study"
          )}
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(groupedPlans).map(([slug, planGroup]) => {
          const info = planDescriptions[slug] || {
            title: planGroup[0].title,
            description: planGroup[0].description || "",
          };
          const isCurrentPlan = planGroup.some((p) => p.id === currentPlanId);

          return (
            <Card
              key={slug}
              className={cn(
                "flex flex-col transition-all hover:shadow-lg",
                isCurrentPlan && "border-primary"
              )}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <BookOpen className="h-8 w-8 text-primary" />
                  {isCurrentPlan && (
                    <Badge variant="default">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      {t("Ativo", "Active")}
                    </Badge>
                  )}
                </div>
                <CardTitle className="mt-4">{info.title}</CardTitle>
                <CardDescription>{info.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">
                      {t("Duração:", "Duration:")}{" "}
                    </span>
                    {t("366 dias", "366 days")}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">
                      {t("Disponível em:", "Available in:")}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {planGroup.map((plan) => (
                      <Badge key={plan.id} variant="outline">
                        {plan.language === "br" ? "🇧🇷 PT" : "🇺🇸 EN"}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                {planGroup.map((plan) => (
                  <Button
                    key={plan.id}
                    variant={
                      plan.id === currentPlanId ? "secondary" : "default"
                    }
                    className="flex-1"
                    onClick={() => handleSelectPlan(plan.slug, plan.language)}
                    disabled={
                      loading === plan.slug || plan.id === currentPlanId
                    }
                  >
                    {plan.id === currentPlanId
                      ? t("Plano Atual", "Current Plan")
                      : plan.language === "br"
                      ? t("Selecionar PT", "Select PT")
                      : t("Selecionar EN", "Select EN")}
                  </Button>
                ))}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Info Section */}
      <Card>
        <CardHeader>
          <CardTitle>{t("Como funciona", "How it works")}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span>
                {t(
                  "Selecione um plano de leitura que se encaixe nos seus objetivos espirituais",
                  "Select a reading plan that fits your spiritual growth goals"
                )}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span>
                {t(
                  "Siga leituras diárias planejadas para você percorrer toda a Bíblia em um ano",
                  "Follow daily readings designed to take you through the entire Bible in one year"
                )}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span>
                {t(
                  "Acompanhe seu progresso e marque as leituras como concluídas",
                  "Track your progress and mark readings as complete as you go"
                )}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span>
                {t(
                  "Troque de plano a qualquer momento para explorar diferentes abordagens",
                  "Switch plans anytime to explore different reading approaches"
                )}
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
