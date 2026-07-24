"use client";
import { useEffect } from "react";

const STORAGE_KEY = "revelation:progress";

export default function ProgressTracker({ number }: { number: number }) {
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ number, updatedAt: Date.now() })
      );
    } catch {
      // storage unavailable (private mode, etc.) — silently skip
    }
  }, [number]);

  return null;
}
