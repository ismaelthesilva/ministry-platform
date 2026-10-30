import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import type { VbtBook } from "./types";

const LOCAL_PATH = path.resolve("src/content/vbt/revelation.json");

function loadBook(): VbtBook {
  return JSON.parse(fs.readFileSync(LOCAL_PATH, "utf8")) as VbtBook;
}

describe("VBT revelation.json (local fallback)", () => {
  it("loads the local JSON", () => {
    expect(loadBook()).toBeDefined();
  });

  it("has 22 chapters", () => {
    expect(loadBook().chapters).toHaveLength(22);
  });

  it("has 404 verses total", () => {
    const total = loadBook().chapters.reduce((n, c) => n + c.verses.length, 0);
    expect(total).toBe(404);
  });

  it("chapter 12 has 17 verses", () => {
    const ch12 = loadBook().chapters.find((c) => c.chapter === 12);
    expect(ch12?.verses).toHaveLength(17);
  });

  it("chapter 22 has 21 verses", () => {
    const ch22 = loadBook().chapters.find((c) => c.chapter === 22);
    expect(ch22?.verses).toHaveLength(21);
  });

  it("has 383 notes", () => {
    const notes = loadBook().chapters.reduce(
      (n, c) => n + c.verses.filter((v) => v.note).length,
      0
    );
    expect(notes).toBe(383);
  });
});
