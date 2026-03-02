"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <Circle className={cn(iconBase, "text-muted-foreground")} />
  );
  const labelText = loading
    ? "Updating..."
    : completed
      ? "Completed"
      : "Mark Complete";
  const ariaLabel = loading
    ? "Updating reading status"
    : completed
      ? "Mark reading as incomplete"
      : "Mark reading as complete";

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
          "gap-2 rounded-full px-3 py-2 font-semibold",
          completed
            ? "bg-emerald-50 text-emerald-700"
            : "bg-white text-slate-600",
          className,
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
        completed ? "border border-emerald-200" : "border border-gray-200",
        className,
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
