import { describe, expect, it } from "vitest";
import {
  DEFAULT_TEXT_STYLE,
  MAX_FONT_SIZE,
  MIN_FONT_SIZE,
} from "@/config/pdf-editor";
import { clampFontSize, readStyleShortcut, stepFontSize } from "./text-style";

const NO_KEYS = {
  altKey: false,
  ctrlKey: false,
  metaKey: false,
  shiftKey: false,
};

describe("stepFontSize", () => {
  it("moves along the scale", () => {
    expect(stepFontSize(16, 1)).toBe(18);
    expect(stepFontSize(16, -1)).toBe(14);
  });

  it("finds the scale again from a size a drag left between steps", () => {
    expect(stepFontSize(16.5, 1)).toBe(18);
    expect(stepFontSize(16.5, -1)).toBe(16);
  });

  it("stops at the ends", () => {
    expect(stepFontSize(MAX_FONT_SIZE, 1)).toBe(MAX_FONT_SIZE);
    expect(stepFontSize(MIN_FONT_SIZE, -1)).toBe(MIN_FONT_SIZE);
  });
});

describe("clampFontSize", () => {
  it("keeps a typed size within what the toolbar allows", () => {
    expect(clampFontSize(1)).toBe(MIN_FONT_SIZE);
    expect(clampFontSize(9000)).toBe(MAX_FONT_SIZE);
    expect(clampFontSize(21)).toBe(21);
  });
});

describe("readStyleShortcut", () => {
  it("toggles against what the text has now", () => {
    const keys = { ...NO_KEYS, key: "b", metaKey: true };

    expect(readStyleShortcut(keys, DEFAULT_TEXT_STYLE)).toEqual({ bold: true });
    expect(
      readStyleShortcut(keys, { ...DEFAULT_TEXT_STYLE, bold: true })
    ).toEqual({ bold: false });
  });

  it("takes Ctrl where Cmd is not the key", () => {
    expect(
      readStyleShortcut(
        { ...NO_KEYS, ctrlKey: true, key: "i" },
        DEFAULT_TEXT_STYLE
      )
    ).toEqual({ italic: true });
  });

  it("steps the size with the shifted bracket keys", () => {
    expect(
      readStyleShortcut(
        { ...NO_KEYS, key: ">", metaKey: true, shiftKey: true },
        DEFAULT_TEXT_STYLE
      )
    ).toEqual({ fontSize: 18 });
  });

  it("leaves everything else to the browser", () => {
    expect(
      readStyleShortcut({ ...NO_KEYS, key: "b" }, DEFAULT_TEXT_STYLE)
    ).toBeNull();
    expect(
      readStyleShortcut(
        { ...NO_KEYS, key: "z", metaKey: true },
        DEFAULT_TEXT_STYLE
      )
    ).toBeNull();
    expect(
      readStyleShortcut(
        { ...NO_KEYS, key: "b", metaKey: true, shiftKey: true },
        DEFAULT_TEXT_STYLE
      )
    ).toBeNull();
  });
});
