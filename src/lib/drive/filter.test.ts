import { describe, expect, it } from "vitest";
import { filterNodes } from "./filter";
import { makeNode } from "./test-fixtures";

describe("filterNodes", () => {
  const nodes = [
    makeNode({
      courseCode: "EENG537",
      id: "1",
      kind: "pdf",
      semester: "Fall",
      sourceId: "year1",
    }),
    makeNode({
      courseCode: "CENG675",
      id: "2",
      kind: "video",
      semester: "Spring",
      sourceId: "year1",
    }),
    makeNode({
      courseCode: "EENG537",
      id: "3",
      kind: "video",
      semester: "Fall",
      sourceId: "year2",
    }),
  ];

  it("returns everything when no filters are set", () => {
    expect(filterNodes(nodes, {})).toHaveLength(3);
  });

  it("filters by a single facet", () => {
    expect(filterNodes(nodes, { kind: "video" }).map((n) => n.id)).toEqual([
      "2",
      "3",
    ]);
  });

  it("combines multiple facets with AND semantics", () => {
    expect(
      filterNodes(nodes, { courseCode: "EENG537", kind: "video" }).map(
        (n) => n.id
      )
    ).toEqual(["3"]);
  });

  it("filters by source", () => {
    expect(filterNodes(nodes, { sourceId: "year2" }).map((n) => n.id)).toEqual([
      "3",
    ]);
  });
});
