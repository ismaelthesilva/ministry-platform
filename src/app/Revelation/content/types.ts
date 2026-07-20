export type ChapterBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "scripture"; text: string }
  | { type: "prayer"; text: string };

export interface ChapterNote {
  number: number;
  text: string;
}

export interface ChapterContent {
  number: number;
  title: string;
  subtitle?: string;
  part: number;
  wordCount: number;
  blocks: ChapterBlock[];
  notes?: ChapterNote[];
}

export interface ChapterMeta {
  number: number;
  title: string;
  subtitle?: string;
  part: number;
  wordCount: number;
  hasNotes: boolean;
}

export interface PartMeta {
  number: number;
  title: string;
  tagline?: string;
}
