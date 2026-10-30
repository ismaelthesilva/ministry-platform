import { describe, it, expect } from "vitest";
import { cite, quoteWithCite, verseUrl } from "./cite";

describe("cite", () => {
  it("cite(22, 20) returns (Ap 22:20, VBT)", () => {
    expect(cite(22, 20)).toBe("(Ap 22:20, VBT)");
  });

  it("quoteWithCite wraps text and appends citation", () => {
    const text = "Vem, Senhor Jesus.";
    expect(quoteWithCite(text, 22, 20)).toBe(`"${text}" (Ap 22:20, VBT)`);
  });

  it("verseUrl returns correct URL", () => {
    expect(verseUrl(22, 20)).toBe(
      "https://ismaelsilva.org/venibible/apocalipse/22#v20"
    );
  });
});
