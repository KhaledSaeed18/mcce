import { describe, expect, it } from "vitest";
import { HIGHLIGHT_COLORS, STROKE_WIDTHS } from "@/config/pdf-editor";
import {
  getMarkupStyleOptions,
  getMarkupWidth,
  withMarkupWidth,
} from "./markup-style";
import type { Annotation } from "./types";

const BASE = { color: "#000000", id: "a", pageId: "p0" };
const BOX = { height: 10, width: 10, x: 0, y: 0 };
const RECT: Annotation = { ...BASE, ...BOX, strokeWidth: 2, type: "rect" };
const PEN: Annotation = { ...BASE, points: [], type: "pen", width: 4 };
const COVER: Annotation = { ...BASE, ...BOX, type: "cover" };

describe("getMarkupStyleOptions", () => {
  it("offers a cover nothing, since it brings its own color", () => {
    expect(getMarkupStyleOptions(COVER)).toBeNull();
  });

  it("offers a shape the pen's colors and widths", () => {
    expect(getMarkupStyleOptions(RECT)?.widths).toBe(STROKE_WIDTHS);
  });

  it("offers a text highlight marker shades and no width", () => {
    const mark: Annotation = {
      ...BASE,
      boxes: [],
      style: "highlight",
      type: "mark",
    };
    const options = getMarkupStyleOptions(mark);

    expect(options?.colors).toBe(HIGHLIGHT_COLORS);
    expect(options?.widths).toBeUndefined();
  });
});

describe("markup width", () => {
  it("reads and writes each kind's own field", () => {
    expect(getMarkupWidth(PEN)).toBe(4);
    expect(getMarkupWidth(RECT)).toBe(2);
    expect(getMarkupWidth(withMarkupWidth(RECT, 8))).toBe(8);
    expect(getMarkupWidth(withMarkupWidth(PEN, 8))).toBe(8);
  });

  it("leaves markup without a line alone", () => {
    expect(getMarkupWidth(COVER)).toBeNull();
    expect(withMarkupWidth(COVER, 8)).toBe(COVER);
  });
});
