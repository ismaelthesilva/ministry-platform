import { describe, it, expect } from "vitest";
import { searchVerses, parseVerseRef } from "./search";
import fs from "fs";
import path from "path";
import type { VbtBook } from "./types";

const book: VbtBook = JSON.parse(
  fs.readFileSync(path.resolve("src/content/vbt/revelation.json"), "utf8")
);

describe("searchVerses", () => {
  it("finds Ap 22:20 with accent-insensitive search for 'SENHOR jesus'", () => {
    const results = searchVerses(book, "SENHOR jesus");
    expect(results.some((r) => r.chapter === 22 && r.verse === 20)).toBe(true);
  });

  it("returns at most 50 results", () => {
    const results = searchVerses(book, "e");
    expect(results.length).toBeLessThanOrEqual(50);
  });

  it("returns empty array for empty query", () => {
    expect(searchVerses(book, "")).toHaveLength(0);
  });
});

describe("parseVerseRef", () => {
  it("parses '13:3'", () => {
    expect(parseVerseRef("13:3")).toEqual({ chapter: 13, verse: 3 });
  });

  it("parses 'Ap 13:3'", () => {
    expect(parseVerseRef("Ap 13:3")).toEqual({ chapter: 13, verse: 3 });
  });

  it("returns null for plain text", () => {
    expect(parseVerseRef("Senhor")).toBeNull();
  });
});
