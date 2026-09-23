import { describe, expect, it } from "vitest";
import { usesColor, usesStrokeWidth } from "./tool-kind";

describe("usesColor", () => {
  it("is true for every tool that draws or writes", () => {
    for (const tool of [
      "pen",
      "highlight",
      "rect",
      "ellipse",
      "arrow",
      "text",
    ] as const) {
      expect(usesColor(tool)).toBe(true);
    }
  });

  it("is false for tools that only move, rub out, or pick text", () => {
    for (const tool of ["hand", "eraser", "select"] as const) {
      expect(usesColor(tool)).toBe(false);
    }
  });
});

describe("usesStrokeWidth", () => {
  it("leaves text to its own size", () => {
    expect(usesStrokeWidth("text")).toBe(false);
    expect(usesStrokeWidth("pen")).toBe(true);
  });
});
