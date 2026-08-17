import { describe, expect, it } from "vitest";
import { buildCourseMaterials, findCourseFolderId } from "./course-materials";
import { makeNode } from "./test-fixtures";

const nodes = [
  makeNode({
    courseCode: "CENG507",
    id: "exam",
    kind: "pdf",
    materialType: "exam",
    name: "Final.pdf",
  }),
  makeNode({
    courseCode: "CENG507",
    id: "lecture10",
    kind: "pdf",
    materialType: "lecture",
    name: "Lecture 10.pdf",
  }),
  makeNode({
    courseCode: "CENG507",
    id: "lecture2",
    kind: "pdf",
    materialType: "lecture",
    name: "Lecture 2.pdf",
  }),
  makeNode({
    courseCode: "CENG507",
    depth: 1,
    id: "folder",
    kind: "folder",
    name: "CENG507 - Embedded Systems",
  }),
  makeNode({
    courseCode: "EENG537",
    id: "other-course",
    kind: "pdf",
    materialType: "lecture",
    name: "Slides.pdf",
  }),
];

describe("buildCourseMaterials", () => {
  it("keeps only the course's own files", () => {
    const groups = buildCourseMaterials(nodes, "CENG507");

    expect(groups.flatMap((group) => group.items).map((n) => n.id)).toEqual([
      "lecture2",
      "lecture10",
      "exam",
    ]);
  });

  it("orders groups by the configured type order, not by size", () => {
    expect(buildCourseMaterials(nodes, "CENG507").map((g) => g.type)).toEqual([
      "lecture",
      "exam",
    ]);
  });

  it("returns nothing for a course with no indexed material", () => {
    expect(buildCourseMaterials(nodes, "CENG678")).toEqual([]);
  });
});

describe("findCourseFolderId", () => {
  it("finds the course folder", () => {
    expect(findCourseFolderId(nodes, "CENG507")).toBe("folder");
  });

  it("returns null when the course has no folder", () => {
    expect(findCourseFolderId(nodes, "EENG537")).toBeNull();
  });
});
