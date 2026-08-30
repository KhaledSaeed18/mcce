import { describe, expect, it } from "vitest";
import { PAGE_INSET, TEXT_ASCENT_RATIO } from "@/config/pdf-editor";
import { clampBox, clampPoint, clampTextAnchor } from "./bounds";
import type { Box, PageSize, Point } from "./types";

const PAGE: PageSize = { height: 792, width: 612 };
const FONT_SIZE = 16;
const ASCENT = FONT_SIZE * TEXT_ASCENT_RATIO;

/** A box hung off its anchor the way a committed text hangs off its baseline. */
function textBox(anchor: Point, width: number): Box {
  return { height: FONT_SIZE, width, x: anchor.x, y: anchor.y - ASCENT };
}

function clampText(anchor: Point, width: number, page: PageSize = PAGE): Point {
  return clampTextAnchor(anchor, textBox(anchor, width), page);
}

describe("clampPoint", () => {
  it("leaves a point on the page alone", () => {
    expect(clampPoint({ x: 100, y: 200 }, PAGE)).toEqual({ x: 100, y: 200 });
  });

  it("pulls a point past an edge back onto the page", () => {
    expect(clampPoint({ x: -40, y: 900 }, PAGE)).toEqual({ x: 0, y: 792 });
    expect(clampPoint({ x: 700, y: -10 }, PAGE)).toEqual({ x: 612, y: 0 });
  });
});

describe("clampBox", () => {
  it("leaves a box that already fits alone", () => {
    const box: Box = { height: 40, width: 100, x: 50, y: 60 };

    expect(clampBox(box, PAGE)).toEqual(box);
  });

  it("slides a box inside without resizing it", () => {
    const moved = clampBox({ height: 40, width: 100, x: 580, y: -20 }, PAGE);

    expect(moved).toEqual({
      height: 40,
      width: 100,
      x: PAGE.width - PAGE_INSET - 100,
      y: PAGE_INSET,
    });
  });
});

describe("clampTextAnchor", () => {
  it("leaves text that already fits where it is", () => {
    expect(clampText({ x: 100, y: 200 }, 80)).toEqual({ x: 100, y: 200 });
  });

  it("keeps text from hanging off the left or the top", () => {
    expect(clampText({ x: -50, y: 4 }, 80)).toEqual({
      x: PAGE_INSET,
      y: PAGE_INSET + ASCENT,
    });
  });

  it("keeps text from hanging off the right", () => {
    expect(clampText({ x: 600, y: 200 }, 80).x).toBe(
      PAGE.width - PAGE_INSET - 80
    );
  });

  it("keeps a descender from falling off the bottom", () => {
    expect(clampText({ x: 100, y: 800 }, 80).y).toBeCloseTo(
      PAGE.height - PAGE_INSET - FONT_SIZE + ASCENT
    );
  });

  it("pins text wider than the page to the left edge rather than inverting it", () => {
    expect(clampText({ x: 400, y: 200 }, 900).x).toBe(PAGE_INSET);
  });

  it("moves both axes at once when a corner is overshot", () => {
    const anchor = clampText({ x: 5000, y: 5000 }, 80);

    expect(anchor.x).toBe(PAGE.width - PAGE_INSET - 80);
    expect(anchor.y).toBeCloseTo(PAGE.height - PAGE_INSET - FONT_SIZE + ASCENT);
  });
});
