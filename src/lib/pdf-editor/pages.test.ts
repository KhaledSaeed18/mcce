import { describe, expect, it } from "vitest";
import { buildPageId, buildPages, withKnownPages, withoutPage } from "./pages";

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
