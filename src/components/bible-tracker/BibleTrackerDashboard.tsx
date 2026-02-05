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
import { markReadingComplete } from "@/app/bible-tracker/actions";
import { handleSignOut } from "@/app/bible-tracker/logout-action";
import { clearUserPlan } from "@/app/bible-tracker/clear-plan-action";
import { useState } from "react";
import { BookOpen, CheckCircle2, LogOut, List } from "lucide-react";
import { useRouter } from "next/navigation";

interface DailyReading {
  id: string;
  dayNumber: number;
  dateDisplay: string;
  bibleTextMain: string;
  bibleTextDevo: string | null;
  commentaryAuthor: string | null;
  commentaryWork: string | null;
  commentaryRef: string | null;
  topic: string | null;
  language: string;
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

  const handleToggleReading = async (
    readingId: string,
    isCompleted: boolean,
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
        "Are you sure you want to change plans? Your progress will be kept.",
      ),
    );

    if (confirmed) {
      const result = await clearUserPlan(userId);
      if (result.success) {
        router.refresh();
      }
    }
  };

  // Debug: Check if we have the necessary data
  console.log("Dashboard data:", {
    hasPlan: !!data.plan,
    hasTodayReading: !!data.todayReading,
    completionPercentage: data.completionPercentage,
    planTitle: data.plan?.title,
  });

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
                "Could not load your reading plan. Check server logs for details.",
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
                `Bible Year ${new Date().getFullYear()}`,
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
                "Keep reading daily to complete the Bible year",
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
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      {t("Dia", "Day")}
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      {t("Data", "Date")}
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">
                      {t("Leitura Principal", "Main Reading")}
                    </th>
                    {data.allReadings.some((r) => r.bibleTextDevo) && (
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        {t("Devocional", "Devotional")}
                      </th>
                    )}
                    {data.allReadings.some((r) => r.commentaryAuthor) && (
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        {t("Comentário", "Commentary")}
                      </th>
                    )}
                    <th className="px-4 py-3 text-center text-sm font-semibold">
                      {t("Status", "Status")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.allReadings.map((reading) => {
                    const isCompleted = data.completedReadingIds.includes(
                      reading.id,
                    );
                    const isLoading = loading === reading.id;

                    return (
                      <tr
                        key={reading.id}
                        className={`border-b hover:bg-gray-50 ${isCompleted ? "bg-green-50" : ""}`}
                      >
                        <td className="px-4 py-3 text-sm font-medium">
                          {reading.dayNumber}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {reading.dateDisplay}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {reading.bibleTextMain}
                        </td>
                        {data.allReadings.some((r) => r.bibleTextDevo) && (
                          <td className="px-4 py-3 text-sm">
                            {reading.bibleTextDevo || "-"}
                          </td>
                        )}
                        {data.allReadings.some((r) => r.commentaryAuthor) && (
                          <td className="px-4 py-3 text-sm">
                            {reading.commentaryAuthor ? (
                              <div>
                                <div className="font-medium">
                                  {reading.commentaryAuthor}
                                </div>
                                <div className="text-xs text-gray-600">
                                  {reading.commentaryWork} -{" "}
                                  {reading.commentaryRef}
                                </div>
                              </div>
                            ) : (
                              "-"
                            )}
                          </td>
                        )}
                        <td className="px-4 py-3 text-center">
                          {isCompleted ? (
                            <CheckCircle2 className="h-6 w-6 text-green-600 mx-auto" />
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={isLoading}
                              onClick={() =>
                                handleToggleReading(reading.id, false)
                              }
                            >
                              {isLoading ? t("...", "...") : t("Ler", "Read")}
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
