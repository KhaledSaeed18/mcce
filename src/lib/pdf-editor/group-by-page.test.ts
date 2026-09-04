import { describe, expect, it } from "vitest";
import { groupAnnotationsByPage } from "./group-by-page";
import type { Annotation } from "./types";

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

describe("groupAnnotationsByPage", () => {
  it("puts each piece of markup with the page it belongs to", () => {
    const groups = groupAnnotationsByPage([
      makeStroke("a", "p0"),
      makeStroke("b", "p1"),
      makeStroke("c", "p0"),
    ]);

    expect(groups.get("p0")?.map((item) => item.id)).toEqual(["a", "c"]);
    expect(groups.get("p1")?.map((item) => item.id)).toEqual(["b"]);
  });

  it("keeps the order markup was drawn in, which is the order it is drawn back", () => {
    const groups = groupAnnotationsByPage([
      makeStroke("under", "p0"),
      makeStroke("over", "p0"),
    ]);

    expect(groups.get("p0")?.map((item) => item.id)).toEqual(["under", "over"]);
  });

  it("holds nothing for a page nothing was drawn on", () => {
    expect(groupAnnotationsByPage([]).get("p0")).toBeUndefined();
  });
});
