import { describe, expect, it } from "vitest";
import { insertSheet } from "./insert-sheet";
import { buildPages, movePage } from "./pages";
import { findSourcePosition } from "./source-position";

describe("findSourcePosition", () => {
  it("finds a page of the file where it sits now", () => {
    const pages = movePage(buildPages(3), 2, 0);

    expect(findSourcePosition(pages, 2)).toBe(0);
  });

  it("reports a page that has been taken out", () => {
    const pages = buildPages(3).filter((page) => page.id !== "p1");

    expect(findSourcePosition(pages, 1)).toBe(-1);
  });

  it("skips a sheet sized by that page", () => {
    const withSheet = insertSheet(buildPages(2), "p0", "blank");
    const pages = movePage(withSheet, 0, 2);

    expect(findSourcePosition(pages, 0)).toBe(2);
  });
});
