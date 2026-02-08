"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle } from "lucide-react";
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
  if (showLabel) {
    return (
      <Button
        variant={completed ? "secondary" : "default"}
        size="sm"
        onClick={onClick}
        disabled={loading}
        className={className}
      >
        {completed ? (
          <>
            <CheckCircle2 className="mr-2 h-4 w-4 text-muted-foreground" />
            Completed
          </>
        ) : (
          <>
            <Circle className="mr-2 h-4 w-4" />
            Mark Complete
          </>
        )}
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      disabled={loading}
      className={cn("h-9 w-full p-0", className)}
    >
      {completed ? (
        <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
      ) : (
        <Circle className="h-5 w-5 text-muted-foreground" />
      )}
    </Button>
  );
}
