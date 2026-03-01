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

interface DailyReading {
  id: string;
  dayNumber: number;
  dateDisplay: string;
  bibleTextMain: string;
  bibleTextDevo: string | null;
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
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Track your Bible reading progress
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Progress
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.completionPercentage}%
            </div>
            <p className="text-xs text-muted-foreground">
              {completedCount} of {totalReadings} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Current Streak
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentStreak}</div>
            <p className="text-xs text-muted-foreground">consecutive days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{remainingReadings}</div>
            <p className="text-xs text-muted-foreground">readings left</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold truncate">{data.plan?.title}</div>
            <Button variant="link" asChild className="h-auto p-0 text-xs">
              <Link href="/dashboard/plans">Change plan</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Progress Card */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
          <CardDescription>
            Your journey through the complete Bible reading plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Progress value={data.completionPercentage} className="h-3" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {completedCount} readings completed
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
                  Today's Reading
                  <Badge>Day {data.todayReading.dayNumber}</Badge>
                </CardTitle>
                <CardDescription>
                  {data.todayReading.dateDisplay}
                </CardDescription>
              </div>
              <Button asChild>
                <Link href="/dashboard/readings">View Reading</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <h4 className="text-sm font-semibold mb-1">Main Reading</h4>
                <p className="text-sm text-muted-foreground">
                  {data.todayReading.bibleTextMain}
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
                View All Readings
              </CardTitle>
              <CardDescription>
                See your complete reading plan and track progress
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/dashboard/plans">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Change Plan
              </CardTitle>
              <CardDescription>
                Switch to a different reading plan anytime
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <Link href="/dashboard/profile">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Update Profile
              </CardTitle>
              <CardDescription>
                Manage your account settings and preferences
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>
      </div>
    </div>
  );
}
