import { describe, expect, it } from "vitest";
import {
  PAGE_HALF_TURN,
  PAGE_QUARTER_TURN,
  PAGE_THREE_QUARTER_TURN,
} from "@/config/pdf-editor";
import { getRenderedSize } from "../rotation";
import type { PageSize, Point } from "../types";
import { flipY, getContentMatrix } from "./content-space";

/** Portrait content, so a quarter turn is visibly a different shape. */
const CONTENT: PageSize = { height: 200, width: 100 };

/** The journey a coordinate makes on its way out: flipped, then mapped. */
function toContent(point: Point, rotation: number): Point {
  const displayed = getRenderedSize(CONTENT, rotation);
  const [a, b, c, d, e, f] = getContentMatrix(CONTENT, rotation);
  const { x } = point;
  const y = flipY(displayed.height, point.y);
  return { x: a * x + c * y + e, y: b * x + d * y + f };
}

describe("getContentMatrix", () => {
  it("only flips a page that carries no turn of its own", () => {
    expect(toContent({ x: 0, y: 0 }, 0)).toEqual({ x: 0, y: 200 });
    expect(toContent({ x: 100, y: 200 }, 0)).toEqual({ x: 100, y: 0 });
  });

  it("takes the top left of a quarter turned page to the content it shows", () => {
    // Turned a quarter, the page reads 200 wide by 100 tall, and its top left
    // corner is the bottom left of the content underneath.
    expect(toContent({ x: 0, y: 0 }, PAGE_QUARTER_TURN)).toEqual({
      x: 0,
      y: 0,
    });
    expect(toContent({ x: 200, y: 0 }, PAGE_QUARTER_TURN)).toEqual({
      x: 0,
      y: 200,
    });
    expect(toContent({ x: 0, y: 100 }, PAGE_QUARTER_TURN)).toEqual({
      x: 100,
      y: 0,
    });
  });

  it("takes the corners of an upside down page across the diagonal", () => {
    expect(toContent({ x: 0, y: 0 }, PAGE_HALF_TURN)).toEqual({
      x: 100,
      y: 0,
    });
    expect(toContent({ x: 100, y: 200 }, PAGE_HALF_TURN)).toEqual({
      x: 0,
      y: 200,
    });
  });

  it("takes the top left of a three quarter turned page to the content it shows", () => {
    expect(toContent({ x: 0, y: 0 }, PAGE_THREE_QUARTER_TURN)).toEqual({
      x: 100,
      y: 200,
    });
    expect(toContent({ x: 200, y: 100 }, PAGE_THREE_QUARTER_TURN)).toEqual({
      x: 0,
      y: 0,
    });
  });

  it("keeps text upright rather than mirrored", () => {
    for (const rotation of [
      0,
      PAGE_QUARTER_TURN,
      PAGE_HALF_TURN,
      PAGE_THREE_QUARTER_TURN,
    ]) {
      const [a, b, c, d] = getContentMatrix(CONTENT, rotation);
      // A reflection would turn glyphs the wrong way round, so the matrix has
      // to be a plain rotation, which is what a determinant of one means.
      expect(a * d - b * c).toBe(1);
    }
  });

  it("reads a turn outside a single revolution as the same turn", () => {
    expect(getContentMatrix(CONTENT, PAGE_QUARTER_TURN + 360)).toEqual(
      getContentMatrix(CONTENT, PAGE_QUARTER_TURN)
    );
    expect(getContentMatrix(CONTENT, -PAGE_QUARTER_TURN)).toEqual(
      getContentMatrix(CONTENT, PAGE_THREE_QUARTER_TURN)
    );
  });
});
