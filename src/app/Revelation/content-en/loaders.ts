import type { ChapterContent } from "../content/types";

// Each entry lazily imports one chapter's full text. Keeping these as
// separate dynamic imports (rather than one module that imports all 43)
// means a given chapter page only ever pulls its own body text into the
// server render — the other chapters' text never touches that request.
export const chapterLoaders: Record<
  number,
  () => Promise<{ default: ChapterContent }>
> = {
  1: () => import("./chapter-01"),
  2: () => import("./chapter-02"),
  3: () => import("./chapter-03"),
  4: () => import("./chapter-04"),
  5: () => import("./chapter-05"),
  6: () => import("./chapter-06"),
  7: () => import("./chapter-07"),
  8: () => import("./chapter-08"),
  9: () => import("./chapter-09"),
  10: () => import("./chapter-10"),
  11: () => import("./chapter-11"),
  12: () => import("./chapter-12"),
  13: () => import("./chapter-13"),
  14: () => import("./chapter-14"),
  15: () => import("./chapter-15"),
  16: () => import("./chapter-16"),
  17: () => import("./chapter-17"),
  18: () => import("./chapter-18"),
  19: () => import("./chapter-19"),
  20: () => import("./chapter-20"),
  21: () => import("./chapter-21"),
  22: () => import("./chapter-22"),
  23: () => import("./chapter-23"),
  24: () => import("./chapter-24"),
  25: () => import("./chapter-25"),
  26: () => import("./chapter-26"),
  27: () => import("./chapter-27"),
  28: () => import("./chapter-28"),
  29: () => import("./chapter-29"),
  30: () => import("./chapter-30"),
  31: () => import("./chapter-31"),
  32: () => import("./chapter-32"),
  33: () => import("./chapter-33"),
  34: () => import("./chapter-34"),
  35: () => import("./chapter-35"),
  36: () => import("./chapter-36"),
  37: () => import("./chapter-37"),
  38: () => import("./chapter-38"),
  39: () => import("./chapter-39"),
  40: () => import("./chapter-40"),
  41: () => import("./chapter-41"),
  42: () => import("./chapter-42"),
  43: () => import("./chapter-43"),
};

export async function loadChapter(
  number: number
): Promise<ChapterContent | undefined> {
  const loader = chapterLoaders[number];
  if (!loader) return undefined;
  const mod = await loader();
  return mod.default;
}
