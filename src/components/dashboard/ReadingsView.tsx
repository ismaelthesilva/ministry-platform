"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toggleReadingComplete } from "@/app/dashboard/actions";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ReadingStatusButton } from "@/components/dashboard/ReadingStatusButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [loading, setLoading] = useState<string | null>(null);
  const [completedIds, setCompletedIds] = useState<string[]>(
    data.completedReadingIds,
  );

  const getDayFromDateDisplay = (dateDisplay: string) => {
    const match = dateDisplay.match(/^\s*(\d{1,2})/);
    return match?.[1] ?? "";
  };

  const normalizeToken = (value: string) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .trim();

  const monthOptions =
    data.user?.preferredLanguage === "en"
      ? [
          { key: "jan", label: "Jan" },
          { key: "feb", label: "Feb" },
          { key: "mar", label: "Mar" },
          { key: "apr", label: "Apr" },
          { key: "may", label: "May" },
          { key: "jun", label: "Jun" },
          { key: "jul", label: "Jul" },
          { key: "aug", label: "Aug" },
          { key: "sep", label: "Sep" },
          { key: "oct", label: "Oct" },
          { key: "nov", label: "Nov" },
          { key: "dec", label: "Dec" },
        ]
      : [
          { key: "jan", label: "Jan" },
          { key: "fev", label: "Fev" },
          { key: "mar", label: "Mar" },
          { key: "abr", label: "Abr" },
          { key: "mai", label: "Mai" },
          { key: "jun", label: "Jun" },
          { key: "jul", label: "Jul" },
          { key: "ago", label: "Ago" },
          { key: "set", label: "Set" },
          { key: "out", label: "Out" },
          { key: "nov", label: "Nov" },
          { key: "dez", label: "Dez" },
        ];

  const monthTokenMap: Record<string, string> = {
    janeiro: "jan",
    jan: "jan",
    january: "jan",
    fevereiro: "fev",
    fev: "fev",
    feb: "feb",
    february: "feb",
    marco: "mar",
    mar: "mar",
    march: "mar",
    abril: "abr",
    abr: "abr",
    april: "apr",
    maio: "mai",
    mai: "mai",
    may: "may",
    junho: "jun",
    jun: "jun",
    june: "jun",
    julho: "jul",
    jul: "jul",
    july: "jul",
    agosto: "ago",
    ago: "ago",
    august: "aug",
    setembro: "set",
    set: "set",
    sep: "sep",
    sept: "sep",
    september: "sep",
    outubro: "out",
    out: "out",
    oct: "oct",
    october: "oct",
    novembro: "nov",
    nov: "nov",
    november: "nov",
    dezembro: "dez",
    dez: "dez",
    dec: "dec",
    december: "dec",
  };

  const getMonthKeyFromDateDisplay = (dateDisplay: string) => {
    if (!dateDisplay) return "";
    const lower = normalizeToken(dateDisplay);
    let token = "";

    if (lower.includes(" de ")) {
      token = lower.split(" de ").pop() ?? "";
    } else if (lower.includes("-")) {
      token = lower.split("-").pop() ?? "";
    } else if (lower.includes("/")) {
      token = lower.split("/").pop() ?? "";
    } else {
      token = lower.split(" ")[1] ?? "";
    }

    return monthTokenMap[normalizeToken(token)] ?? "";
  };

  const readingsByMonth = monthOptions.reduce(
    (acc, month) => ({ ...acc, [month.key]: [] as DailyReading[] }),
    {} as Record<string, DailyReading[]>,
  );

  data.allReadings.forEach((reading) => {
    const monthKey = getMonthKeyFromDateDisplay(reading.dateDisplay);
    if (monthKey && readingsByMonth[monthKey]) {
      readingsByMonth[monthKey].push(reading);
    }
  });

  const availableMonths = monthOptions.filter(
    (month) => readingsByMonth[month.key]?.length,
  );

  const defaultMonth =
    getMonthKeyFromDateDisplay(data.todayReading?.dateDisplay || "") ||
    availableMonths[0]?.key ||
    monthOptions[0].key;

  const [activeMonth, setActiveMonth] = useState<string>(defaultMonth);

  const handleToggleReading = async (readingId: string) => {
    setLoading(readingId);
    const currentlyCompleted = isReadingCompleted(readingId);

    // Optimistic UI update
    if (currentlyCompleted) {
      setCompletedIds((prev) => prev.filter((id) => id !== readingId));
    } else {
      setCompletedIds((prev) => [...prev, readingId]);
    }

    const result = await toggleReadingComplete(
      userId,
      readingId,
      currentlyCompleted,
    );

    if (!result.success) {
      // Revert optimistic update on error
      if (currentlyCompleted) {
        setCompletedIds((prev) => [...prev, readingId]);
      } else {
        setCompletedIds((prev) => prev.filter((id) => id !== readingId));
      }
    }

    setLoading(null);
  };

  const isReadingCompleted = (readingId: string) => {
    return completedIds.includes(readingId);
  };

  const planSlug = data.plan?.slug?.toLowerCase() ?? "";
  const isPropheticPlan = planSlug.includes("prophetic");
  const isClassicPlan =
    planSlug.includes("classic") || planSlug.includes("classical");

  const showCommentary = data.allReadings.some((r) => r.commentaryAuthor);

  const baseColumns = isPropheticPlan
    ? [
        {
          key: "day",
          label: "Dia",
          className: "w-[80px]",
          render: (reading: DailyReading) =>
            getDayFromDateDisplay(reading.dateDisplay) || reading.dayNumber,
        },
        {
          key: "bibleTextMain",
          label: "Texto Bíblico",
          className: "max-w-[220px] truncate",
          render: (reading: DailyReading) => reading.bibleTextMain || "-",
        },
        {
          key: "commentaryWork",
          label: "Livro",
          className: "max-w-[180px] truncate",
          render: (reading: DailyReading) => reading.commentaryWork || "-",
        },
        {
          key: "topic",
          label: "Título",
          className: "max-w-[240px] truncate",
          render: (reading: DailyReading) => reading.topic || "-",
        },
      ]
    : isClassicPlan
      ? [
          {
            key: "day",
            label: "Dia",
            className: "w-[80px]",
            render: (reading: DailyReading) =>
              getDayFromDateDisplay(reading.dateDisplay) || reading.dayNumber,
          },
          {
            key: "bibleTextMain",
            label: "Texto Bíblico",
            className: "max-w-[220px] truncate",
            render: (reading: DailyReading) => reading.bibleTextMain || "-",
          },
          {
            key: "commentaryAuthor",
            label: "Autor Clássico",
            className: "max-w-[180px] truncate",
            render: (reading: DailyReading) => reading.commentaryAuthor || "-",
          },
          {
            key: "commentaryWork",
            label: "Obra de Referência",
            className: "max-w-[220px] truncate",
            render: (reading: DailyReading) =>
              reading.commentaryWork
                ? `${reading.commentaryWork}${
                    reading.commentaryRef ? ` • ${reading.commentaryRef}` : ""
                  }`
                : "-",
          },
          {
            key: "topic",
            label: "Tema Chave",
            className: "max-w-[240px] truncate",
            render: (reading: DailyReading) => reading.topic || "-",
          },
        ]
      : [
          {
            key: "day",
            label: "Day",
            className: "w-[80px]",
            render: (reading: DailyReading) =>
              getDayFromDateDisplay(reading.dateDisplay) || reading.dayNumber,
          },
          {
            key: "date",
            label: "Date",
            className: "w-[140px] whitespace-nowrap",
            render: (reading: DailyReading) => reading.dateDisplay,
          },
          {
            key: "bibleTextMain",
            label: "Main Reading",
            className: "max-w-[260px] truncate",
            render: (reading: DailyReading) => reading.bibleTextMain || "-",
          },
          ...(showCommentary
            ? [
                {
                  key: "commentaryAuthor",
                  label: "Commentary",
                  className: "max-w-[220px] truncate",
                  render: (reading: DailyReading) =>
                    reading.commentaryAuthor || "-",
                },
              ]
            : []),
        ];

  const mobileFields = baseColumns.filter(
    (column) => column.key !== "day" && column.key !== "date",
  );

  const tableMinWidth = isPropheticPlan
    ? "min-w-[980px]"
    : isClassicPlan
      ? "min-w-[900px]"
      : "min-w-[760px]";

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
            {completedIds.length} of {data.allReadings.length} readings
            completed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">
                {Math.round(
                  (completedIds.length / data.allReadings.length) * 100,
                )}
                %
              </span>
              <span className="text-muted-foreground">
                {data.allReadings.length - completedIds.length} remaining
              </span>
            </div>
            <Progress
              value={Math.round(
                (completedIds.length / data.allReadings.length) * 100,
              )}
              className="h-2"
            />
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
                  Today&apos;s Reading
                  <Badge>Day {data.todayReading.dayNumber}</Badge>
                </CardTitle>
                <CardDescription>
                  {data.todayReading.dateDisplay}
                </CardDescription>
              </div>
              <ReadingStatusButton
                completed={isReadingCompleted(data.todayReading.id)}
                loading={loading === data.todayReading.id}
                onClick={() => handleToggleReading(data.todayReading!.id)}
                showLabel
              />
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
              {isPropheticPlan && data.todayReading.topic && (
                <div>
                  <h4 className="font-semibold mb-1">
                    Título Oficial do Capítulo
                  </h4>
                  <p className="text-muted-foreground">
                    {data.todayReading.topic}
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
          <Tabs value={activeMonth} onValueChange={setActiveMonth}>
            <TabsList className="w-full justify-start overflow-x-auto gap-2">
              <TabsTrigger value="all">
                {data.user?.preferredLanguage === "en" ? "All" : "Todos"}
              </TabsTrigger>
              {availableMonths.map((month) => (
                <TabsTrigger key={month.key} value={month.key}>
                  {month.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {["all", ...availableMonths.map((m) => m.key)].map((monthKey) => (
              <TabsContent key={monthKey} value={monthKey}>
                <div className="space-y-4">
                  <div className="md:hidden space-y-3">
                    {(monthKey === "all"
                      ? data.allReadings
                      : (readingsByMonth[monthKey] ?? [])
                    ).map((reading) => {
                      const completed = isReadingCompleted(reading.id);
                      const isToday = reading.id === data.todayReading?.id;

                      return (
                        <div
                          key={reading.id}
                          className={cn(
                            "rounded-lg border border-gray-100 p-3 space-y-2",
                            isToday && "bg-primary/5",
                            completed &&
                              "bg-muted/70 text-muted-foreground opacity-60 grayscale",
                          )}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold">
                                Dia{" "}
                                {getDayFromDateDisplay(reading.dateDisplay) ||
                                  reading.dayNumber}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {reading.dateDisplay}
                              </p>
                            </div>
                            <ReadingStatusButton
                              completed={completed}
                              loading={loading === reading.id}
                              onClick={() => handleToggleReading(reading.id)}
                            />
                          </div>
                          <div className="grid gap-2 text-sm">
                            {mobileFields.map((column) => (
                              <div key={column.key} className="space-y-1">
                                <p className="text-xs text-muted-foreground">
                                  {column.label}
                                </p>
                                <p>{column.render(reading)}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="hidden md:block">
                    <div className="rounded-md border overflow-auto">
                      <table
                        className={cn(
                          "w-full text-sm table-fixed",
                          tableMinWidth,
                        )}
                      >
                        <thead>
                          <tr className="border-b border-gray-100 bg-muted/50">
                            {baseColumns.map((column) => (
                              <th
                                key={column.key}
                                className={cn(
                                  "h-8 py-2 px-3 text-left align-middle font-medium text-xs",
                                  column.className,
                                )}
                              >
                                {column.label}
                              </th>
                            ))}
                            <th className="h-8 py-2 px-3 text-center align-middle font-medium text-xs w-[90px]">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {(monthKey === "all"
                            ? data.allReadings
                            : (readingsByMonth[monthKey] ?? [])
                          ).map((reading) => {
                            const completed = isReadingCompleted(reading.id);
                            const isToday =
                              reading.id === data.todayReading?.id;

                            return (
                              <tr
                                key={reading.id}
                                className={cn(
                                  "transition-colors hover:bg-muted/50",
                                  isToday && "bg-primary/5",
                                  completed &&
                                    "bg-muted/60 text-muted-foreground opacity-60 grayscale",
                                )}
                              >
                                {baseColumns.map((column) => (
                                  <td
                                    key={column.key}
                                    className={cn(
                                      "py-2 px-3 align-middle text-xs",
                                      column.className,
                                      completed &&
                                        "bg-muted/60 text-muted-foreground opacity-60 grayscale",
                                    )}
                                  >
                                    {column.render(reading)}
                                  </td>
                                ))}
                                <td
                                  className={cn(
                                    "py-2 px-3 align-middle text-center text-xs",
                                    completed &&
                                      "bg-muted/60 text-muted-foreground opacity-60 grayscale",
                                  )}
                                >
                                  <ReadingStatusButton
                                    completed={completed}
                                    loading={loading === reading.id}
                                    onClick={() =>
                                      handleToggleReading(reading.id)
                                    }
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
