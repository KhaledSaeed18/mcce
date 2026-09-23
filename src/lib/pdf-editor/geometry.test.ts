import { describe, expect, it } from "vitest";
import { ERASER_TOLERANCE } from "@/config/pdf-editor";
import { isAnnotationHit } from "./geometry";
import type { Annotation } from "./types";

const HIGHLIGHT_WIDTH = 20;

const HIGHLIGHT: Annotation = {
  color: "#ffd60a",
  id: "h",
  pageId: "p0",
  points: [
    { x: 0, y: 50 },
    { x: 100, y: 50 },
  ],
  type: "highlight",
  width: HIGHLIGHT_WIDTH,
};

describe("isAnnotationHit", () => {
  it("reaches a highlight from anywhere across its width", () => {
    const nearEdge = 50 + HIGHLIGHT_WIDTH / 2 + ERASER_TOLERANCE - 1;
    expect(isAnnotationHit(HIGHLIGHT, { x: 50, y: nearEdge })).toBe(true);
  });

  it("misses a highlight once past its edge", () => {
    const pastEdge = 50 + HIGHLIGHT_WIDTH / 2 + ERASER_TOLERANCE + 1;
    expect(isAnnotationHit(HIGHLIGHT, { x: 50, y: pastEdge })).toBe(false);
  });
});

describe("isAnnotationHit on a text mark", () => {
  const mark: Annotation = {
    boxes: [
      { height: 10, width: 100, x: 0, y: 0 },
      { height: 10, width: 60, x: 0, y: 14 },
    ],
    color: "#ffd60a",
    id: "m",
    pageId: "p0",
    style: "highlight",
    type: "mark",
  };

  it("reaches any of its lines", () => {
    expect(isAnnotationHit(mark, { x: 30, y: 18 })).toBe(true);
  });

  it("misses beyond the end of a shorter line", () => {
    expect(
      isAnnotationHit(mark, { x: 90, y: 18 + ERASER_TOLERANCE + 20 })
    ).toBe(false);
  });
});
