import { describe, expect, it } from "vitest";
import { wrapText } from "./wrap-text";

/** Every character is one unit wide. */
const measure = (text: string) => text.length;

describe("wrapText", () => {
  it("fills each line with as many words as fit", () => {
    expect(wrapText("one two three four", 9, measure)).toEqual([
      "one two",
      "three",
      "four",
    ]);
  });

  it("keeps the line breaks the text was written with", () => {
    expect(wrapText("first\nsecond", 20, measure)).toEqual(["first", "second"]);
  });

  it("breaks a word longer than a whole line", () => {
    expect(wrapText("abcdefgh ij", 3, measure)).toEqual([
      "abc",
      "def",
      "gh",
      "ij",
    ]);
  });

  it("keeps a blank line as a line", () => {
    expect(wrapText("a\n\nb", 5, measure)).toEqual(["a", "", "b"]);
  });
});
