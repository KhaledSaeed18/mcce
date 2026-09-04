import { describe, expect, it } from "vitest";
import { wrapText } from "./text-wrap";

/**
 * Tests run without a canvas to measure with, so every character is
 * TEXT_WIDTH_FALLBACK_RATIO of the font size wide: five units at size ten.
 */
const FONT_SIZE = 10;

describe("wrapText", () => {
  it("breaks only where a newline was typed when the box has no width", () => {
    expect(wrapText("one two\nthree", FONT_SIZE, undefined)).toEqual([
      "one two",
      "three",
    ]);
  });

  it("leaves a line that fits alone", () => {
    expect(wrapText("aaa bbb", FONT_SIZE, 100)).toEqual(["aaa bbb"]);
  });

  it("fits as many words on a line as the width allows", () => {
    expect(wrapText("aaa bbb ccc", FONT_SIZE, 40)).toEqual(["aaa bbb", "ccc"]);
  });

  it("puts every word on its own line when only one fits", () => {
    expect(wrapText("aaa bbb ccc", FONT_SIZE, 30)).toEqual([
      "aaa",
      "bbb",
      "ccc",
    ]);
  });

  it("splits a word no space can break", () => {
    expect(wrapText("abcdefgh", FONT_SIZE, 20)).toEqual(["abcd", "efgh"]);
  });

  it("carries the tail of a split word on to the next line", () => {
    expect(wrapText("aaa abcdefgh", FONT_SIZE, 20)).toEqual([
      "aaa",
      "abcd",
      "efgh",
    ]);
  });

  it("wraps each typed line on its own", () => {
    expect(wrapText("aaa bbb\nccc ddd", FONT_SIZE, 30)).toEqual([
      "aaa",
      "bbb",
      "ccc",
      "ddd",
    ]);
  });
});
