import { describe, expect, it } from "vitest";
import {
  PAGE_HALF_TURN,
  PAGE_QUARTER_TURN,
  PAGE_THREE_QUARTER_TURN,
} from "@/config/pdf-editor";
import {
  getRenderedSize,
  getRotationTransform,
  toBaseDelta,
  toBasePoint,
} from "./rotation";
import type { PageSize, Point } from "./types";

const SIZE: PageSize = { height: 800, width: 600 };

describe("getRenderedSize", () => {
  it("leaves an upright page as it is", () => {
    expect(getRenderedSize(SIZE, 0)).toEqual(SIZE);
    expect(getRenderedSize(SIZE, PAGE_HALF_TURN)).toEqual(SIZE);
  });

  it("lays a page on its side for a quarter turn", () => {
    const onItsSide = { height: 600, width: 800 };

    expect(getRenderedSize(SIZE, PAGE_QUARTER_TURN)).toEqual(onItsSide);
    expect(getRenderedSize(SIZE, PAGE_THREE_QUARTER_TURN)).toEqual(onItsSide);
  });
});

describe("toBasePoint", () => {
  it("leaves a point on an upright page alone", () => {
    expect(toBasePoint({ x: 10, y: 20 }, SIZE, 0)).toEqual({ x: 10, y: 20 });
  });

  it("takes the corners of a quarter turned page back to their own", () => {
    // The upright top left shows up at the top right once the page is turned.
    expect(toBasePoint({ x: 800, y: 0 }, SIZE, PAGE_QUARTER_TURN)).toEqual({
      x: 0,
      y: 0,
    });
    expect(toBasePoint({ x: 0, y: 0 }, SIZE, PAGE_QUARTER_TURN)).toEqual({
      x: 0,
      y: 800,
    });
  });

  it("takes a point on an upside down page back to its own", () => {
    expect(toBasePoint({ x: 600, y: 800 }, SIZE, PAGE_HALF_TURN)).toEqual({
      x: 0,
      y: 0,
    });
  });

  it("takes the corners of a three quarter turned page back to their own", () => {
    expect(
      toBasePoint({ x: 0, y: 600 }, SIZE, PAGE_THREE_QUARTER_TURN)
    ).toEqual({ x: 0, y: 0 });
  });
});

describe("getRotationTransform", () => {
  /** The canvas draws through this, so it has to be what toBasePoint undoes. */
  function applyTransform(rotation: number, point: Point): Point {
    const { angle, tx, ty } = getRotationTransform(SIZE, rotation);
    return {
      x: tx + point.x * Math.cos(angle) - point.y * Math.sin(angle),
      y: ty + point.x * Math.sin(angle) + point.y * Math.cos(angle),
    };
  }

  const ROTATIONS = [
    0,
    PAGE_QUARTER_TURN,
    PAGE_HALF_TURN,
    PAGE_THREE_QUARTER_TURN,
  ];
  const POINTS: Point[] = [
    { x: 0, y: 0 },
    { x: 600, y: 0 },
    { x: 600, y: 800 },
    { x: 0, y: 800 },
    { x: 137, y: 429 },
  ];

  it("keeps the turned page over the same ground the upright one covered", () => {
    for (const rotation of ROTATIONS) {
      const rendered = getRenderedSize(SIZE, rotation);

      for (const point of POINTS) {
        const drawn = applyTransform(rotation, point);

        expect(drawn.x).toBeGreaterThanOrEqual(-1);
        expect(drawn.x).toBeLessThanOrEqual(rendered.width + 1);
        expect(drawn.y).toBeGreaterThanOrEqual(-1);
        expect(drawn.y).toBeLessThanOrEqual(rendered.height + 1);
      }
    }
  });

  it("is undone exactly by the mapping the pointer goes through", () => {
    for (const rotation of ROTATIONS) {
      for (const point of POINTS) {
        const back = toBasePoint(
          applyTransform(rotation, point),
          SIZE,
          rotation
        );

        expect(back.x).toBeCloseTo(point.x);
        expect(back.y).toBeCloseTo(point.y);
      }
    }
  });
});

describe("toBaseDelta", () => {
  it("leaves movement on an upright page alone", () => {
    expect(toBaseDelta({ x: 5, y: -3 }, 0)).toEqual({ x: 5, y: -3 });
  });

  it("reads movement across a quarter turned page down the page instead", () => {
    const across = toBaseDelta({ x: 10, y: 0 }, PAGE_QUARTER_TURN);
    const down = toBaseDelta({ x: 0, y: 10 }, PAGE_QUARTER_TURN);

    expect(across.x).toBeCloseTo(0);
    expect(across.y).toBeCloseTo(-10);
    expect(down.x).toBeCloseTo(10);
    expect(down.y).toBeCloseTo(0);
  });

  it("reverses movement on an upside down page", () => {
    expect(toBaseDelta({ x: 4, y: 7 }, PAGE_HALF_TURN)).toEqual({
      x: -4,
      y: -7,
    });
  });

  it("is the movement between two points mapped back", () => {
    const from = { x: 100, y: 200 };
    const to = { x: 160, y: 230 };

    for (const rotation of [
      0,
      PAGE_QUARTER_TURN,
      PAGE_HALF_TURN,
      PAGE_THREE_QUARTER_TURN,
    ]) {
      const start = toBasePoint(from, SIZE, rotation);
      const end = toBasePoint(to, SIZE, rotation);
      const delta = toBaseDelta(
        { x: to.x - from.x, y: to.y - from.y },
        rotation
      );

      expect(delta.x).toBeCloseTo(end.x - start.x);
      expect(delta.y).toBeCloseTo(end.y - start.y);
    }
  });
});
