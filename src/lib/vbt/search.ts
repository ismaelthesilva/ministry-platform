import type { VbtBook } from "./types";

export type SearchResult = {
  chapter: number;
  verse: number;
  text: string;
  note?: string;
};

function normalize(s: string) {
  return s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

export function searchVerses(
  book: VbtBook,
  query: string,
  includeNotes = false
): SearchResult[] {
  const q = normalize(query.trim());
  if (!q) return [];
  const results: SearchResult[] = [];
  for (const ch of book.chapters) {
    for (const v of ch.verses) {
      const textMatch = normalize(v.text).includes(q);
      const noteMatch =
        includeNotes && v.note ? normalize(v.note).includes(q) : false;
      if (textMatch || noteMatch) {
        results.push({
          chapter: ch.chapter,
          verse: v.verse,
          text: v.text,
          note: v.note,
        });
        if (results.length >= 50) return results;
      }
    }
  }
  return results;
}

export function parseVerseRef(
  query: string
): { chapter: number; verse: number } | null {
  const match = query.trim().match(/^(?:ap\s*)?(\d{1,2}):(\d{1,3})$/i);
  if (!match) return null;
  return { chapter: parseInt(match[1]), verse: parseInt(match[2]) };
}
