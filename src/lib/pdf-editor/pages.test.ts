import { describe, expect, it } from "vitest";
import {
  buildPageId,
  buildPages,
  movePage,
  withKnownPages,
  withoutPage,
} from "./pages";

function ids(pages: { id: string }[]): string[] {
  return pages.map((page) => page.id);
}

describe("buildPageId", () => {
  it("derives an identity from a page's place in the file", () => {
    expect(buildPageId(0)).toBe("p0");
    expect(buildPageId(12)).toBe("p12");
  });
});

describe("buildPages", () => {
  it("holds every page of the file once, upright and in order", () => {
    expect(buildPages(3)).toEqual([
      { id: "p0", rotation: 0, sourceIndex: 0 },
      { id: "p1", rotation: 0, sourceIndex: 1 },
      { id: "p2", rotation: 0, sourceIndex: 2 },
    ]);
  });

  it("holds nothing for a document that is not open", () => {
    expect(buildPages(0)).toEqual([]);
  });

  it("identifies each page by where it came from, not where it sits", () => {
    const pages = buildPages(4);

    expect(pages.map((page) => page.id)).toEqual(
      pages.map((page) => buildPageId(page.sourceIndex))
    );
  });
});

describe("withoutPage", () => {
  it("takes the named page out", () => {
    const pages = withoutPage(buildPages(3), "p1");

    expect(pages.map((page) => page.id)).toEqual(["p0", "p2"]);
  });

  it("keeps the last page, because a document needs one", () => {
    const pages = buildPages(1);

    expect(withoutPage(pages, "p0")).toEqual(pages);
  });

  it("leaves the list alone when the page is not in it", () => {
    expect(withoutPage(buildPages(2), "p9")).toHaveLength(2);
  });
});

describe("withKnownPages", () => {
  it("keeps pages the file still has", () => {
    expect(withKnownPages(buildPages(3), 3)).toHaveLength(3);
  });

  it("drops pages a shorter file no longer has", () => {
    expect(withKnownPages(buildPages(5), 2).map((page) => page.id)).toEqual([
      "p0",
      "p1",
    ]);
  });

  it("starts over when nothing stored matches the file", () => {
    const stored = [{ id: "p9", rotation: 0, sourceIndex: 9 }];

    expect(withKnownPages(stored, 2)).toEqual(buildPages(2));
  });
});

describe("movePage", () => {
  it("carries a page down the document", () => {
    expect(ids(movePage(buildPages(4), 0, 2))).toEqual([
      "p1",
      "p2",
      "p0",
      "p3",
    ]);
  });

  it("carries a page back up the document", () => {
    expect(ids(movePage(buildPages(4), 3, 1))).toEqual([
      "p0",
      "p3",
      "p1",
      "p2",
    ]);
  });

  it("moves a page to the end", () => {
    expect(ids(movePage(buildPages(3), 0, 2))).toEqual(["p1", "p2", "p0"]);
  });

  it("leaves the order alone when a page lands where it started", () => {
    const pages = buildPages(3);

    expect(movePage(pages, 1, 1)).toBe(pages);
  });

  it("stops at the top when carried past the first page", () => {
    const pages = buildPages(3);

    expect(movePage(pages, 0, -1)).toBe(pages);
    expect(ids(movePage(pages, 2, -3))).toEqual(["p2", "p0", "p1"]);
  });

  it("stops at the end when carried past the last page", () => {
    const pages = buildPages(3);

    expect(movePage(pages, 2, 9)).toBe(pages);
    expect(ids(movePage(pages, 0, 9))).toEqual(["p1", "p2", "p0"]);
  });

  it("leaves the order alone when there is no page to move", () => {
    const pages = buildPages(2);

    expect(movePage(pages, 5, 0)).toBe(pages);
  });
});
