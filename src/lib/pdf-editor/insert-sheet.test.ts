import { describe, expect, it } from "vitest";
import { insertSheet } from "./insert-sheet";
import { buildPages, isOriginalLayout } from "./pages";

describe("insertSheet", () => {
  it("puts the sheet directly after the page it was asked for", () => {
    const pages = buildPages(3);

    const next = insertSheet(pages, "p1", "grid");

    expect(next.map((page) => page.id).slice(0, 2)).toEqual(["p0", "p1"]);
    expect(next[2]).toMatchObject({ sheet: "grid", sourceIndex: 1 });
    expect(next[3].id).toBe("p2");
  });

  it("gives the sheet an identity of its own", () => {
    const next = insertSheet(buildPages(1), "p0", "blank");

    expect(next[1].id).not.toBe("p0");
  });

  it("turns the sheet as far as the page it follows", () => {
    const pages = buildPages(1);
    pages[0].rotation = 90;

    expect(insertSheet(pages, "p0", "blank")[1].rotation).toBe(90);
  });

  it("leaves the pages alone when the page is not there", () => {
    const pages = buildPages(2);

    expect(insertSheet(pages, "missing", "blank")).toBe(pages);
  });

  it("no longer counts as the file's own layout", () => {
    expect(isOriginalLayout(insertSheet(buildPages(2), "p1", "blank"), 2)).toBe(
      false
    );
  });
});
