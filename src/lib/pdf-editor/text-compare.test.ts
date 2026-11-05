import { describe, expect, it } from "vitest";
import { cleanTypedText, isSameText } from "./text-compare";
import type { TextAnnotation } from "./types";

const TEXT: TextAnnotation = {
  color: "#000000",
  fontSize: 16,
  id: "t",
  pageId: "p0",
  text: "hello",
  type: "text",
  x: 10,
  y: 20,
};

describe("cleanTypedText", () => {
  it("writes tabs out, since the PDF fonts cannot", () => {
    expect(cleanTypedText("a\tb")).toBe("a    b");
  });

  it("settles on one kind of line break", () => {
    expect(cleanTypedText("a\r\nb\rc")).toBe("a\nb\nc");
  });

  it("drops what dangles off the end, and keeps an indent at the start", () => {
    expect(cleanTypedText("  a \n\n")).toBe("  a");
  });

  it("finds nothing in only white space", () => {
    expect(cleanTypedText(" \n ")).toBe("");
  });
});

describe("isSameText", () => {
  it("is true for a copy", () => {
    expect(isSameText(TEXT, { ...TEXT })).toBe(true);
  });

  it("notices a change of words, place, or style", () => {
    expect(isSameText(TEXT, { ...TEXT, text: "bye" })).toBe(false);
    expect(isSameText(TEXT, { ...TEXT, x: 11 })).toBe(false);
    expect(isSameText(TEXT, { ...TEXT, bold: true })).toBe(false);
  });
});
