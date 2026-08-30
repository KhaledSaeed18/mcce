import { describe, expect, it } from "vitest";
import { buildPageId, buildPages } from "./pages";

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
