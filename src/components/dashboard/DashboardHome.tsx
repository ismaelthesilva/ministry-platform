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
import { BookOpen, CheckCircle2, TrendingUp, Calendar } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

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

interface DashboardHomeProps {
  data: TrackerData;
  userId: string;
}

export function DashboardHome({ data }: DashboardHomeProps) {
  const { t } = useLanguage();
  const completedCount = data.completedReadingIds.length;
  const totalReadings = data.allReadings.length;
  const remainingReadings = totalReadings - completedCount;

  // Calculate streak (consecutive days)
  const sortedReadings = data.allReadings
    .map((r) => ({
      ...r,
      completed: data.completedReadingIds.includes(r.id),
    }))
    .sort((a, b) => a.dayNumber - b.dayNumber);

  let currentStreak = 0;
  for (let i = sortedReadings.length - 1; i >= 0; i--) {
    if (sortedReadings[i].completed) {
      currentStreak++;
    } else {
      break;
    }
  }

  return (
    <div className="container max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t("dashboard.title")}
        </h1>
        <p className="text-muted-foreground">{t("dashboard.welcome")}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("dashboard.stats.totalProgress")}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.completionPercentage}%
            </div>
            <p className="text-xs text-muted-foreground">
              {completedCount} / {totalReadings}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("dashboard.stats.currentStreak")}
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStreak}</div>
            <p className="text-xs text-muted-foreground">
              {t("dashboard.stats.consecutiveDays")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("dashboard.stats.remaining")}
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{remainingReadings}</div>
            <p className="text-xs text-muted-foreground">
              {t("dashboard.stats.readingsLeft")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("dashboard.stats.currentPlan")}
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold truncate">{data.plan?.title}</div>
            <Button variant="link" asChild className="h-auto p-0 text-xs">
              <Link href="/dashboard/plans">
                {t("dashboard.stats.changePlan")}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Progress Card */}
      <Card>
        <CardHeader>
          <CardTitle>{t("dashboard.progress.title")}</CardTitle>
          <CardDescription>{t("dashboard.progress.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Progress value={data.completionPercentage} className="h-3" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {completedCount} / {totalReadings}
              </span>
              <span className="font-medium">{data.completionPercentage}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Reading */}
      {data.todayReading && (
        <Card className="border-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {t("dashboard.today.title")}
                  <Badge>
                    {t("dashboard.today.day")} {data.todayReading.dayNumber}
                  </Badge>
                </CardTitle>
                <CardDescription>{data.todayReading.date}</CardDescription>
              </div>
              <Button asChild>
                <Link href="/dashboard/readings">
                  {t("dashboard.today.viewReading")}
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <h4 className="text-sm font-semibold mb-1">
                  {t("dashboard.today.mainReading")}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {data.todayReading.bible}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/dashboard/readings">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                {t("dashboard.quickActions.viewAll")}
              </CardTitle>
              <CardDescription>
                {t("dashboard.quickActions.viewAllDesc")}
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/dashboard/plans">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {t("dashboard.quickActions.changePlan")}
              </CardTitle>
              <CardDescription>
                {t("dashboard.quickActions.changePlanDesc")}
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/dashboard/profile">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                {t("dashboard.quickActions.updateProfile")}
              </CardTitle>
              <CardDescription>
                {t("dashboard.quickActions.updateProfileDesc")}
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>
      </div>
    </div>
  );
}
