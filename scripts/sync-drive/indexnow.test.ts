import { describe, expect, it } from "vitest";
import { makeNode } from "../../src/lib/drive/test-fixtures";
import { buildChangedUrls } from "./indexnow";

const RUN = "2026-08-20T00:00:00.000Z";
const OLD = "2026-08-01T00:00:00.000Z";

describe("buildChangedUrls", () => {
  it("returns nothing when this sync found no new nodes", () => {
    const nodes = [
      makeNode({ firstSeenAt: OLD, id: "a", pathIds: ["sem", "a"] }),
    ];

    expect(buildChangedUrls(nodes, RUN)).toEqual([]);
  });

  it("includes home, recent, and the touched course folder and course page", () => {
    const nodes = [
      makeNode({
        courseCode: "CENG557",
        firstSeenAt: RUN,
        id: "lecture-1",
        pathIds: ["sem", "course-a", "lecture-1"],
      }),
    ];

    expect(buildChangedUrls(nodes, RUN)).toEqual([
      "https://mcce.khaledsaeed.tech/",
      "https://mcce.khaledsaeed.tech/recent",
      "https://mcce.khaledsaeed.tech/browse/course-a",
      "https://mcce.khaledsaeed.tech/course/CENG557",
    ]);
  });

  it("dedupes when several new nodes share the same course", () => {
    const nodes = [
      makeNode({
        courseCode: "CENG557",
        firstSeenAt: RUN,
        id: "lecture-1",
        pathIds: ["sem", "course-a", "lecture-1"],
      }),
      makeNode({
        courseCode: "CENG557",
        firstSeenAt: RUN,
        id: "lecture-2",
        pathIds: ["sem", "course-a", "lecture-2"],
      }),
    ];

    expect(buildChangedUrls(nodes, RUN)).toEqual([
      "https://mcce.khaledsaeed.tech/",
      "https://mcce.khaledsaeed.tech/recent",
      "https://mcce.khaledsaeed.tech/browse/course-a",
      "https://mcce.khaledsaeed.tech/course/CENG557",
    ]);
  });

  it("skips nodes with no course-folder ancestor", () => {
    const nodes = [
      makeNode({ firstSeenAt: RUN, id: "semester-a", pathIds: ["semester-a"] }),
    ];

    expect(buildChangedUrls(nodes, RUN)).toEqual([]);
  });
});
