import { describe, expect, it } from "vitest";
import { ERASER_TOLERANCE } from "@/config/pdf-editor";
import { isAnnotationHit } from "./geometry";
import {
  distanceToEllipseOutline,
  distanceToRectOutline,
  pointsAlong,
} from "./shape-hit";
import type { Annotation } from "./types";

const BOX = { height: 100, width: 200, x: 100, y: 100 };
const SHAPE = {
  ...BOX,
  color: "#000000",
  id: "s",
  pageId: "p0",
  strokeWidth: 2,
};

describe("distanceToRectOutline", () => {
  it("measures to the nearest side from inside", () => {
    expect(distanceToRectOutline(BOX, { x: 110, y: 150 })).toBe(10);
  });

  it("measures to the nearest corner from outside", () => {
    expect(distanceToRectOutline(BOX, { x: 97, y: 96 })).toBe(5);
  });
});

describe("distanceToEllipseOutline", () => {
  const CIRCLE = { height: 100, width: 100, x: 0, y: 0 };

  it("is exact on a circle", () => {
    expect(distanceToEllipseOutline(CIRCLE, { x: 50, y: 10 })).toBeCloseTo(10);
    expect(distanceToEllipseOutline(CIRCLE, { x: 50, y: -10 })).toBeCloseTo(10);
  });

  it("copes with the very center", () => {
    expect(distanceToEllipseOutline(CIRCLE, { x: 50, y: 50 })).toBe(50);
  });
});

describe("hollow shapes", () => {
  const rect: Annotation = { ...SHAPE, type: "rect" };
  const ellipse: Annotation = { ...SHAPE, type: "ellipse" };
  const cover: Annotation = {
    ...BOX,
    color: "#000000",
    id: "c",
    pageId: "p0",
    type: "cover",
  };

  it("are touched at their outline", () => {
    expect(isAnnotationHit(rect, { x: 100, y: 150 })).toBe(true);
    expect(isAnnotationHit(ellipse, { x: 200, y: 100 })).toBe(true);
  });

  it("let a press through their empty middle", () => {
    expect(isAnnotationHit(rect, { x: 200, y: 150 })).toBe(false);
    expect(isAnnotationHit(ellipse, { x: 200, y: 150 })).toBe(false);
  });

  it("leave an ellipse's corners empty too", () => {
    expect(isAnnotationHit(ellipse, { x: 101, y: 101 })).toBe(false);
  });

  it("do not include a cover, which is solid", () => {
    expect(isAnnotationHit(cover, { x: 200, y: 150 })).toBe(true);
  });
});

describe("pointsAlong", () => {
  it("leaves no gap wider than the spacing", () => {
    const points = pointsAlong({ x: 0, y: 0 }, { x: 100, y: 0 }, 6);

    expect(points.at(-1)).toEqual({ x: 100, y: 0 });
    expect(points[0].x).toBeLessThanOrEqual(6);
    expect(points.length).toBeGreaterThanOrEqual(100 / 6);
  });

  it("still lands on the end when nothing moved", () => {
    expect(pointsAlong({ x: 5, y: 5 }, { x: 5, y: 5 }, 6)).toEqual([
      { x: 5, y: 5 },
    ]);
  });

  it("stays clear of the tolerance a thin line needs", () => {
    const [first] = pointsAlong(
      { x: 0, y: 0 },
      { x: 500, y: 0 },
      ERASER_TOLERANCE
    );

    expect(first.x).toBeLessThanOrEqual(ERASER_TOLERANCE);
  });
});
