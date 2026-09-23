import { describe, expect, it } from "vitest";
import { MIN_SHAPE_SIZE } from "@/config/pdf-editor";
import { isEmptyAnnotation } from "./build-annotation";
import type { Annotation, Point } from "./types";

function makeStroke(points: Point[]): Annotation {
  return {
    color: "#000000",
    id: "stroke",
    pageId: "p0",
    points,
    type: "pen",
    width: 2,
  };
}

function makeShape(width: number, height: number): Annotation {
  return {
    color: "#000000",
    height,
    id: "shape",
    pageId: "p0",
    strokeWidth: 2,
    type: "rect",
    width,
    x: 0,
    y: 0,
  };
}

function makeArrow(to: Point): Annotation {
  return {
    color: "#000000",
    from: { x: 0, y: 0 },
    id: "arrow",
    pageId: "p0",
    strokeWidth: 2,
    to,
    type: "arrow",
  };
}

describe("isEmptyAnnotation", () => {
  it("drops a highlight from a press that never moved", () => {
    const highlight: Annotation = {
      ...makeStroke([{ x: 10, y: 10 }]),
      type: "highlight",
    };
    expect(isEmptyAnnotation(highlight)).toBe(true);
  });

  it("drops an arrow too short to have a direction", () => {
    expect(isEmptyAnnotation(makeArrow({ x: 1, y: 1 }))).toBe(true);
  });

  it("keeps an arrow long enough to point somewhere", () => {
    expect(isEmptyAnnotation(makeArrow({ x: 0, y: MIN_SHAPE_SIZE }))).toBe(
      false
    );
  });

  it("drops a stroke from a press that never moved", () => {
    expect(isEmptyAnnotation(makeStroke([{ x: 10, y: 10 }]))).toBe(true);
  });

  it("keeps a stroke that has somewhere to draw a line", () => {
    const stroke = makeStroke([
      { x: 10, y: 10 },
      { x: 10, y: 10 },
    ]);

    expect(isEmptyAnnotation(stroke)).toBe(false);
  });

  it("drops a shape too small to have been meant", () => {
    expect(isEmptyAnnotation(makeShape(MIN_SHAPE_SIZE - 1, 40))).toBe(true);
    expect(isEmptyAnnotation(makeShape(40, MIN_SHAPE_SIZE - 1))).toBe(true);
  });

  it("keeps a shape that was actually dragged out", () => {
    expect(isEmptyAnnotation(makeShape(40, 40))).toBe(false);
  });

  it("keeps text, which is only committed once it has something in it", () => {
    const text: Annotation = {
      color: "#000000",
      fontSize: 16,
      id: "note",
      pageId: "p0",
      text: "hello",
      type: "text",
      x: 0,
      y: 0,
    };

    expect(isEmptyAnnotation(text)).toBe(false);
  });
});
