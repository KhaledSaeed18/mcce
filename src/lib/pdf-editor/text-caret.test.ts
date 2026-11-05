import { describe, expect, it } from "vitest";
import { getCaretOffset } from "./text-caret";
import { getTextBox } from "./text-layout";
import type { TextGeometry } from "./types";

/**
 * Tests run without a canvas to measure with, so every character is half the
 * font size wide: five units at size ten.
 */
function makeText(overrides: Partial<TextGeometry> = {}): TextGeometry {
  return { fontSize: 10, text: "hello\nworld", x: 100, y: 100, ...overrides };
}

function pointIn(text: TextGeometry, column: number, row: number) {
  const box = getTextBox(text);
  return { x: box.x + column * 5, y: box.y + (row + 0.5) * 12.5 };
}

describe("getCaretOffset", () => {
  it("finds the place in the first line", () => {
    const text = makeText();

    expect(getCaretOffset(text, pointIn(text, 2, 0))).toBe(2);
  });

  it("counts the break when it finds a place on a later line", () => {
    const text = makeText();

    expect(getCaretOffset(text, pointIn(text, 2, 1))).toBe(8);
  });

  it("counts the space a wrapped line used up", () => {
    const text = makeText({ text: "hello world", width: 30 });

    expect(getCaretOffset(text, pointIn(text, 1, 1))).toBe(7);
  });

  it("goes to the end of a line clicked past its end", () => {
    const text = makeText();

    expect(getCaretOffset(text, pointIn(text, 40, 0))).toBe(5);
  });

  it("stays in the text when clicked above or below it", () => {
    const text = makeText();

    expect(getCaretOffset(text, pointIn(text, 0, -5))).toBe(0);
    expect(getCaretOffset(text, pointIn(text, 40, 9))).toBe(11);
  });

  it("measures from where an aligned line really starts", () => {
    const text = makeText({ align: "right", text: "hi", width: 100 });
    const box = getTextBox(text);
    // The two characters fill the last ten units of the box.
    const point = { x: box.x + 95, y: box.y + 6 };

    expect(getCaretOffset(text, point)).toBe(1);
  });
});
