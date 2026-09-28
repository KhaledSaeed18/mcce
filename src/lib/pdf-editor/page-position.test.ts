import { describe, expect, it } from "vitest";
import { formatPageGap } from "./page-gap";
import { fromPagePosition, toPagePosition } from "./page-position";

describe("page positions", () => {
  it("counts a spot on a page from the start of the file", () => {
    expect(toPagePosition({ fraction: 0.25, index: 2 })).toBe(2.25);
  });

  it("finds the page and spot a position falls on", () => {
    expect(fromPagePosition(4.5, 10)).toEqual({ fraction: 0.5, index: 4 });
  });

  it("keeps a position before the start or past the end inside the file", () => {
    expect(fromPagePosition(-1, 10)).toEqual({ fraction: 0, index: 0 });
    expect(fromPagePosition(12, 10)).toEqual({ fraction: 1, index: 9 });
    expect(fromPagePosition(3, 0)).toEqual({ fraction: 0, index: 0 });
  });
});

describe("formatPageGap", () => {
  it("says the right pane's lead to the nearest page", () => {
    expect(formatPageGap(2.2)).toBe("+2 pages");
    expect(formatPageGap(-0.8)).toBe("-1 page");
    expect(formatPageGap(0.3)).toBe("Same page");
  });
});
