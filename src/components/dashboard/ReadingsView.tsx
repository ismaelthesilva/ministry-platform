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
import { Button } from "@/components/ui/button";
import {
  toggleReadingComplete,
  resetMonthProgress,
  restoreReadings,
  getTrackerDataForPlan,
  selectPlan,
} from "@/app/dashboard/actions";
import { useEffect, useRef, useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { ReadingStatusButton } from "@/components/dashboard/ReadingStatusButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";
import {
  RotateCcw,
  Target,
  BookOpen,
  Globe,
  Loader2,
  CheckCheck,
} from "lucide-react";

interface DailyReading {
  id: string;
  dayNumber: number;
  date: string;
  bible: string | null;
  author: string | null;
  book: string | null;
  title: string | null;
}

interface Plan {
  title: string;
  slug: string;
}

interface TrackerData {
  user: { preferredLanguage?: string; selectedPlanId?: string };
  plan: Plan | null;
  todayReading: DailyReading | null;
  completionPercentage: number;
  completedReadingIds: string[];
  allReadings: DailyReading[];
}

interface UndoData {
  ids: string[];
  label: string;
  countdown: number;
}

interface AvailablePlan {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  language: string;
}

const PLAN_LABELS: Record<string, { en: string; br: string }> = {
  bible: { en: "Bible Only", br: "Só a Bíblia" },
  prophetic: { en: "Prophetic", br: "Profético" },
  classic: { en: "Classic", br: "Clássico" },
};

export function ReadingsView({
  data: initialData,
  userId,
  allPlans = [],
}: {
  data: TrackerData;
  userId: string;
  allPlans?: AvailablePlan[];
}) {
  const { t, language, setLanguage } = useLanguage();
  const isBr = language === "br";

  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState<string | null>(null);
  const [completedIds, setCompletedIds] = useState<string[]>(
    initialData.completedReadingIds
  );
  const [announcement, setAnnouncement] = useState("");
  const [undoData, setUndoData] = useState<UndoData | null>(null);
  const [confirmReset, setConfirmReset] = useState<string | null>(null);
  const [switching, startSwitching] = useTransition();

  // Current plan/lang state
  const [activePlanSlug, setActivePlanSlug] = useState(
    initialData.plan?.slug ?? "bible"
  );
  const [activePlanLang, setActivePlanLang] = useState(
    initialData.user?.preferredLanguage === "en" ? "en" : "br"
  );

  // Unique plan slugs for the switcher
  const planSlugs = [...new Set(allPlans.map((p) => p.slug))];

  const handleSwitchPlan = (slug: string, lang: string) => {
    if (slug === activePlanSlug && lang === activePlanLang) return;
    setActivePlanSlug(slug);
    setActivePlanLang(lang);
    startSwitching(async () => {
      const result = await getTrackerDataForPlan(userId, slug, lang);
      if (result.plan) {
        setData({
          ...data,
          plan: result.plan,
          todayReading: result.todayReading,
          allReadings: result.allReadings,
          completedReadingIds: result.completedReadingIds,
          completionPercentage: result.completionPercentage,
        });
        setCompletedIds(result.completedReadingIds);
        // Also persist the selection server-side
        await selectPlan(userId, slug, lang);
        // Update language context if changed
        if (lang !== language) {
          setLanguage(lang as "en" | "br");
        }
      }
    });
  };

  const todayTableRowRef = useRef<HTMLTableRowElement>(null);
  const todayCardRef = useRef<HTMLDivElement>(null);
  const tabsListRef = useRef<HTMLDivElement>(null);

  // ─── Month config ─────────────────────────────────────────────────────────

  // Always use canonical EN keys for grouping; labels change with UI language
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

  // Map all possible month tokens (EN, BR, full names) → canonical EN key
  const monthTokenMap: Record<string, string> = {
    // EN short
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
    // EN full
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
    // BR short
    fev: "feb",
    abr: "apr",
    mai: "may",
    ago: "aug",
    set: "sep",
    out: "oct",
    dez: "dec",
    // BR full
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
  const normalizeToken = (v: string) =>
    v
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .trim();

  const getMonthKeyFromDate = (date: string): string => {
    if (!date) return "";
    const lower = normalizeToken(date);
    // Extract the alphabetic part (month token) from the date string
    // Handles: "01-Jan", "Jan-01", "01 de Janeiro", "January 01"
    let token = "";
    if (lower.includes(" de ")) {
      token = lower.split(" de ").pop() ?? "";
    } else if (lower.includes("-")) {
      // Find the part that contains letters (month), not digits (day)
      const parts = lower.split("-");
      token = parts.find((p) => /[a-z]/.test(p)) ?? "";
    } else if (lower.includes("/")) {
      const parts = lower.split("/");
      token = parts.find((p) => /[a-z]/.test(p)) ?? "";
    } else {
      // Space-separated: find the alphabetic part
      const parts = lower.split(" ");
      token = parts.find((p) => /[a-z]/.test(p)) ?? "";
    }
    return monthTokenMap[normalizeToken(token)] ?? "";
  };

  const getDayFromDate = (date: string | null | undefined) => {
    if (!date) return "";
    return date.match(/^(\d{1,2})/)?.[1] ?? "";
  };

  // ─── Grouping ─────────────────────────────────────────────────────────────

  const readingsByMonth = monthOptions.reduce(
    (acc, m) => ({ ...acc, [m.key]: [] as DailyReading[] }),
    {} as Record<string, DailyReading[]>
  );
  data.allReadings.forEach((r) => {
    const k = getMonthKeyFromDate(r.date);
    if (k && readingsByMonth[k]) readingsByMonth[k].push(r);
  });

  const availableMonths = monthOptions.filter(
    (m) => readingsByMonth[m.key]?.length
  );

  const monthStats = availableMonths.reduce((acc, m) => {
    const rds = readingsByMonth[m.key] ?? [];
    const done = rds.filter((r) => completedIds.includes(r.id)).length;
    acc[m.key] = {
      total: rds.length,
      completedCount: done,
      completionPercentage: rds.length
        ? Math.round((done / rds.length) * 100)
        : 0,
    };
    return acc;
  }, {} as Record<string, { total: number; completedCount: number; completionPercentage: number }>);

  const currentMonthKey = getMonthKeyFromDate(data.todayReading?.date ?? "");
  const defaultMonth =
    currentMonthKey || availableMonths[0]?.key || monthOptions[0].key;
  const [activeMonth, setActiveMonth] = useState<string>(defaultMonth);

  const totalReadings = data.allReadings.length;
  const totalCompletion = totalReadings
    ? Math.round((completedIds.length / totalReadings) * 100)
    : 0;

  // ─── Effects ──────────────────────────────────────────────────────────────

  // Scroll active tab into view
  useEffect(() => {
    const container = tabsListRef.current;
    if (!container) return;
    const trigger = container.querySelector<HTMLElement>(
      `[data-value="${activeMonth}"]`
    );
    if (!trigger) return;
    const { left: tl, right: tr } = trigger.getBoundingClientRect();
    const { left: cl, right: cr } = container.getBoundingClientRect();
    if (tl < cl || tr > cr)
      trigger.scrollIntoView({ behavior: "smooth", inline: "center" });
  }, [activeMonth]);

  // Undo countdown
  useEffect(() => {
    if (!undoData) return;
    if (undoData.countdown <= 0) {
      setUndoData(null);
      return;
    }
    const timer = setTimeout(
      () =>
        setUndoData((prev) =>
          prev ? { ...prev, countdown: prev.countdown - 1 } : null
        ),
      1000
    );
    return () => clearTimeout(timer);
  }, [undoData]);

  // Clear announcement
  useEffect(() => {
    if (!announcement) return;
    const timer = setTimeout(() => setAnnouncement(""), 3000);
    return () => clearTimeout(timer);
  }, [announcement]);

  // ─── Handlers ─────────────────────────────────────────────────────────────

  const handleToggleReading = async (reading: DailyReading) => {
    setLoading(reading.id);
    const wasCompleted = completedIds.includes(reading.id);
    // Optimistic
    setCompletedIds((prev) =>
      wasCompleted
        ? prev.filter((id) => id !== reading.id)
        : [...prev, reading.id]
    );
    const result = await toggleReadingComplete(
      userId,
      reading.id,
      wasCompleted
    );
    if (!result.success) {
      // Revert
      setCompletedIds((prev) =>
        wasCompleted
          ? [...prev, reading.id]
          : prev.filter((id) => id !== reading.id)
      );
      setAnnouncement(t("dashboard.readings.unableToUpdate"));
    } else {
      const day = getDayFromDate(reading.date) || reading.dayNumber;
      const verb = wasCompleted
        ? t("dashboard.readings.markedIncomplete")
        : t("dashboard.readings.markedComplete");
      setAnnouncement(`${t("dashboard.today.day")} ${day} ${verb}`);
    }
    setLoading(null);
  };

  const handleResetMonth = async (monthKey: string) => {
    const monthReadings = readingsByMonth[monthKey] ?? [];
    const toReset = monthReadings
      .filter((r) => completedIds.includes(r.id))
      .map((r) => r.id);
    if (!toReset.length) return;

    const label =
      availableMonths.find((m) => m.key === monthKey)?.label ?? monthKey;
    // Optimistic
    setCompletedIds((prev) => prev.filter((id) => !toReset.includes(id)));
    setConfirmReset(null);
    setUndoData({ ids: toReset, label, countdown: 8 });

    const result = await resetMonthProgress(userId, toReset);
    if (!result.success) {
      setCompletedIds((prev) => [...new Set([...prev, ...toReset])]);
      setUndoData(null);
      setAnnouncement(t("dashboard.readings.unableToUpdate"));
    }
  };

  const handleUndo = async () => {
    if (!undoData) return;
    const { ids } = undoData;
    setUndoData(null);
    setCompletedIds((prev) => [...new Set([...prev, ...ids])]);
    await restoreReadings(userId, ids);
  };

  const handleCompleteMonth = async (monthKey: string) => {
    const monthReadings = readingsByMonth[monthKey] ?? [];
    const toComplete = monthReadings
      .filter((r) => !completedIds.includes(r.id))
      .map((r) => r.id);
    if (!toComplete.length) return;

    // Optimistic
    setCompletedIds((prev) => [...new Set([...prev, ...toComplete])]);

    const result = await restoreReadings(userId, toComplete);
    if (!result.success) {
      setCompletedIds((prev) => prev.filter((id) => !toComplete.includes(id)));
      setAnnouncement(t("dashboard.readings.unableToUpdate"));
    } else {
      const label =
        availableMonths.find((m) => m.key === monthKey)?.label ?? monthKey;
      setAnnouncement(
        `${label} — ${toComplete.length} ${
          isBr ? "leituras marcadas" : "readings marked complete"
        }`
      );
    }
  };

  const handleJumpToToday = () => {
    if (!data.todayReading || !currentMonthKey) return;
    setActiveMonth(currentMonthKey);
    setTimeout(() => {
      (todayTableRowRef.current ?? todayCardRef.current)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 150);
  };

  // ─── Columns ──────────────────────────────────────────────────────────────

  const planSlug = data.plan?.slug?.toLowerCase() ?? "";
  const isProphetic = planSlug.includes("prophetic");
  const isClassic = planSlug.includes("classic");
  const showCommentary = data.allReadings.some((r) => r.author);

  const baseColumns = isProphetic
    ? [
        {
          key: "day",
          label: t("dashboard.readings.columns.day"),
          className: "w-[70px]",
          render: (r: DailyReading) => getDayFromDate(r.date) || r.dayNumber,
        },
        {
          key: "bible",
          label: t("dashboard.readings.columns.bibleText"),
          className: "max-w-[220px] truncate",
          render: (r: DailyReading) => r.bible || "-",
        },
        {
          key: "book",
          label: t("dashboard.readings.columns.book"),
          className: "max-w-[180px] truncate",
          render: (r: DailyReading) => r.book || "-",
        },
        {
          key: "title",
          label: t("dashboard.readings.columns.chapterTitle"),
          className: "max-w-[240px] truncate",
          render: (r: DailyReading) => r.title || "-",
        },
      ]
    : isClassic
    ? [
        {
          key: "day",
          label: t("dashboard.readings.columns.day"),
          className: "w-[70px]",
          render: (r: DailyReading) => getDayFromDate(r.date) || r.dayNumber,
        },
        {
          key: "bible",
          label: t("dashboard.readings.columns.bibleText"),
          className: "max-w-[200px] truncate",
          render: (r: DailyReading) => r.bible || "-",
        },
        {
          key: "author",
          label: t("dashboard.readings.columns.classicAuthor"),
          className: "max-w-[160px] truncate",
          render: (r: DailyReading) => r.author || "-",
        },
        {
          key: "book",
          label: t("dashboard.readings.columns.referenceWork"),
          className: "max-w-[200px] truncate",
          render: (r: DailyReading) => r.book || "-",
        },
        {
          key: "title",
          label: t("dashboard.readings.columns.keyTheme"),
          className: "max-w-[220px] truncate",
          render: (r: DailyReading) => r.title || "-",
        },
      ]
    : [
        {
          key: "day",
          label: t("dashboard.readings.columns.day"),
          className: "w-[70px]",
          render: (r: DailyReading) => getDayFromDate(r.date) || r.dayNumber,
        },
        {
          key: "date",
          label: t("dashboard.readings.columns.date"),
          className: "w-[130px] whitespace-nowrap",
          render: (r: DailyReading) => r.date,
        },
        {
          key: "bible",
          label: t("dashboard.readings.columns.mainReading"),
          className: "max-w-[260px] truncate",
          render: (r: DailyReading) => r.bible || "-",
        },
        ...(showCommentary
          ? [
              {
                key: "author",
                label: t("dashboard.readings.columns.commentary"),
                className: "max-w-[200px] truncate",
                render: (r: DailyReading) => r.author || "-",
              },
            ]
          : []),
      ];

  const mobileFields = baseColumns.filter(
    (c) => c.key !== "day" && c.key !== "date"
  );
  const tableMinWidth = isProphetic
    ? "min-w-[920px]"
    : isClassic
    ? "min-w-[880px]"
    : "min-w-[720px]";

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="container max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* SR-only announcements */}
      {announcement && (
        <p className="sr-only" aria-live="assertive">
          {announcement}
        </p>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {data.plan?.title}
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {t("dashboard.readings.trackProgress")}
          </p>
        </div>
        {data.todayReading && (
          <Button
            onClick={handleJumpToToday}
            variant="outline"
            size="sm"
            className="gap-1.5 shrink-0"
          >
            <Target className="h-3.5 w-3.5" />
            {t("dashboard.readings.jumpToToday")}
          </Button>
        )}
      </div>

      {/* Plan & Language Switcher */}
      {planSlugs.length > 0 && (
        <Card>
          <CardContent className="py-3 px-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {/* Plan selector */}
              <div className="flex items-center gap-2 flex-1">
                <BookOpen className="h-4 w-4 text-muted-foreground shrink-0" />
                <div className="flex gap-1.5 flex-wrap">
                  {planSlugs.map((slug) => {
                    const label =
                      PLAN_LABELS[slug]?.[isBr ? "br" : "en"] ?? slug;
                    const isActive = slug === activePlanSlug;
                    return (
                      <button
                        key={slug}
                        disabled={switching}
                        onClick={() => handleSwitchPlan(slug, activePlanLang)}
                        className={cn(
                          "px-3 py-2 rounded-md text-xs font-medium transition-all min-h-[44px]",
                          isActive
                            ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                            : "bg-muted/50 text-muted-foreground hover:bg-muted"
                        )}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Language selector */}
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
                <div className="flex gap-1.5">
                  {(["en", "br"] as const).map((lang) => {
                    const isActive = lang === activePlanLang;
                    return (
                      <button
                        key={lang}
                        disabled={switching}
                        onClick={() => handleSwitchPlan(activePlanSlug, lang)}
                        className={cn(
                          "px-3 py-2 rounded-md text-xs font-medium transition-all min-h-[44px]",
                          isActive
                            ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                            : "bg-muted/50 text-muted-foreground hover:bg-muted"
                        )}
                      >
                        {lang === "en" ? "🇺🇸 EN" : "🇧🇷 PT"}
                      </button>
                    );
                  })}
                </div>
              </div>

              {switching && (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground shrink-0" />
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Overall Progress */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("dashboard.readings.yourProgress")}
            </CardTitle>
            <span className="text-2xl font-bold tabular-nums">
              {totalCompletion}%
            </span>
          </div>
          <Progress value={totalCompletion} className="h-2 mt-2" />
        </CardHeader>
        <CardContent className="pt-0 pb-3">
          <p
            className="text-xs text-muted-foreground"
            role="status"
            aria-live="polite"
          >
            <span className="font-semibold text-foreground">
              {completedIds.length}
            </span>
            {" / "}
            {totalReadings}
            {" · "}
            {totalReadings - completedIds.length}{" "}
            {t("dashboard.stats.readingsLeft")}
          </p>
        </CardContent>
      </Card>

      {/* Today's Reading */}
      {data.todayReading && (
        <Card className="border-blue-300 bg-blue-50/40 dark:border-blue-700 dark:bg-blue-950/20">
          <CardHeader>
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="min-w-0">
                <CardTitle className="flex flex-wrap items-center gap-2 text-base">
                  {t("dashboard.today.title")}
                  <Badge variant="secondary" className="shrink-0">
                    {t("dashboard.today.day")} {data.todayReading.dayNumber}
                  </Badge>
                  {completedIds.includes(data.todayReading.id) && (
                    <Badge className="bg-emerald-500 text-white border-0 shrink-0">
                      ✓ Done
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="mt-0.5">
                  {data.todayReading.date}
                </CardDescription>
              </div>
              <ReadingStatusButton
                completed={completedIds.includes(data.todayReading.id)}
                loading={loading === data.todayReading.id}
                onClick={() => handleToggleReading(data.todayReading!)}
                showLabel
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  {t("dashboard.today.mainReading")}
                </h4>
                <p className="text-sm font-medium">{data.todayReading.bible}</p>
              </div>
              {(isProphetic || isClassic) && data.todayReading.title && (
                <div>
                  <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    {t("dashboard.today.topic")}
                  </h4>
                  <p className="text-sm">{data.todayReading.title}</p>
                </div>
              )}
              {data.todayReading.author && (
                <div>
                  <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    {t("dashboard.today.commentary")}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {data.todayReading.author}
                    {data.todayReading.book && ` · ${data.todayReading.book}`}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Readings Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>{t("dashboard.readings.title")}</CardTitle>
          <CardDescription>{t("dashboard.readings.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeMonth}
            onValueChange={(v) => {
              setActiveMonth(v);
              setConfirmReset(null);
            }}
          >
            {/* Month tabs */}
            <TabsList
              ref={tabsListRef}
              className="reading-tablist w-full justify-start overflow-x-auto gap-1.5 h-auto pb-1"
              aria-label="Month filters"
            >
              {/* All tab */}
              <TabsTrigger
                value="all"
                data-value="all"
                className={cn(
                  "flex flex-col items-start rounded-lg px-3 py-1.5 text-xs transition-all duration-150 shrink-0 border",
                  activeMonth === "all"
                    ? "bg-slate-900 text-white shadow border-transparent dark:bg-slate-100 dark:text-slate-900"
                    : "bg-muted/40 text-muted-foreground hover:bg-muted/70 border-transparent"
                )}
              >
                <span className="font-semibold">
                  {t("dashboard.readings.all")}
                </span>
                <span className="opacity-75">
                  {completedIds.length} / {totalReadings}
                </span>
              </TabsTrigger>

              {/* Month tabs */}
              {availableMonths.map((month) => {
                const stats = monthStats[month.key] ?? {
                  total: 0,
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
                      "flex flex-col items-start rounded-lg px-3 py-1.5 text-xs transition-all duration-150 shrink-0 border",
                      isActive
                        ? "bg-slate-900 text-white shadow border-transparent dark:bg-slate-100 dark:text-slate-900"
                        : isCurrent
                        ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800"
                        : "bg-muted/40 text-muted-foreground hover:bg-muted/70 border-transparent"
                    )}
                  >
                    <span className="font-semibold">{month.label}</span>
                    <span className="opacity-75">
                      {stats.completedCount} / {stats.total}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <p
              className="reading-tablist-hint text-muted-foreground/50 mt-1"
              aria-live="polite"
            >
              {t("dashboard.readings.keyboardHint")}
            </p>

            {/* Tab contents */}
            {["all", ...availableMonths.map((m) => m.key)].map((monthKey) => {
              const isAll = monthKey === "all";
              const monthReadings = isAll
                ? data.allReadings
                : readingsByMonth[monthKey] ?? [];
              const stats = monthStats[monthKey];
              const completedInMonth = isAll
                ? completedIds.length
                : stats?.completedCount ?? 0;
              const totalInMonth = monthReadings.length;

              return (
                <TabsContent key={monthKey} value={monthKey} className="mt-3">
                  {/* Month overview grid (All tab only) */}
                  {isAll && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-5">
                      {availableMonths.map((m) => {
                        const ms = monthStats[m.key] ?? {
                          total: 0,
                          completedCount: 0,
                          completionPercentage: 0,
                        };
                        const pct = ms.completionPercentage;
                        const isComplete = pct === 100;
                        const isCurrent = m.key === currentMonthKey;
                        return (
                          <button
                            key={m.key}
                            onClick={() => setActiveMonth(m.key)}
                            className={cn(
                              "rounded-lg border p-3 text-left transition-all hover:shadow-sm",
                              isComplete
                                ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800"
                                : isCurrent
                                ? "bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800"
                                : "bg-card hover:bg-muted/50"
                            )}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-sm font-semibold">
                                {m.label}
                              </span>
                              <span
                                className={cn(
                                  "text-xs font-bold tabular-nums",
                                  isComplete
                                    ? "text-emerald-600"
                                    : pct > 0
                                    ? "text-blue-600"
                                    : "text-muted-foreground"
                                )}
                              >
                                {pct}%
                              </span>
                            </div>
                            <Progress
                              value={pct}
                              className={cn(
                                "h-1.5",
                                isComplete && "[&>div]:bg-emerald-500"
                              )}
                            />
                            <p className="text-[10px] text-muted-foreground mt-1 tabular-nums">
                              {ms.completedCount} / {ms.total}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Month sub-header */}
                  <div className="space-y-2 py-2 mb-3 border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">
                          <span className="font-semibold text-foreground">
                            {completedInMonth}
                          </span>
                          {" / "}
                          {totalInMonth} {t("dashboard.readings.complete")}
                        </p>
                        {!isAll && (
                          <span
                            className={cn(
                              "text-xs font-bold tabular-nums",
                              completedInMonth === totalInMonth
                                ? "text-emerald-600"
                                : completedInMonth > 0
                                ? "text-blue-600"
                                : "text-muted-foreground"
                            )}
                          >
                            {totalInMonth
                              ? Math.round(
                                  (completedInMonth / totalInMonth) * 100
                                )
                              : 0}
                            %
                          </span>
                        )}
                      </div>
                      {!isAll && (
                        <div className="flex items-center gap-1">
                          {/* Mark all complete */}
                          {completedInMonth < totalInMonth && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 px-2.5 text-xs gap-1 text-emerald-700 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800 dark:text-emerald-400 dark:border-emerald-800 dark:hover:bg-emerald-950/40"
                              onClick={() => handleCompleteMonth(monthKey)}
                            >
                              <CheckCheck className="h-3 w-3" />
                              {isBr ? "Completar mês" : "Complete month"}
                            </Button>
                          )}
                          {/* Reset month */}
                          {completedInMonth > 0 && (
                            <>
                              {confirmReset === monthKey ? (
                                <>
                                  <span className="text-xs text-muted-foreground mr-1">
                                    {t("dashboard.readings.resetConfirm")}?
                                  </span>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    className="h-8 px-2.5 text-xs"
                                    onClick={() => handleResetMonth(monthKey)}
                                  >
                                    {t("dashboard.readings.resetConfirm")}
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 px-2.5 text-xs"
                                    onClick={() => setConfirmReset(null)}
                                  >
                                    {t("dashboard.readings.resetCancel")}
                                  </Button>
                                </>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 px-2.5 text-xs text-muted-foreground hover:text-destructive gap-1"
                                  onClick={() => setConfirmReset(monthKey)}
                                >
                                  <RotateCcw className="h-3 w-3" />
                                  {t("dashboard.readings.resetMonth")}
                                </Button>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    {!isAll && (
                      <Progress
                        value={
                          totalInMonth
                            ? Math.round(
                                (completedInMonth / totalInMonth) * 100
                              )
                            : 0
                        }
                        className={cn(
                          "h-1.5",
                          completedInMonth === totalInMonth &&
                            totalInMonth > 0 &&
                            "[&>div]:bg-emerald-500"
                        )}
                      />
                    )}
                  </div>

                  {/* Mobile: cards */}
                  <div className="md:hidden space-y-1.5">
                    {monthReadings.map((reading) => {
                      const completed = completedIds.includes(reading.id);
                      const isToday = reading.id === data.todayReading?.id;
                      return (
                        <div
                          key={reading.id}
                          ref={
                            isToday
                              ? (todayCardRef as React.RefObject<HTMLDivElement>)
                              : undefined
                          }
                          className={cn("reading-card")}
                          {...{
                            "data-status": completed ? "completed" : "pending",
                            ...(isToday ? { "data-today": "true" } : {}),
                          }}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-xs font-semibold uppercase tracking-wide reading-status-label">
                                {t("dashboard.readings.columns.day")}{" "}
                                {getDayFromDate(reading.date) ||
                                  reading.dayNumber}
                                {isToday && (
                                  <span className="ml-1.5 text-[10px] text-blue-500 normal-case tracking-normal font-medium">
                                    · today
                                  </span>
                                )}
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {reading.date}
                              </p>
                            </div>
                            <ReadingStatusButton
                              completed={completed}
                              loading={loading === reading.id}
                              onClick={() => handleToggleReading(reading)}
                            />
                          </div>
                          <div className="grid gap-1 mt-1.5">
                            {mobileFields.map((col) => (
                              <div key={col.key}>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                                  {col.label}
                                </p>
                                <p className="text-sm font-medium leading-snug">
                                  {col.render(reading)}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Desktop: table */}
                  <div className="hidden md:block">
                    <div className="rounded-lg border overflow-auto">
                      <table
                        className={cn(
                          "reading-table w-full text-sm table-fixed",
                          tableMinWidth
                        )}
                        aria-label="Reading tracker table"
                      >
                        <thead>
                          <tr className="border-b bg-muted/40">
                            {baseColumns.map((col) => (
                              <th
                                key={col.key}
                                className={cn(
                                  "h-9 py-2 px-3 text-left align-middle font-medium text-[11px] text-muted-foreground uppercase tracking-wider",
                                  col.className
                                )}
                              >
                                {col.label}
                              </th>
                            ))}
                            <th className="h-9 py-2 px-3 text-center align-middle font-medium text-[11px] text-muted-foreground uppercase tracking-wider w-[80px]">
                              {t("dashboard.readings.columns.status")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {monthReadings.map((reading) => {
                            const completed = completedIds.includes(reading.id);
                            const isToday =
                              reading.id === data.todayReading?.id;
                            return (
                              <tr
                                key={reading.id}
                                ref={isToday ? todayTableRowRef : undefined}
                                className="reading-row"
                                data-status={
                                  completed ? "completed" : "pending"
                                }
                                {...(isToday ? { "data-today": "true" } : {})}
                              >
                                {baseColumns.map((col) => (
                                  <td
                                    key={col.key}
                                    className={cn(
                                      "reading-cell text-xs",
                                      col.className
                                    )}
                                  >
                                    {col.render(reading)}
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
                </TabsContent>
              );
            })}
          </Tabs>
        </CardContent>
      </Card>

      {/* Undo Toast — fixed floating bar */}
      {undoData && (
        <div className="undo-toast" role="status" aria-live="polite">
          <span className="undo-toast-text">
            <span className="font-semibold">{undoData.ids.length}</span>{" "}
            {t("dashboard.readings.readingsReset")}{" "}
            <span className="opacity-70">· {undoData.label}</span>
          </span>
          <button onClick={handleUndo} className="undo-toast-btn">
            {t("dashboard.readings.undoReset")}{" "}
            <span className="undo-toast-countdown">{undoData.countdown}s</span>
          </button>
          <button
            onClick={() => setUndoData(null)}
            className="undo-toast-close"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
