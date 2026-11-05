import { describe, expect, it } from "vitest";
import { MAX_FONT_SIZE, MIN_FONT_SIZE, PAGE_INSET } from "@/config/pdf-editor";
import { getFieldBox } from "./text-box";
import { scaleTextBox } from "./text-scale";
import type { PageSize, TextGeometry } from "./types";

const PAGE: PageSize = { height: 792, width: 612 };

function makeBox(overrides: Partial<TextGeometry> = {}): TextGeometry {
  return {
    fontSize: 10,
    text: "hello world",
    width: 100,
    x: 50,
    y: 100,
    ...overrides,
  };
}

describe("scaleTextBox", () => {
  it("scales the font and the wrap width together", () => {
    const scaled = scaleTextBox(makeBox(), "bottom-right", 100, 0, PAGE);

    expect(scaled.fontSize).toBe(20);
    expect(scaled.width).toBe(200);
  });

  it("holds the top left still when pulled from the bottom right", () => {
    const box = makeBox();
    const before = getFieldBox(box);
    const after = getFieldBox(scaleTextBox(box, "bottom-right", 100, 0, PAGE));

    expect(after.x).toBeCloseTo(before.x);
    expect(after.y).toBeCloseTo(before.y);
  });

  it("holds the bottom right still when pulled from the top left", () => {
    const box = makeBox();
    const before = getFieldBox(box);
    const after = getFieldBox(scaleTextBox(box, "top-left", -100, 0, PAGE));

    expect(after.x + after.width).toBeCloseTo(before.x + before.width);
    expect(after.y + after.height).toBeCloseTo(before.y + before.height);
  });

  it("keeps a box that grows with its text growing with it", () => {
    const scaled = scaleTextBox(
      makeBox({ width: undefined }),
      "bottom-right",
      50,
      0,
      PAGE
    );

    expect(scaled.width).toBeUndefined();
    expect(scaled.fontSize).toBeGreaterThan(10);
  });

  it("stops at the page's edge", () => {
    const scaled = scaleTextBox(makeBox(), "bottom-right", 5000, 0, PAGE);

    expect(
      getFieldBox(scaled).x + getFieldBox(scaled).width
    ).toBeLessThanOrEqual(PAGE.width - PAGE_INSET);
  });

  it("stays within the sizes the toolbar allows", () => {
    const tiny = scaleTextBox(makeBox(), "bottom-right", -5000, -5000, PAGE);
    const huge = scaleTextBox(
      makeBox({ width: undefined }),
      "bottom-right",
      5000,
      5000,
      { height: 100_000, width: 100_000 }
    );

    expect(tiny.fontSize).toBe(MIN_FONT_SIZE);
    expect(huge.fontSize).toBe(MAX_FONT_SIZE);
  });

  it("lands on half sizes", () => {
    const { fontSize } = scaleTextBox(makeBox(), "bottom-right", 13, 0, PAGE);

    expect(fontSize * 2).toBe(Math.round(fontSize * 2));
  });
});
