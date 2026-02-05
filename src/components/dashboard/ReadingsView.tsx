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
import { Badge } from "@/components/ui/badge";
import { markReadingComplete } from "@/app/dashboard/actions";
import { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

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
  slug: string;
}

interface TrackerData {
  user: User;
  plan: Plan | null;
  todayReading: DailyReading | null;
  completionPercentage: number;
  completedReadingIds: string[];
  allReadings: DailyReading[];
}

interface ReadingsViewProps {
  data: TrackerData;
  userId: string;
}

export function ReadingsView({ data, userId }: ReadingsViewProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleToggleReading = async (readingId: string) => {
    setLoading(readingId);
    await markReadingComplete(userId, readingId);
    router.refresh();
    setLoading(null);
  };

  const isReadingCompleted = (readingId: string) => {
    return data.completedReadingIds.includes(readingId);
  };

  const showDevotional = data.allReadings.some((r) => r.bibleTextDevo);
  const showCommentary = data.allReadings.some((r) => r.commentaryAuthor);

  return (
    <div className="container max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {data.plan?.title}
        </h1>
        <p className="text-muted-foreground">Track your daily Bible readings</p>
      </div>

      {/* Progress Card */}
      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
          <CardDescription>
            {data.completedReadingIds.length} of {data.allReadings.length}{" "}
            readings completed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{data.completionPercentage}%</span>
              <span className="text-muted-foreground">
                {data.allReadings.length - data.completedReadingIds.length}{" "}
                remaining
              </span>
            </div>
            <Progress value={data.completionPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Today's Reading Card */}
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
              <Button
                variant={
                  isReadingCompleted(data.todayReading.id)
                    ? "secondary"
                    : "default"
                }
                size="sm"
                onClick={() => handleToggleReading(data.todayReading!.id)}
                disabled={loading === data.todayReading.id}
              >
                {isReadingCompleted(data.todayReading.id) ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Completed
                  </>
                ) : (
                  <>
                    <Circle className="mr-2 h-4 w-4" />
                    Mark Complete
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-1">Main Reading</h4>
                <p className="text-muted-foreground">
                  {data.todayReading.bibleTextMain}
                </p>
              </div>
              {data.todayReading.bibleTextDevo && (
                <div>
                  <h4 className="font-semibold mb-1">Devotional</h4>
                  <p className="text-muted-foreground">
                    {data.todayReading.bibleTextDevo}
                  </p>
                </div>
              )}
              {data.todayReading.commentaryAuthor && (
                <div>
                  <h4 className="font-semibold mb-1">Commentary</h4>
                  <p className="text-muted-foreground">
                    {data.todayReading.commentaryAuthor} -{" "}
                    {data.todayReading.commentaryWork}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Readings Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Readings</CardTitle>
          <CardDescription>
            Complete year reading plan with 366 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="h-10 px-4 text-left align-middle font-medium">
                    Day
                  </th>
                  <th className="h-10 px-4 text-left align-middle font-medium">
                    Date
                  </th>
                  <th className="h-10 px-4 text-left align-middle font-medium">
                    Main Reading
                  </th>
                  {showDevotional && (
                    <th className="h-10 px-4 text-left align-middle font-medium">
                      Devotional
                    </th>
                  )}
                  {showCommentary && (
                    <th className="h-10 px-4 text-left align-middle font-medium">
                      Commentary
                    </th>
                  )}
                  <th className="h-10 px-4 text-center align-middle font-medium">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.allReadings.map((reading) => {
                  const completed = isReadingCompleted(reading.id);
                  const isToday = reading.id === data.todayReading?.id;

                  return (
                    <tr
                      key={reading.id}
                      className={cn(
                        "border-b transition-colors hover:bg-muted/50",
                        isToday && "bg-primary/5",
                        completed && "opacity-60",
                      )}
                    >
                      <td className="p-4 align-middle">
                        <span className="font-medium">{reading.dayNumber}</span>
                      </td>
                      <td className="p-4 align-middle whitespace-nowrap">
                        {reading.dateDisplay}
                      </td>
                      <td className="p-4 align-middle">
                        {reading.bibleTextMain}
                      </td>
                      {showDevotional && (
                        <td className="p-4 align-middle">
                          {reading.bibleTextDevo || "-"}
                        </td>
                      )}
                      {showCommentary && (
                        <td className="p-4 align-middle">
                          {reading.commentaryAuthor
                            ? `${reading.commentaryAuthor}`
                            : "-"}
                        </td>
                      )}
                      <td className="p-4 align-middle text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleReading(reading.id)}
                          disabled={loading === reading.id}
                          className="h-8 w-8 p-0"
                        >
                          {completed ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          )}
                        </Button>
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
  );
}
