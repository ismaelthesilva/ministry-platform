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
  Loader2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { selectPlan } from "@/app/dashboard/actions";

export function PlansView({ userId }: { userId: string }) {
  const { t } = useLanguage();
  const router = useRouter();
  const [selectingSlug, setSelectingSlug] = useState<string | null>(null);

  const plans = [
    {
      slug: "bible",
      icon: BookOpen,
      title: t("plans.bible.title"),
      description: t("plans.bible.description"),
      includes: [
        t("plans.includes.dailyBibleReading"),
        t("plans.includes.complete365days"),
        t("plans.includes.oldAndNewTestament"),
      ],
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      slug: "prophetic",
      icon: ScrollText,
      title: t("plans.prophetic.title"),
      description: t("plans.prophetic.description"),
      includes: [
        t("plans.includes.dailyBibleReading"),
        t("plans.includes.propheticCommentary"),
        t("plans.includes.chapterTitles"),
      ],
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-950/30",
    },
    {
      slug: "classic",
      icon: BookMarked,
      title: t("plans.classic.title"),
      description: t("plans.classic.description"),
      includes: [
        t("plans.includes.dailyBibleReading"),
        t("plans.includes.classicAuthors"),
        t("plans.includes.referenceWorks"),
      ],
      color: "text-amber-600",
      bg: "bg-amber-50 dark:bg-amber-950/30",
    },
  ];

  const handleSelectPlan = async (slug: string) => {
    setSelectingSlug(slug);
    const lang = "br";
    await selectPlan(userId, slug, lang);
    router.push("/dashboard/readings");
  };

  return (
    <div className="container max-w-6xl mx-auto p-4 sm:p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          {t("plans.title")}
        </h1>
        <p className="text-muted-foreground max-w-2xl">{t("plans.subtitle")}</p>
      </div>

      {/* Plans */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const isSelecting = selectingSlug === plan.slug;
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
              <CardContent className="flex-1 flex flex-col gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    {t("plans.includes.label")}
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
                </div>
                <Button
                  className="w-full mt-auto"
                  disabled={selectingSlug !== null}
                  onClick={() => handleSelectPlan(plan.slug)}
                >
                  {isSelecting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("plans.selecting")}
                    </>
                  ) : (
                    t("plans.selectThisPlan")
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* How it works */}
      <Card>
        <CardHeader>
          <CardTitle>{t("plans.howItWorks.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                n: "1",
                title: t("plans.howItWorks.step1.title"),
                desc: t("plans.howItWorks.step1.desc"),
              },
              {
                n: "2",
                title: t("plans.howItWorks.step2.title"),
                desc: t("plans.howItWorks.step2.desc"),
              },
              {
                n: "3",
                title: t("plans.howItWorks.step3.title"),
                desc: t("plans.howItWorks.step3.desc"),
              },
              {
                n: "4",
                title: t("plans.howItWorks.step4.title"),
                desc: t("plans.howItWorks.step4.desc"),
              },
            ].map(({ n, title, desc }) => (
              <div key={n} className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 w-8 h-8 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary">{n}</span>
                </div>
                <div>
                  <p className="font-medium text-sm">{title}</p>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <div className="flex justify-center">
        <Link href="/dashboard/readings">
          <Button size="lg" className="gap-2" variant="outline">
            {t("plans.goToReadings")}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
