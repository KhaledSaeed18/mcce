import { describe, expect, it } from "vitest";
import { PAGE_INSET } from "@/config/pdf-editor";
import { getAnnotationBox } from "./annotation-box";
import { clampDelta } from "./bounds";
import { findAnnotationAt } from "./move";
import type { Annotation } from "./types";

const STROKE: Annotation = {
  color: "#000000",
  id: "pen",
  pageId: "p0",
  points: [
    { x: 10, y: 40 },
    { x: 60, y: 20 },
    { x: 30, y: 90 },
  ],
  type: "pen",
  width: 2,
};

const SQUARE: Annotation = {
  color: "#000000",
  height: 50,
  id: "rect",
  pageId: "p0",
  strokeWidth: 2,
  type: "rect",
  width: 50,
  x: 20,
  y: 20,
};

describe("getAnnotationBox", () => {
  it("frames a stroke by the furthest points it reaches", () => {
    expect(getAnnotationBox(STROKE)).toEqual({
      height: 70,
      width: 50,
      x: 10,
      y: 20,
    });
  });

  it("frames an arrow by its two ends, whichever way it points", () => {
    const arrow: Annotation = {
      color: "#000000",
      from: { x: 80, y: 10 },
      id: "arrow",
      pageId: "p0",
      strokeWidth: 2,
      to: { x: 20, y: 60 },
      type: "arrow",
    };
    expect(getAnnotationBox(arrow)).toEqual({
      height: 50,
      width: 60,
      x: 20,
      y: 10,
    });
  });
});

describe("findAnnotationAt", () => {
  it("finds the markup drawn last where two overlap", () => {
    // On the stroke from (10, 40) to (60, 20), and inside the square as well.
    const found = findAnnotationAt([SQUARE, STROKE], "p0", { x: 35, y: 30 });
    expect(found?.id).toBe("pen");
  });

  it("ignores markup on other pages", () => {
    expect(findAnnotationAt([SQUARE], "p1", { x: 30, y: 30 })).toBeNull();
  });
});

describe("clampDelta", () => {
  const size = { height: 200, width: 200 };

  it("lets a box move freely inside the page", () => {
    expect(
      clampDelta(getAnnotationBox(SQUARE), { x: 30, y: 40 }, size)
    ).toEqual({ x: 30, y: 40 });
  });

  it("stops a box at the page edge", () => {
    const delta = clampDelta(getAnnotationBox(SQUARE), { x: -500, y: 0 }, size);
    expect(delta.x).toBe(PAGE_INSET - 20);
  });
});
