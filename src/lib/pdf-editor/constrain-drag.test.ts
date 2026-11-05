import { describe, expect, it } from "vitest";
import { constrainDrag } from "./constrain-drag";

const START = { x: 100, y: 100 };

describe("constrainDrag", () => {
  it("keeps a box square, on the side it was dragged to", () => {
    expect(constrainDrag("rect", START, { x: 150, y: 110 })).toEqual({
      x: 150,
      y: 150,
    });
    expect(constrainDrag("ellipse", START, { x: 50, y: 110 })).toEqual({
      x: 50,
      y: 150,
    });
    expect(constrainDrag("cover", START, { x: 110, y: 40 })).toEqual({
      x: 160,
      y: 40,
    });
  });

  it("snaps an arrow to the nearest 45 degrees, keeping its length", () => {
    const end = constrainDrag("arrow", START, { x: 200, y: 105 });

    expect(end.x).toBeCloseTo(100 + Math.hypot(100, 5));
    expect(end.y).toBeCloseTo(100);
  });

  it("leaves freehand tools alone", () => {
    const end = { x: 150, y: 110 };

    expect(constrainDrag("pen", START, end)).toBe(end);
  });
});
