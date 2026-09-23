import { describe, expect, it } from "vitest";
import {
  ARROW_HEAD_LENGTH_RATIO,
  ARROW_HEAD_MIN_LENGTH,
} from "@/config/pdf-editor";
import { getArrowHead } from "./arrow-head";
import type { ArrowAnnotation, Point } from "./types";

function makeArrow(to: Point, strokeWidth = 2): ArrowAnnotation {
  return {
    color: "#000000",
    from: { x: 0, y: 0 },
    id: "arrow",
    pageId: "p0",
    strokeWidth,
    to,
    type: "arrow",
  };
}

function distance(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

describe("getArrowHead", () => {
  it("opens the head behind the tip, one side each of the line", () => {
    const [left, right] = getArrowHead(makeArrow({ x: 100, y: 0 }));
    expect(left.x).toBeLessThan(100);
    expect(right.x).toBeLessThan(100);
    expect(left.y).toBeCloseTo(-right.y);
  });

  it("keeps a thin arrow's head at the smallest readable length", () => {
    const tip = { x: 100, y: 0 };
    const [left] = getArrowHead(makeArrow(tip, 1));
    expect(distance(left, tip)).toBeCloseTo(ARROW_HEAD_MIN_LENGTH);
  });

  it("grows the head with a thick line", () => {
    const tip = { x: 0, y: 100 };
    const [left] = getArrowHead(makeArrow(tip, 8));
    expect(distance(left, tip)).toBeCloseTo(8 * ARROW_HEAD_LENGTH_RATIO);
  });
});
