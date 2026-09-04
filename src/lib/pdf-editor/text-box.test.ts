import { describe, expect, it } from "vitest";
import { MIN_TEXT_BOX_WIDTH, PAGE_INSET } from "@/config/pdf-editor";
import { resizeTextBox } from "./text-box";
import type { PageSize, TextGeometry } from "./types";

const PAGE: PageSize = { height: 792, width: 612 };

function makeBox(overrides: Partial<TextGeometry> = {}): TextGeometry {
  return {
    fontSize: 10,
    text: "hello",
    width: 100,
    x: 50,
    y: 100,
    ...overrides,
  };
}

describe("resizeTextBox", () => {
  it("widens from the right without moving the left edge", () => {
    expect(resizeTextBox(makeBox(), "right", 40, PAGE)).toMatchObject({
      width: 140,
      x: 50,
    });
  });

  it("keeps the right edge in place when the left one is dragged", () => {
    expect(resizeTextBox(makeBox(), "left", -30, PAGE)).toMatchObject({
      width: 130,
      x: 20,
    });
  });

  it("narrows from the left by moving that edge inward", () => {
    expect(resizeTextBox(makeBox(), "left", 40, PAGE)).toMatchObject({
      width: 60,
      x: 90,
    });
  });

  it("stops at a width a word can still fit in", () => {
    expect(resizeTextBox(makeBox(), "right", -80, PAGE).width).toBe(
      MIN_TEXT_BOX_WIDTH
    );
  });

  it("will not widen a box past the edge of the page", () => {
    const box = makeBox({ x: 500 });

    expect(resizeTextBox(box, "right", 200, PAGE).width).toBe(
      PAGE.width - PAGE_INSET - 500
    );
  });

  it("starts from the width the text measures when the box has none", () => {
    // Five characters at TEXT_WIDTH_FALLBACK_RATIO of a size ten font: 25 wide.
    const box = makeBox({ width: undefined });

    expect(resizeTextBox(box, "right", 40, PAGE).width).toBe(65);
  });

  it("will not widen a box past the start of the page", () => {
    const box = makeBox({ x: 10 });

    expect(resizeTextBox(box, "left", -200, PAGE)).toMatchObject({
      width: 110 - PAGE_INSET,
      x: PAGE_INSET,
    });
  });
});
