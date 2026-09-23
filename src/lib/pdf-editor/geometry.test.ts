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
