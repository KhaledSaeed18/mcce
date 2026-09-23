import { describe, expect, it } from "vitest";
import { MIN_SHAPE_SIZE } from "@/config/pdf-editor";
import { resizeBox } from "./resize-box";
import { isResizable, scaleAnnotation } from "./scale-annotation";
import type { Annotation } from "./types";

const PAGE = { height: 800, width: 600 };
const BOX = { height: 50, width: 100, x: 100, y: 100 };

describe("resizeBox", () => {
  it("grows from the bottom right, holding the top left still", () => {
    expect(resizeBox(BOX, "bottom-right", 20, 30, PAGE)).toEqual({
      height: 80,
      width: 120,
      x: 100,
      y: 100,
    });
  });

  it("grows from the top left, holding the bottom right still", () => {
    expect(resizeBox(BOX, "top-left", -10, -20, PAGE)).toEqual({
      height: 70,
      width: 110,
      x: 90,
      y: 80,
    });
  });

  it("stops short of turning inside out", () => {
    const box = resizeBox(BOX, "bottom-right", -500, -500, PAGE);
    expect(box.width).toBe(MIN_SHAPE_SIZE);
    expect(box.height).toBe(MIN_SHAPE_SIZE);
  });

  it("stops at the page edge", () => {
    expect(resizeBox(BOX, "top-right", 900, 0, PAGE).width).toBe(500);
  });
});

describe("scaleAnnotation", () => {
  it("stretches a stroke's points with its frame", () => {
    const stroke: Annotation = {
      color: "#000000",
      id: "pen",
      pageId: "p0",
      points: [
        { x: 100, y: 100 },
        { x: 200, y: 150 },
      ],
      type: "pen",
      width: 2,
    };
    const scaled = scaleAnnotation(stroke, BOX, {
      height: 100,
      width: 200,
      x: 100,
      y: 100,
    });
    expect(scaled).toMatchObject({
      points: [
        { x: 100, y: 100 },
        { x: 300, y: 200 },
      ],
      width: 2,
    });
  });

  it("carries a flat line along instead of dividing by its zero height", () => {
    const arrow: Annotation = {
      color: "#000000",
      from: { x: 100, y: 100 },
      id: "arrow",
      pageId: "p0",
      strokeWidth: 2,
      to: { x: 200, y: 100 },
      type: "arrow",
    };
    const flat = { height: 0, width: 100, x: 100, y: 100 };
    const scaled = scaleAnnotation(arrow, flat, {
      height: 0,
      width: 50,
      x: 100,
      y: 120,
    });
    expect(scaled).toMatchObject({
      from: { x: 100, y: 120 },
      to: { x: 150, y: 120 },
    });
  });

  it("leaves text and text marks to their own ways of sizing", () => {
    const mark: Annotation = {
      boxes: [BOX],
      color: "#ffd60a",
      id: "m",
      pageId: "p0",
      style: "highlight",
      type: "mark",
    };
    expect(isResizable(mark)).toBe(false);
  });
});
