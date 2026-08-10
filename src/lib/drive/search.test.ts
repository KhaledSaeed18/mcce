import { describe, expect, it } from "vitest";
import { searchNodes } from "./search";
import { makeNode } from "./test-fixtures";

describe("searchNodes", () => {
  const nodes = [
    makeNode({ id: "1", name: "Lecture6.pptx" }),
    makeNode({ courseCode: "EENG537", id: "2", name: "syllabus.pdf" }),
    makeNode({
      id: "3",
      name: "notes.txt",
      pathNames: ["Fall Semester", "Digital Communications", "notes.txt"],
    }),
  ];

  it("returns everything for an empty query", () => {
    expect(searchNodes(nodes, "  ")).toHaveLength(3);
  });

  it("matches by name, case-insensitively", () => {
    expect(searchNodes(nodes, "LECTURE6").map((n) => n.id)).toEqual(["1"]);
  });

  it("matches by course code", () => {
    expect(searchNodes(nodes, "eeng537").map((n) => n.id)).toEqual(["2"]);
  });

  it("matches by breadcrumb path", () => {
    expect(
      searchNodes(nodes, "digital communications").map((n) => n.id)
    ).toEqual(["3"]);
  });
});
