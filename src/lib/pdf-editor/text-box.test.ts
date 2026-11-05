import { describe, expect, it } from "vitest";
import {
  MIN_EDGE_WRAP_WIDTH,
  MIN_TEXT_BOX_WIDTH,
  PAGE_INSET,
  TEXT_PLACEHOLDER,
} from "@/config/pdf-editor";
import {
  getFieldBox,
  getFieldWidth,
  keepTextOnPage,
  resizeTextBox,
} from "./text-box";
import type { PageSize, TextDraft, TextGeometry } from "./types";

const PAGE: PageSize = { height: 792, width: 612 };

function makeBox(
  overrides: Partial<TextDraft> = {}
): TextGeometry & Partial<TextDraft> {
  return {
    fontSize: 10,
    text: "hello",
    width: 100,
    x: 50,
    y: 100,
    ...overrides,
  };
}

describe("resizeTextBox", () => {
  it("widens from the right without moving the left edge", () => {
    expect(resizeTextBox(makeBox(), "right", 40, PAGE)).toMatchObject({
      width: 140,
      x: 50,
    });
  });

  it("keeps the right edge in place when the left one is dragged", () => {
    expect(resizeTextBox(makeBox(), "left", -30, PAGE)).toMatchObject({
      width: 130,
      x: 20,
    });
  });

  it("narrows from the left by moving that edge inward", () => {
    expect(resizeTextBox(makeBox(), "left", 40, PAGE)).toMatchObject({
      width: 60,
      x: 90,
    });
  });

  it("stops at a width a word can still fit in", () => {
    expect(resizeTextBox(makeBox(), "right", -80, PAGE).width).toBe(
      MIN_TEXT_BOX_WIDTH
    );
  });

  it("will not widen a box past the edge of the page", () => {
    const box = makeBox({ x: 500 });

    expect(resizeTextBox(box, "right", 200, PAGE).width).toBe(
      PAGE.width - PAGE_INSET - 500
    );
  });

  it("starts from the width the text measures when the box has none", () => {
    // Five characters at TEXT_WIDTH_FALLBACK_RATIO of a size ten font: 25 wide.
    const box = makeBox({ width: undefined });

    expect(resizeTextBox(box, "right", 40, PAGE).width).toBe(65);
  });

  it("will not widen a box past the start of the page", () => {
    const box = makeBox({ x: 10 });

    expect(resizeTextBox(box, "left", -200, PAGE)).toMatchObject({
      width: 110 - PAGE_INSET,
      x: PAGE_INSET,
    });
  });
});

describe("getFieldWidth", () => {
  it("hugs the text of a box with no width of its own", () => {
    expect(getFieldWidth(makeBox({ width: undefined }))).toBe(25);
  });

  it("makes room for the placeholder while empty", () => {
    const empty = makeBox({ text: "", width: undefined });

    expect(getFieldWidth(empty)).toBe(TEXT_PLACEHOLDER.length * 5);
  });

  it("keeps a width that was set, however short the text", () => {
    expect(getFieldWidth(makeBox({ text: "" }))).toBe(100);
  });
});

describe("keepTextOnPage", () => {
  it("hands back the same object when the text already fits", () => {
    const box = makeBox({ width: undefined });

    expect(keepTextOnPage(box, PAGE)).toBe(box);
  });

  it("settles after one pass, whatever the floats do", () => {
    // Floats a round trip through the box does not land back on exactly.
    const box = makeBox({
      fontSize: 17.3,
      width: undefined,
      x: 91.7,
      y: 303.3,
    });
    const fitted = keepTextOnPage(box, PAGE);

    expect(keepTextOnPage(fitted, PAGE)).toBe(fitted);
  });

  it("wraps at the page's edge rather than sliding back", () => {
    const box = makeBox({ text: "x".repeat(200), width: undefined, x: 300 });
    const fitted = keepTextOnPage(box, PAGE);

    expect(fitted.x).toBe(300);
    expect(fitted.width).toBe(PAGE.width - PAGE_INSET - 300);
    expect(fitted.isEdgeWrapped).toBe(true);
  });

  it("lets go of that width once the text fits again", () => {
    const fitted = keepTextOnPage(
      { ...makeBox({ width: 300, x: 300 }), isEdgeWrapped: true },
      PAGE
    );

    expect(fitted.width).toBeUndefined();
  });

  it("leaves a width the reader set alone", () => {
    const box = makeBox({ text: "x".repeat(200), width: 50 });

    expect(keepTextOnPage(box, PAGE).width).toBe(50);
  });

  it("slides back when too little is left to wrap in", () => {
    const box = makeBox({
      text: "x".repeat(200),
      width: undefined,
      x: PAGE.width - 20,
    });
    const fitted = keepTextOnPage(box, PAGE);

    expect(fitted.width).toBe(MIN_EDGE_WRAP_WIDTH);
    expect(fitted.x).toBe(PAGE.width - PAGE_INSET - MIN_EDGE_WRAP_WIDTH);
  });

  it("pulls text back up that has run off the bottom", () => {
    const box = makeBox({ y: PAGE.height + 50 });
    const { height, y } = getFieldBox(keepTextOnPage(box, PAGE));

    expect(y + height).toBeCloseTo(PAGE.height - PAGE_INSET);
  });
});
