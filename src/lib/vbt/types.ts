export type VbtSegment = {
  verse: number;
  text: string;
  startsVerse: boolean;
};

export type VbtBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; segments: VbtSegment[] }
  | { type: "poetry"; segments: VbtSegment[] };

export type VbtVerse = { verse: number; text: string; note?: string };

export type VbtChapter = {
  chapter: number;
  headings: { beforeVerse: number; text: string }[];
  verses: VbtVerse[];
  blocks: VbtBlock[];
};

export type VbtBook = {
  translation: "Veni Bible Translation";
  abbreviation: "VBT";
  language: "pt-BR";
  book: "REV";
  bookName: string;
  version: string;
  license: string;
  copyright: string;
  url: string;
  sourceText: string;
  chapters: VbtChapter[];
};
