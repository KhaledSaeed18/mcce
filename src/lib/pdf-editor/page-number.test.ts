import { describe, expect, it } from "vitest";
import { readPageIndex } from "./page-number";

const PAGE_COUNT = 13;

describe("readPageIndex", () => {
  it("reads a page number as the index behind it", () => {
    expect(readPageIndex("1", PAGE_COUNT)).toBe(0);
    expect(readPageIndex("11", PAGE_COUNT)).toBe(10);
  });

  it("lands on the nearest page when the number is off the document", () => {
    expect(readPageIndex("0", PAGE_COUNT)).toBe(0);
    expect(readPageIndex("-4", PAGE_COUNT)).toBe(0);
    expect(readPageIndex("99", PAGE_COUNT)).toBe(PAGE_COUNT - 1);
  });

  it("reads nothing out of text that is not a number", () => {
    expect(readPageIndex("", PAGE_COUNT)).toBeNull();
    expect(readPageIndex("abc", PAGE_COUNT)).toBeNull();
  });

  it("takes the leading number of a part typed entry", () => {
    expect(readPageIndex("7x", PAGE_COUNT)).toBe(6);
  });
});
