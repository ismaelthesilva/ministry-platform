"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Calendar,
  Flame,
  BarChart3,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface DailyReading {
  id: string;
  dayNumber: number;
  date: string;
  bible: string | null;
  author: string | null;
  book: string | null;
  title: string | null;
}

interface TrackerData {
  user: { preferredLanguage?: string; selectedPlanId?: string };
  plan: { title: string } | null;
  todayReading: DailyReading | null;
  completionPercentage: number;
  completedReadingIds: string[];
  allReadings: DailyReading[];
}

const DAY_LABELS_EN = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const DAY_LABELS_BR = ["Do", "Se", "Te", "Qu", "Qi", "Sx", "Sá"];

const MONTH_LABELS_EN = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const MONTH_LABELS_BR = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

const MONTH_KEYS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

function getMonthKeyFromDate(dateStr: string): string {
  const parts = dateStr.split("-");
  const alpha = parts.find((p) => /^[a-zA-Z]+$/.test(p));
  return (alpha || "").toLowerCase().slice(0, 3);
}

export function DashboardHome({ data }: { data: TrackerData; userId: string }) {
  const { t, language } = useLanguage();

  const completedCount = data.completedReadingIds.length;
  const totalReadings = data.allReadings.length;
  const remainingReadings = totalReadings - completedCount;
  const todayDayNumber = data.todayReading?.dayNumber ?? 0;
  const todayIsCompleted =
    !!data.todayReading &&
    data.completedReadingIds.includes(data.todayReading.id);

  // Streak: consecutive completed readings backwards from today
  const readingsUpToToday = [...data.allReadings]
    .filter((r) => r.dayNumber <= todayDayNumber)
    .sort((a, b) => b.dayNumber - a.dayNumber);

  let currentStreak = 0;
  for (const r of readingsUpToToday) {
    if (data.completedReadingIds.includes(r.id)) currentStreak++;
    else break;
  }

  // Last 7 days dots
  const today = new Date();
  const dayLabels = language === "br" ? DAY_LABELS_BR : DAY_LABELS_EN;
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const dayNum = todayDayNumber - 6 + i;
    const reading = data.allReadings.find((r) => r.dayNumber === dayNum);
    const isDone = reading
      ? data.completedReadingIds.includes(reading.id)
      : false;
    const isToday = i === 6;
    const dowIndex = (today.getDay() - (6 - i) + 7) % 7;
    return {
      dayNum,
      isDone,
      isToday,
      dayLabel: dayLabels[dowIndex],
      exists: dayNum > 0 && !!reading,
    };
  });

  const isOnTrack = currentStreak > 0 || todayIsCompleted;

  // Monthly breakdown
  const monthLabels = language === "br" ? MONTH_LABELS_BR : MONTH_LABELS_EN;
  const completedSet = new Set(data.completedReadingIds);
  const monthlyStats = MONTH_KEYS.map((mk, idx) => {
    const monthReadings = data.allReadings.filter(
      (r) => getMonthKeyFromDate(r.date) === mk
    );
    const done = monthReadings.filter((r) => completedSet.has(r.id)).length;
    return {
      label: monthLabels[idx],
      total: monthReadings.length,
      done,
      pct:
        monthReadings.length > 0
          ? Math.round((done / monthReadings.length) * 100)
          : 0,
    };
  }).filter((m) => m.total > 0);

  // Best month
  const bestMonth =
    monthlyStats.length > 0
      ? monthlyStats.reduce((a, b) => (a.pct > b.pct ? a : b))
      : null;

  return (
    <div className="container max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {t("dashboard.title")}
          </h1>
          <p className="text-muted-foreground text-sm">
            {t("dashboard.welcome")}
          </p>
        </div>
        <Badge variant="outline" className="text-xs font-medium shrink-0">
          {language === "en" ? "EN" : "BR"} · {data.plan?.title}
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {/* Progress % */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("dashboard.stats.totalProgress")}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">
              {data.completionPercentage}%
            </div>
            <Progress
              value={data.completionPercentage}
              className="h-1.5 mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {completedCount} / {totalReadings}
            </p>
          </CardContent>
        </Card>

        {/* Streak */}
        <Card
          className={cn(
            currentStreak >= 7 &&
              "border-amber-300/60 bg-amber-50/40 dark:border-amber-700/40 dark:bg-amber-950/10"
          )}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("dashboard.stats.currentStreak")}
            </CardTitle>
            {currentStreak >= 3 ? (
              <Flame className="h-4 w-4 text-amber-500" />
            ) : (
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">
              {currentStreak}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("dashboard.stats.consecutiveDays")}
            </p>
          </CardContent>
        </Card>

        {/* Remaining */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("dashboard.stats.remaining")}
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">
              {remainingReadings}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("dashboard.stats.readingsLeft")}
            </p>
          </CardContent>
        </Card>

        {/* Current Plan */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("dashboard.stats.currentPlan")}
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-base font-bold truncate leading-tight">
              {data.plan?.title}
            </div>
            <Button
              variant="link"
              asChild
              className="h-auto p-0 text-xs mt-0.5"
            >
              <Link href="/dashboard/plans">
                {t("dashboard.stats.changePlan")}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Today's Reading + 7-day activity */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Today's Reading */}
        {data.todayReading && (
          <Card
            className={cn(
              "border-l-4",
              todayIsCompleted
                ? "border-l-emerald-500 bg-emerald-50/30 border-emerald-200 dark:bg-emerald-950/10 dark:border-emerald-800"
                : "border-l-blue-500 bg-blue-50/30 border-blue-200 dark:bg-blue-950/10 dark:border-blue-800"
            )}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <CardTitle className="flex flex-wrap items-center gap-2 text-base">
                    {t("dashboard.today.title")}
                    <Badge variant="secondary" className="shrink-0 text-[10px]">
                      {t("dashboard.today.day")} {data.todayReading.dayNumber}
                    </Badge>
                    {todayIsCompleted && (
                      <Badge className="bg-emerald-500 text-white border-0 shrink-0 text-[10px]">
                        ✓ {t("dashboard.monthlyProgress.done")}
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {data.todayReading.date}
                  </CardDescription>
                </div>
                <Button
                  asChild
                  size="sm"
                  variant={todayIsCompleted ? "outline" : "default"}
                >
                  <Link href="/dashboard/readings">
                    {t("dashboard.today.viewReading")}
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                  {t("dashboard.today.mainReading")}
                </h4>
                <p className="text-sm font-medium">{data.todayReading.bible}</p>
              </div>
              {data.todayReading.book && (
                <div>
                  <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                    {t("dashboard.readings.columns.book")}
                  </h4>
                  <p className="text-sm">{data.todayReading.book}</p>
                </div>
              )}
              {data.todayReading.author && (
                <div>
                  <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                    {t("dashboard.readings.columns.classicAuthor")}
                  </h4>
                  <p className="text-sm">{data.todayReading.author}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* 7-day activity */}
        {todayDayNumber > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  {t("dashboard.readings.weekProgress")}
                </CardTitle>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[10px] font-medium",
                    isOnTrack
                      ? "border-emerald-400 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400"
                      : "border-amber-400 text-amber-600 bg-amber-50 dark:bg-amber-950/30 dark:text-amber-400"
                  )}
                >
                  {isOnTrack
                    ? t("dashboard.readings.onTrack")
                    : t("dashboard.readings.behind")}
                </Badge>
              </div>
              <CardDescription>
                {currentStreak} {t("dashboard.stats.consecutiveDays")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-1.5">
                {last7.map(({ isDone, isToday, dayLabel, exists }, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-1.5 flex-1"
                  >
                    <div
                      className={cn(
                        "w-full rounded-md flex items-center justify-center transition-colors",
                        "h-9",
                        !exists
                          ? "bg-muted/30 opacity-30"
                          : isDone
                          ? "bg-emerald-500 shadow-sm shadow-emerald-200 dark:shadow-emerald-900"
                          : isToday
                          ? "bg-blue-100 ring-2 ring-blue-400 dark:bg-blue-950/40 dark:ring-blue-600"
                          : "bg-muted/50"
                      )}
                    >
                      {isDone && (
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-[9px] font-semibold uppercase",
                        isToday
                          ? "text-blue-500 dark:text-blue-400"
                          : "text-muted-foreground"
                      )}
                    >
                      {dayLabel}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Monthly Breakdown */}
      {monthlyStats.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  {t("dashboard.monthlyProgress.title")}
                </CardTitle>
                <CardDescription>
                  {bestMonth && bestMonth.pct > 0
                    ? `${t("dashboard.monthlyProgress.bestMonth")
                        .replace("{month}", bestMonth.label)
                        .replace("{pct}", String(bestMonth.pct))}`
                    : t("dashboard.monthlyProgress.startReadings")}
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/readings">
                  {t("dashboard.monthlyProgress.viewAll")}
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2">
              {monthlyStats.map((m) => (
                <div key={m.label} className="flex flex-col items-center gap-1">
                  <div className="relative w-full h-16 bg-muted/30 rounded-md overflow-hidden">
                    <div
                      className={cn(
                        "absolute bottom-0 w-full rounded-md transition-all",
                        m.pct === 100
                          ? "bg-emerald-500"
                          : m.pct >= 50
                          ? "bg-blue-500"
                          : m.pct > 0
                          ? "bg-amber-400"
                          : "bg-muted/50"
                      )}
                      style={{ height: `${Math.max(m.pct, 2)}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-medium text-muted-foreground">
                    {m.label}
                  </span>
                  <span className="text-[9px] tabular-nums font-semibold">
                    {m.done}/{m.total}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Overall Progress */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">
            {t("dashboard.progress.title")}
          </CardTitle>
          <CardDescription>{t("dashboard.progress.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={data.completionPercentage} className="h-3" />
          <div className="flex items-center justify-between text-xs mt-2">
            <span className="text-muted-foreground">
              {completedCount} / {totalReadings}
            </span>
            <span className="font-semibold">{data.completionPercentage}%</span>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            href: "/dashboard/readings",
            icon: <BookOpen className="h-5 w-5" />,
            title: t("dashboard.quickActions.viewAll"),
            desc: t("dashboard.quickActions.viewAllDesc"),
          },
          {
            href: "/dashboard/plans",
            icon: <Calendar className="h-5 w-5" />,
            title: t("dashboard.quickActions.changePlan"),
            desc: t("dashboard.quickActions.changePlanDesc"),
          },
          {
            href: "/dashboard/profile",
            icon: <CheckCircle2 className="h-5 w-5" />,
            title: t("dashboard.quickActions.updateProfile"),
            desc: t("dashboard.quickActions.updateProfileDesc"),
          },
        ].map(({ href, icon, title, desc }) => (
          <Card
            key={href}
            className="hover:shadow-md transition-shadow cursor-pointer group"
          >
            <Link href={href}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm group-hover:text-primary transition-colors">
                  {icon}
                  {title}
                </CardTitle>
                <CardDescription className="text-xs">{desc}</CardDescription>
              </CardHeader>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
