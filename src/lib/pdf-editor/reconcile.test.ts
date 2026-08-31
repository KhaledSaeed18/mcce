import { describe, expect, it } from "vitest";
import { buildPages } from "./pages";
import { reconcileWithFile } from "./reconcile";
import type { Annotation, EditorSnapshot } from "./types";

function makeStroke(id: string, pageId: string): Annotation {
  return {
    color: "#000000",
    id,
    pageId,
    points: [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
    ],
    type: "pen",
    width: 2,
  };
}

function makeSnapshot(): EditorSnapshot {
  return {
    annotations: [
      makeStroke("a", "p0"),
      makeStroke("b", "p2"),
      makeStroke("c", "p0"),
    ],
    pages: buildPages(3),
  };
}

describe("reconcileWithFile", () => {
  it("leaves a file that still matches what was stored", () => {
    const snapshot = makeSnapshot();
    const reconciled = reconcileWithFile(snapshot, 3);

    expect(reconciled.pages).toHaveLength(3);
    expect(reconciled.annotations).toHaveLength(3);
  });

  it("drops pages the file no longer has", () => {
    expect(reconcileWithFile(makeSnapshot(), 2).pages.map((p) => p.id)).toEqual(
      ["p0", "p1"]
    );
  });

  it("drops the markup that was on those pages with them", () => {
    const reconciled = reconcileWithFile(makeSnapshot(), 2);

    expect(reconciled.annotations.map((item) => item.id)).toEqual(["a", "c"]);
  });

  it("keeps nothing pointing at a page that is gone", () => {
    const { annotations, pages } = reconcileWithFile(makeSnapshot(), 2);
    const known = new Set(pages.map((page) => page.id));

    expect(annotations.every((item) => known.has(item.pageId))).toBe(true);
  });

  it("starts the file over when none of the stored pages are its own", () => {
    const snapshot: EditorSnapshot = {
      annotations: [makeStroke("a", "gone")],
      pages: [{ id: "gone", rotation: 0, sourceIndex: 9 }],
    };
    const reconciled = reconcileWithFile(snapshot, 2);

    expect(reconciled.pages.map((page) => page.id)).toEqual(["p0", "p1"]);
    expect(reconciled.annotations).toEqual([]);
  });
});
