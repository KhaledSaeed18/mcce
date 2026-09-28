import { describe, expect, it } from "vitest";
import { buildPages, movePage } from "./pages";
import { collectStudyItems, groupStudyItems } from "./study-items";
import type { Annotation } from "./types";

function note(id: string, pageId: string, y: number, text = id): Annotation {
  return { color: "#ffd60a", id, pageId, text, type: "note", x: 10, y };
}

function mark(
  id: string,
  pageId: string,
  style: "highlight" | "underline"
): Annotation {
  return {
    boxes: [{ height: 10, width: 50, x: 10, y: 100 }],
    color: "#ffd60a",
    id,
    pageId,
    style,
    text: `words of ${id}`,
    type: "mark",
  };
}

describe("collectStudyItems", () => {
  it("lists notes and highlights, and leaves other markup out", () => {
    const items = collectStudyItems(
      [
        note("n", "p0", 10),
        mark("h", "p0", "highlight"),
        mark("u", "p0", "underline"),
      ],
      buildPages(1)
    );

    expect(items.map((item) => item.annotation.id)).toEqual(["n", "h"]);
    expect(items[1].text).toBe("words of h");
  });

  it("reads page by page in the order the pages sit now, then down the page", () => {
    const pages = movePage(buildPages(2), 1, 0);
    const items = collectStudyItems(
      [
        note("low", "p1", 300),
        note("first page", "p0", 5),
        note("high", "p1", 20),
      ],
      pages
    );

    expect(items.map((item) => [item.annotation.id, item.position])).toEqual([
      ["high", 0],
      ["low", 0],
      ["first page", 1],
    ]);
  });

  it("leaves out markup on a page that has been taken out", () => {
    const pages = buildPages(2).filter((page) => page.id !== "p1");

    expect(collectStudyItems([note("gone", "p1", 0)], pages)).toEqual([]);
  });
});

describe("groupStudyItems", () => {
  it("gathers the items on each page under it", () => {
    const items = collectStudyItems(
      [note("a", "p0", 0), note("b", "p0", 10), note("c", "p2", 0)],
      buildPages(3)
    );

    expect(
      groupStudyItems(items).map((group) => [
        group.position,
        group.items.map((item) => item.annotation.id),
      ])
    ).toEqual([
      [0, ["a", "b"]],
      [2, ["c"]],
    ]);
  });
});
