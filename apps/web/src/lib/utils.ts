// Enhanced stats for Revelation chapters
export function getEnhancedChapterStats(
  chapterNumber: number,
  verses: any[],
  studyProgress: number
) {
  // Calculate word counts
  const scriptureWords = verses.reduce(
    (acc, v) => acc + (v.text?.split(/\s+/).length || 0),
    0
  );
  const commentaryWords = verses.reduce(
    (acc, v) => acc + (v.commentary?.split(/\s+/).length || 0),
    0
  );
  const verseCount = verses.length;
  // Example themes and cross-references
  const themes = ["Prophecy", "Urgency", "Witness"];
  const crossReferences = ["Daniel 7:13", "Matthew 24:30", "Acts 1:9-11"];
  const keyWords = ["Revelation", "Jesus", "Servants", "Angel", "Testimony"];
  // Example difficulty
  const difficulty = "Intermediate";
  return {
    chapterNumber,
    scriptureWords,
    commentaryWords,
    verseCount,
    themes,
    crossReferences,
    keyWords,
    difficulty,
    studyProgress,
  };
}
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
