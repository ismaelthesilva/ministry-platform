"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { markReadingComplete } from "@/app/bible-tracker/actions";
import { handleSignOut } from "@/app/bible-tracker/logout-action";
import { clearUserPlan } from "@/app/bible-tracker/clear-plan-action";
import { useState } from "react";
import { CheckCircle2, LogOut, List } from "lucide-react";
import { useRouter } from "next/navigation";

interface DailyReading {
  id: string;
  dayNumber: number;
  date: string;
  bible: string | null;
  author: string | null;
  book: string | null;
  title: string | null;
}

interface User {
  preferredLanguage?: string;
  selectedPlanId?: string;
}

interface Plan {
  title: string;
}

interface TrackerData {
  user: User;
  plan: Plan | null;
  todayReading: DailyReading | null;
  completionPercentage: number;
  completedReadingIds: string[];
  allReadings: DailyReading[];
}

export default function BibleTrackerDashboard({
  data,
  userId,
}: {
  data: TrackerData;
  userId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  // Get language from user preferences
  const language = data.user?.preferredLanguage || "pt";

  // Translation helper
  const t = (pt: string, en: string) => (language === "pt" ? pt : en);

  const normalizeToken = (value: string) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .trim();

  const isBr = language !== "en";

  const monthOptions = [
    { key: "jan", label: isBr ? "Jan" : "Jan" },
    { key: "feb", label: isBr ? "Fev" : "Feb" },
    { key: "mar", label: isBr ? "Mar" : "Mar" },
    { key: "apr", label: isBr ? "Abr" : "Apr" },
    { key: "may", label: isBr ? "Mai" : "May" },
    { key: "jun", label: isBr ? "Jun" : "Jun" },
    { key: "jul", label: isBr ? "Jul" : "Jul" },
    { key: "aug", label: isBr ? "Ago" : "Aug" },
    { key: "sep", label: isBr ? "Set" : "Sep" },
    { key: "oct", label: isBr ? "Out" : "Oct" },
    { key: "nov", label: isBr ? "Nov" : "Nov" },
    { key: "dec", label: isBr ? "Dez" : "Dec" },
  ];

  const monthTokenMap: Record<string, string> = {
    jan: "jan",
    feb: "feb",
    mar: "mar",
    apr: "apr",
    may: "may",
    jun: "jun",
    jul: "jul",
    aug: "aug",
    sep: "sep",
    oct: "oct",
    nov: "nov",
    dec: "dec",
    january: "jan",
    february: "feb",
    march: "mar",
    april: "apr",
    june: "jun",
    july: "jul",
    august: "aug",
    september: "sep",
    sept: "sep",
    october: "oct",
    november: "nov",
    december: "dec",
    fev: "feb",
    abr: "apr",
    mai: "may",
    ago: "aug",
    set: "sep",
    out: "oct",
    dez: "dec",
    janeiro: "jan",
    fevereiro: "feb",
    marco: "mar",
    abril: "apr",
    maio: "may",
    junho: "jun",
    julho: "jul",
    agosto: "aug",
    setembro: "sep",
    outubro: "oct",
    novembro: "nov",
    dezembro: "dec",
  };

  const getMonthKeyFromDate = (date: string) => {
    if (!date) return "";
    const lower = normalizeToken(date);
    let token = "";
    if (lower.includes(" de ")) {
      token = lower.split(" de ").pop() ?? "";
    } else if (lower.includes("-")) {
      const parts = lower.split("-");
      token = parts.find((p) => /[a-z]/.test(p)) ?? "";
    } else if (lower.includes("/")) {
      const parts = lower.split("/");
      token = parts.find((p) => /[a-z]/.test(p)) ?? "";
    } else {
      const parts = lower.split(" ");
      token = parts.find((p) => /[a-z]/.test(p)) ?? "";
    }
    return monthTokenMap[normalizeToken(token)] ?? "";
  };

  const readingsByMonth = monthOptions.reduce(
    (acc, month) => ({ ...acc, [month.key]: [] as DailyReading[] }),
    {} as Record<string, DailyReading[]>
  );
  data.allReadings.forEach((reading) => {
    const monthKey = getMonthKeyFromDate(reading.date);
    if (monthKey && readingsByMonth[monthKey]) {
      readingsByMonth[monthKey].push(reading);
    }
  });

  const availableMonths = monthOptions.filter(
    (month) => readingsByMonth[month.key]?.length
  );

  const monthStats = availableMonths.reduce((acc, m) => {
    const rds = readingsByMonth[m.key] ?? [];
    const done = rds.filter((r) =>
      data.completedReadingIds.includes(r.id)
    ).length;
    acc[m.key] = { total: rds.length, completedCount: done };
    return acc;
  }, {} as Record<string, { total: number; completedCount: number }>);

  const defaultMonth =
    getMonthKeyFromDate(data.todayReading?.date || "") ||
    availableMonths[0]?.key ||
    monthOptions[0].key;
  const [activeMonth, setActiveMonth] = useState(defaultMonth);

  const handleToggleReading = async (
    readingId: string,
    isCompleted: boolean
  ) => {
    setLoading(readingId);

    if (!isCompleted) {
      const result = await markReadingComplete(userId, readingId);
      if (!result.success) {
        alert(result.error);
      }
    }

    setLoading(null);
    router.refresh();
  };

  const handleChangePlan = async () => {
    const confirmed = confirm(
      t(
        "Tem certeza que deseja mudar de plano? Seu progresso será mantido.",
        "Are you sure you want to change plans? Your progress will be kept."
      )
    );

    if (confirmed) {
      const result = await clearUserPlan(userId);
      if (result.success) {
        router.refresh();
      }
    }
  };

  // Show error state if no plan data
  if (!data.plan) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>
              {t("Erro ao carregar plano", "Error loading plan")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p>
              {t(
                "Não foi possível carregar seu plano de leitura. Verifique os logs do servidor para mais detalhes.",
                "Could not load your reading plan. Check server logs for details."
              )}
            </p>
            {data.user?.selectedPlanId && (
              <p className="text-sm text-gray-600">
                {t("ID do plano: ", "Plan ID: ")}
                {data.user.selectedPlanId}
              </p>
            )}
            <div className="flex gap-2">
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="flex-1"
              >
                {t("Tentar novamente", "Try again")}
              </Button>
              <Button onClick={() => handleSignOut()} className="flex-1">
                {t("Voltar ao login", "Back to login")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-lg">{data.plan?.title}</h2>
            <p className="text-sm text-gray-600">
              {t(
                `Ano Bíblico ${new Date().getFullYear()}`,
                `Bible Year ${new Date().getFullYear()}`
              )}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleChangePlan}
              className="gap-2"
            >
              <List className="h-4 w-4" />
              {t("Mudar Plano", "Change Plan")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSignOut()}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              {t("Sair", "Sign Out")}
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4 py-8">
        {/* Progress Bar */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{t("Seu Progresso", "Your Progress")}</CardTitle>
            <CardDescription>
              {t(
                "Continue lendo diariamente para completar o ano bíblico",
                "Keep reading daily to complete the Bible year"
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{t("Progresso", "Progress")}</span>
                <span className="font-semibold">
                  {data.completedReadingIds.length} / {data.allReadings.length}
                </span>
              </div>
              <Progress value={data.completionPercentage} className="h-3" />
              <p className="text-center text-sm text-gray-600">
                {data.completionPercentage}%
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Readings Table */}
        <Card>
          <CardHeader>
            <CardTitle>{t("Leituras do Ano", "Year Readings")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeMonth} onValueChange={setActiveMonth}>
              <TabsList className="w-full justify-start overflow-x-auto gap-2 mb-4">
                <TabsTrigger value="all" className="flex flex-col items-start">
                  <span className="font-semibold">{t("Todos", "All")}</span>
                  <span className="opacity-75 text-xs">
                    {data.completedReadingIds.length} /{" "}
                    {data.allReadings.length}
                  </span>
                </TabsTrigger>
                {availableMonths.map((month) => {
                  const stats = monthStats[month.key] ?? {
                    total: 0,
                    completedCount: 0,
                  };
                  return (
                    <TabsTrigger
                      key={month.key}
                      value={month.key}
                      className="flex flex-col items-start"
                    >
                      <span className="font-semibold">{month.label}</span>
                      <span className="opacity-75 text-xs">
                        {stats.completedCount} / {stats.total}
                      </span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
              {["all", ...availableMonths.map((m) => m.key)].map((monthKey) => (
                <TabsContent key={monthKey} value={monthKey}>
                  <div className="overflow-x-auto rounded-md border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-100 bg-gray-50">
                          <th className="py-2 px-3 text-left text-xs font-semibold">
                            {t("Dia", "Day")}
                          </th>
                          <th className="py-2 px-3 text-left text-xs font-semibold">
                            {t("Data", "Date")}
                          </th>
                          <th className="py-2 px-3 text-left text-xs font-semibold">
                            {t("Leitura Principal", "Main Reading")}
                          </th>
                          {data.allReadings.some((r) => r.author) && (
                            <th className="py-2 px-3 text-left text-xs font-semibold">
                              {t("Comentário", "Commentary")}
                            </th>
                          )}
                          <th className="py-2 px-3 text-center text-xs font-semibold">
                            {t("Status", "Status")}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {(monthKey === "all"
                          ? data.allReadings
                          : readingsByMonth[monthKey] ?? []
                        ).map((reading) => {
                          const isCompleted = data.completedReadingIds.includes(
                            reading.id
                          );
                          const isLoading = loading === reading.id;

                          return (
                            <tr
                              key={reading.id}
                              className={`transition-colors hover:bg-gray-50 ${
                                isCompleted ? "bg-green-50" : ""
                              }`}
                            >
                              <td className="py-2 px-3 text-xs font-medium">
                                {reading.dayNumber}
                              </td>
                              <td className="py-2 px-3 text-xs">
                                {reading.date}
                              </td>
                              <td className="py-2 px-3 text-xs">
                                {reading.bible}
                              </td>
                              {data.allReadings.some((r) => r.author) && (
                                <td className="py-2 px-3 text-xs">
                                  {reading.author ? (
                                    <div>
                                      <div className="font-medium">
                                        {reading.author}
                                      </div>
                                      <div className="text-[10px] text-gray-600">
                                        {reading.book}
                                      </div>
                                    </div>
                                  ) : (
                                    "-"
                                  )}
                                </td>
                              )}
                              <td className="py-2 px-3 text-center">
                                {isCompleted ? (
                                  <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" />
                                ) : (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    disabled={isLoading}
                                    onClick={() =>
                                      handleToggleReading(reading.id, false)
                                    }
                                  >
                                    {isLoading
                                      ? t("...", "...")
                                      : t("Ler", "Read")}
                                  </Button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
