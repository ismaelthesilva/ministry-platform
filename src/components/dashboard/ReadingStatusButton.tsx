"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface ReadingStatusButtonProps {
  completed: boolean;
  loading?: boolean;
  onClick: () => void;
  showLabel?: boolean;
  className?: string;
}

export function ReadingStatusButton({
  completed,
  loading,
  onClick,
  showLabel = false,
  className,
}: ReadingStatusButtonProps) {
  const { t } = useLanguage();
  const state = completed ? "completed" : "pending";

  const iconBase = "h-5 w-5 transition-transform duration-200 ease-out";
  const icon = loading ? (
    <Loader2
      className="h-5 w-5 text-muted-foreground animate-spin"
      aria-hidden
    />
  ) : completed ? (
    <CheckCircle2 className={cn(iconBase, "text-emerald-500")} />
  ) : (
    <Circle className={cn(iconBase, "text-muted-foreground/60")} />
  );

  const labelText = loading
    ? t("dashboard.readings.updating")
    : completed
    ? t("dashboard.readings.completed")
    : t("dashboard.readings.markComplete");

  const ariaLabel = loading
    ? t("dashboard.readings.updatingStatus")
    : completed
    ? t("dashboard.readings.markIncomplete")
    : t("dashboard.readings.markComplete");

  const dataAttributes = {
    "data-state": state,
    ...(loading ? { "data-loading": "true" } : {}),
  } as const;

  if (showLabel) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={onClick}
        disabled={loading}
        className={cn(
          "gap-2 rounded-full px-4 py-2 font-semibold transition-all duration-200",
          completed
            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400"
            : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300",
          className
        )}
        aria-pressed={completed}
        aria-label={ariaLabel}
        type="button"
        {...dataAttributes}
      >
        {icon}
        <span>{labelText}</span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      disabled={loading}
      className={cn(
        "reading-status-button",
        completed ? "border border-emerald-200" : "border border-gray-200/80",
        className
      )}
      aria-pressed={completed}
      aria-label={ariaLabel}
      type="button"
      {...dataAttributes}
    >
      {icon}
    </Button>
  );
}
