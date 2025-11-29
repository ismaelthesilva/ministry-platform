import { describe, it, expect } from "vitest";
import { cn } from "../../lib/utils";

describe("utils", () => {
  it("merges class names", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
  });

  it("handles conditional classes", () => {
    expect(cn("base", true && "active", false && "inactive")).toBe(
      "base active"
    );
  });
});
