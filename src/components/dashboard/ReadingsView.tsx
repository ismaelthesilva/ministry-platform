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
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ReadingStatusButton } from "@/components/dashboard/ReadingStatusButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const { t, language } = useLanguage();
  const isBr = language === "br";
  const [loading, setLoading] = useState<string | null>(null);
  const [completedIds, setCompletedIds] = useState<string[]>(
    data.completedReadingIds
  );
  const [announcement, setAnnouncement] = useState("");

  const getDayFromDate = (date: string | undefined | null) => {
    if (!date) return "";
    const match = date.match(/^(\d{1,2})/);
    return match?.[1] ?? "";
  };

  const normalizeToken = (value: string) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .trim();

  const monthOptions = !isBr
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

  const getMonthKeyFromDate = (date: string) => {
    if (!date) return "";
    const lower = normalizeToken(date);
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

  const monthStats = availableMonths.reduce((acc, month) => {
    const monthReadings = readingsByMonth[month.key] ?? [];
    const completedCount = monthReadings.reduce(
      (count, reading) =>
        completedIds.includes(reading.id) ? count + 1 : count,
      0
    );
    acc[month.key] = {
      total: monthReadings.length,
      completedCount,
      completionPercentage: monthReadings.length
        ? Math.round((completedCount / monthReadings.length) * 100)
        : 0,
    };
    return acc;
  }, {} as Record<string, { total: number; completedCount: number; completionPercentage: number }>);

  const currentMonthKey = getMonthKeyFromDate(data.todayReading?.date || "");

  const getRowAttributes = (completed: boolean, isToday: boolean) => ({
    "data-status": completed ? "completed" : "pending",
    ...(isToday ? { "data-today": "true" } : {}),
  });

  const defaultMonth =
    currentMonthKey || availableMonths[0]?.key || monthOptions[0].key;

  const keyboardNavigationHint = t("dashboard.readings.keyboardHint");

  const [activeMonth, setActiveMonth] = useState<string>(defaultMonth);
  const tabsListRef = useRef<HTMLDivElement>(null);
  const totalReadings = data.allReadings.length;
  const totalCompletion = totalReadings
    ? Math.round((completedIds.length / totalReadings) * 100)
    : 0;

  useEffect(() => {
    const tabsContainer = tabsListRef.current;
    if (!tabsContainer) return;
    const trigger = tabsContainer.querySelector<HTMLElement>(
      `[data-value="${activeMonth}"]`
    );
    if (trigger) {
      const triggerRect = trigger.getBoundingClientRect();
      const containerRect = tabsContainer.getBoundingClientRect();
      if (
        triggerRect.left < containerRect.left ||
        triggerRect.right > containerRect.right
      ) {
        trigger.scrollIntoView({ behavior: "smooth", inline: "center" });
      }
    }
  }, [activeMonth]);

  const handleToggleReading = async (reading: DailyReading) => {
    setLoading(reading.id);
    const currentlyCompleted = completedIds.includes(reading.id);
    if (currentlyCompleted) {
      setCompletedIds((prev) => prev.filter((id) => id !== reading.id));
    } else {
      setCompletedIds((prev) => [...prev, reading.id]);
    }
    const result = await toggleReadingComplete(
      userId,
      reading.id,
      currentlyCompleted
    );
    if (!result.success) {
      if (currentlyCompleted) {
        setCompletedIds((prev) => [...prev, reading.id]);
      } else {
        setCompletedIds((prev) => prev.filter((id) => id !== reading.id));
      }
      setAnnouncement(t("dashboard.readings.unableToUpdate"));
    } else {
      const localizedDay = t("dashboard.today.day");
      const dayValue = getDayFromDate(reading.date) || reading.dayNumber;
      const actionText = currentlyCompleted
        ? t("dashboard.readings.markedIncomplete")
        : t("dashboard.readings.markedComplete");
      setAnnouncement(`${localizedDay} ${dayValue} ${actionText}`);
    }
    setLoading(null);
  };

  useEffect(() => {
    if (!announcement) return;
    const timeoutId = setTimeout(() => setAnnouncement(""), 3000);
    return () => clearTimeout(timeoutId);
  }, [announcement]);

  const isReadingCompleted = (readingId: string) =>
    completedIds.includes(readingId);

  const planSlug = data.plan?.slug?.toLowerCase() ?? "";
  const isPropheticPlan = planSlug.includes("prophetic");
  const isClassicPlan = planSlug.includes("classic");
  const showCommentary = data.allReadings.some((r) => r.author);

  const baseColumns = isPropheticPlan
    ? [
        {
          key: "day",
          label: t("dashboard.readings.columns.day"),
          className: "w-[80px]",
          render: (reading: DailyReading) =>
            getDayFromDate(reading.date) || reading.dayNumber,
        },
        {
          key: "bible",
          label: t("dashboard.readings.columns.bibleText"),
          className: "max-w-[220px] truncate",
          render: (reading: DailyReading) => reading.bible || "-",
        },
        {
          key: "book",
          label: t("dashboard.readings.columns.book"),
          className: "max-w-[180px] truncate",
          render: (reading: DailyReading) => reading.book || "-",
        },
        {
          key: "title",
          label: t("dashboard.readings.columns.chapterTitle"),
          className: "max-w-[240px] truncate",
          render: (reading: DailyReading) => reading.title || "-",
        },
      ]
    : isClassicPlan
    ? [
        {
          key: "day",
          label: t("dashboard.readings.columns.day"),
          className: "w-[80px]",
          render: (reading: DailyReading) =>
            getDayFromDate(reading.date) || reading.dayNumber,
        },
        {
          key: "bible",
          label: t("dashboard.readings.columns.bibleText"),
          className: "max-w-[220px] truncate",
          render: (reading: DailyReading) => reading.bible || "-",
        },
        {
          key: "author",
          label: t("dashboard.readings.columns.classicAuthor"),
          className: "max-w-[180px] truncate",
          render: (reading: DailyReading) => reading.author || "-",
        },
        {
          key: "book",
          label: t("dashboard.readings.columns.referenceWork"),
          className: "max-w-[220px] truncate",
          render: (reading: DailyReading) => reading.book || "-",
        },
        {
          key: "title",
          label: t("dashboard.readings.columns.keyTheme"),
          className: "max-w-[240px] truncate",
          render: (reading: DailyReading) => reading.title || "-",
        },
      ]
    : [
        {
          key: "day",
          label: t("dashboard.readings.columns.day"),
          className: "w-[80px]",
          render: (reading: DailyReading) =>
            getDayFromDate(reading.date) || reading.dayNumber,
        },
        {
          key: "date",
          label: t("dashboard.readings.columns.date"),
          className: "w-[140px] whitespace-nowrap",
          render: (reading: DailyReading) => reading.date,
        },
        {
          key: "bible",
          label: t("dashboard.readings.columns.mainReading"),
          className: "max-w-[260px] truncate",
          render: (reading: DailyReading) => reading.bible || "-",
        },
        ...(showCommentary
          ? [
              {
                key: "author",
                label: t("dashboard.readings.columns.commentary"),
                className: "max-w-[220px] truncate",
                render: (reading: DailyReading) => reading.author || "-",
              },
            ]
          : []),
      ];

  const mobileFields = baseColumns.filter(
    (column) => column.key !== "day" && column.key !== "date"
  );

  const tableMinWidth = isPropheticPlan
    ? "min-w-[980px]"
    : isClassicPlan
    ? "min-w-[900px]"
    : "min-w-[760px]";

  return (
    <div className="container max-w-7xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {data.plan?.title}
        </h1>
        <p className="text-muted-foreground">
          {t("dashboard.readings.trackProgress")}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("dashboard.readings.yourProgress")}</CardTitle>
          <CardDescription>
            {completedIds.length} / {data.allReadings.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div
              className="flex items-center justify-between text-sm"
              role="status"
              aria-live="polite"
            >
              <span className="font-medium">
                {Math.round(
                  (completedIds.length / data.allReadings.length) * 100
                )}
                %
              </span>
              <span className="text-muted-foreground">
                {data.allReadings.length - completedIds.length}{" "}
                {t("dashboard.stats.readingsLeft")}
              </span>
            </div>
            <Progress
              value={Math.round(
                (completedIds.length / data.allReadings.length) * 100
              )}
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>

      {announcement && (
        <p className="sr-only" aria-live="assertive">
          {announcement}
        </p>
      )}

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
              <ReadingStatusButton
                completed={isReadingCompleted(data.todayReading.id)}
                loading={loading === data.todayReading.id}
                onClick={() => handleToggleReading(data.todayReading!)}
                showLabel
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-1">
                  {t("dashboard.today.mainReading")}
                </h4>
                <p className="text-muted-foreground">
                  {data.todayReading.bible}
                </p>
              </div>
              {(isPropheticPlan || isClassicPlan) &&
                data.todayReading.title && (
                  <div>
                    <h4 className="font-semibold mb-1">
                      {t("dashboard.today.topic")}
                    </h4>
                    <p className="text-muted-foreground">
                      {data.todayReading.title}
                    </p>
                  </div>
                )}
              {data.todayReading.author && (
                <div>
                  <h4 className="font-semibold mb-1">
                    {t("dashboard.today.commentary")}
                  </h4>
                  <p className="text-muted-foreground">
                    {data.todayReading.author} - {data.todayReading.book}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{t("dashboard.readings.title")}</CardTitle>
          <CardDescription>{t("dashboard.readings.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeMonth} onValueChange={setActiveMonth}>
            <TabsList
              ref={tabsListRef}
              className="reading-tablist w-full justify-start overflow-x-auto gap-2"
              aria-label="Month filters"
            >
              <TabsTrigger
                value="all"
                data-value="all"
                className={cn(
                  "flex flex-col items-start gap-0.5 rounded-full px-3 py-1.5 text-sm transition-all duration-150 border border-transparent",
                  activeMonth === "all"
                    ? "bg-slate-900 text-white shadow"
                    : "bg-muted/30 text-muted-foreground hover:bg-muted/60"
                )}
              >
                <span className="font-semibold">
                  {t("dashboard.readings.all")} ({totalReadings})
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {totalCompletion}% {t("dashboard.readings.complete")}
                </span>
              </TabsTrigger>
              {availableMonths.map((month) => {
                const stats = monthStats[month.key] ?? {
                  total: readingsByMonth[month.key]?.length ?? 0,
                  completedCount: 0,
                  completionPercentage: 0,
                };
                const isCurrent = month.key === currentMonthKey;
                const isActive = activeMonth === month.key;
                return (
                  <TabsTrigger
                    key={month.key}
                    value={month.key}
                    data-value={month.key}
                    data-current={isCurrent ? "true" : undefined}
                    className={cn(
                      "flex flex-col items-start gap-0.5 rounded-full px-3 py-1.5 text-sm transition-all duration-150 border border-transparent",
                      isActive
                        ? "bg-slate-900 text-white shadow"
                        : "bg-muted/30 text-muted-foreground hover:bg-muted/60",
                      isCurrent && "ring-1 ring-blue-400/70"
                    )}
                  >
                    <span className="font-semibold">
                      {month.label} ({stats.total})
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {stats.completionPercentage}%{" "}
                      {t("dashboard.readings.complete")}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
            <p className="reading-tablist-hint" aria-live="polite">
              {keyboardNavigationHint}
            </p>
            {["all", ...availableMonths.map((m) => m.key)].map((monthKey) => (
              <TabsContent key={monthKey} value={monthKey}>
                <div className="space-y-4">
                  <div className="md:hidden space-y-3">
                    {(monthKey === "all"
                      ? data.allReadings
                      : readingsByMonth[monthKey] ?? []
                    ).map((reading) => {
                      const completed = isReadingCompleted(reading.id);
                      const isToday = reading.id === data.todayReading?.id;
                      return (
                        <div
                          key={reading.id}
                          className={cn("reading-card", "space-y-2", "text-sm")}
                          {...getRowAttributes(completed, isToday)}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-wide reading-status-label">
                                {t("dashboard.readings.columns.day")}
                                <span className="ml-1">
                                  {getDayFromDate(reading.date) ||
                                    reading.dayNumber}
                                </span>
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {reading.date}
                              </p>
                            </div>
                            <ReadingStatusButton
                              completed={completed}
                              loading={loading === reading.id}
                              onClick={() => handleToggleReading(reading)}
                            />
                          </div>
                          <div className="grid gap-2">
                            {mobileFields.map((column) => (
                              <div key={column.key} className="space-y-1">
                                <p className="text-[10px] text-muted-foreground tracking-wide">
                                  {column.label}
                                </p>
                                <p className="font-medium leading-tight">
                                  {column.render(reading)}
                                </p>
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
                          "reading-table w-full text-sm table-fixed",
                          tableMinWidth
                        )}
                        aria-label="Reading tracker table"
                      >
                        <thead>
                          <tr className="border-b border-gray-100 bg-muted/50">
                            {baseColumns.map((column) => (
                              <th
                                key={column.key}
                                className={cn(
                                  "h-8 py-2 px-3 text-left align-middle font-medium text-xs",
                                  column.className
                                )}
                              >
                                {column.label}
                              </th>
                            ))}
                            <th className="h-8 py-2 px-3 text-center align-middle font-medium text-xs w-[90px]">
                              {t("dashboard.readings.columns.status")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {(monthKey === "all"
                            ? data.allReadings
                            : readingsByMonth[monthKey] ?? []
                          ).map((reading) => {
                            const completed = isReadingCompleted(reading.id);
                            const isToday =
                              reading.id === data.todayReading?.id;
                            return (
                              <tr
                                key={reading.id}
                                className={cn("reading-row")}
                                {...getRowAttributes(completed, isToday)}
                              >
                                {baseColumns.map((column) => (
                                  <td
                                    key={column.key}
                                    className={cn(
                                      "reading-cell",
                                      "text-xs",
                                      column.className
                                    )}
                                  >
                                    {column.render(reading)}
                                  </td>
                                ))}
                                <td className="reading-cell text-center">
                                  <ReadingStatusButton
                                    completed={completed}
                                    loading={loading === reading.id}
                                    onClick={() => handleToggleReading(reading)}
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
