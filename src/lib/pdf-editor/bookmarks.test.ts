import { describe, expect, it } from "vitest";
import { listBookmarkedPositions, toggleBookmark } from "./bookmarks";
import { buildPages, movePage } from "./pages";

describe("toggleBookmark", () => {
  it("adds a page that is not bookmarked", () => {
    expect(toggleBookmark(["p0"], "p2")).toEqual(["p0", "p2"]);
  });

  it("takes off a page that is", () => {
    expect(toggleBookmark(["p0", "p2"], "p0")).toEqual(["p2"]);
  });
});

describe("listBookmarkedPositions", () => {
  it("lists bookmarked pages in the order they sit now", () => {
    const pages = movePage(buildPages(4), 3, 0);

    expect(listBookmarkedPositions(["p1", "p3"], pages)).toEqual([0, 2]);
  });

  it("leaves out a bookmarked page that has been taken out", () => {
    const pages = buildPages(3).filter((page) => page.id !== "p1");

    expect(listBookmarkedPositions(["p1", "p2"], pages)).toEqual([1]);
  });
});
