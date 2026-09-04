import { describe, expect, it } from "vitest";
import { distanceToSegment, distanceToStroke } from "./distance";
import type { Point } from "./types";

const FROM: Point = { x: 0, y: 0 };
const TO: Point = { x: 100, y: 0 };

describe("distanceToSegment", () => {
  it("measures straight off the middle of the segment", () => {
    expect(distanceToSegment(FROM, TO, { x: 50, y: 12 })).toBeCloseTo(12);
  });

  it("measures to the nearer end for a point past it", () => {
    expect(distanceToSegment(FROM, TO, { x: 130, y: 0 })).toBeCloseTo(30);
    expect(distanceToSegment(FROM, TO, { x: -10, y: 0 })).toBeCloseTo(10);
  });

  it("measures to the point itself when the segment has no length", () => {
    expect(distanceToSegment(FROM, FROM, { x: 3, y: 4 })).toBeCloseTo(5);
  });
});

describe("distanceToStroke", () => {
  it("reaches the stretch between two points a quick drag left far apart", () => {
    const stroke = [
      { x: 0, y: 0 },
      { x: 200, y: 0 },
    ];

    // Halfway along, which is a hundred points from either end of the stroke.
    expect(distanceToStroke(stroke, { x: 100, y: 2 })).toBeCloseTo(2);
  });

  it("takes the nearest of the stretches a stroke is made of", () => {
    const stroke = [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
    ];

    expect(distanceToStroke(stroke, { x: 104, y: 60 })).toBeCloseTo(4);
  });

  it("is out of reach for a stroke with nowhere to draw a line", () => {
    expect(distanceToStroke([{ x: 0, y: 0 }], { x: 0, y: 0 })).toBe(
      Number.POSITIVE_INFINITY
    );
  });
});
