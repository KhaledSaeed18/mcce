import { describe, expect, it } from "vitest";
import { findCollisions, type PlannedNode } from "./plan";

function plannedNode(
  id: string,
  sourceId: string,
  path: string[],
  isFolder = false
): PlannedNode {
  return {
    id,
    isFolder,
    name: path.at(-1) as string,
    parentId: "parent",
    path,
    sourceId,
    targetPath: path,
  };
}

describe("findCollisions", () => {
  it("reports two files in one root that land on the same path", () => {
    const path = ["Semester", "Course", "Final.pdf"];

    expect(
      findCollisions([
        plannedNode("a", "year1", path),
        plannedNode("b", "year1", path),
      ])
    ).toEqual([
      {
        sources: ["Semester/Course/Final.pdf", "Semester/Course/Final.pdf"],
        target: "Semester/Course/Final.pdf",
      },
    ]);
  });

  it("allows files with the same path in different roots", () => {
    const path = ["README (start here)"];

    expect(
      findCollisions([
        plannedNode("a", "year1", path),
        plannedNode("b", "year2", path),
      ])
    ).toEqual([]);
  });

  it("reports folders with the same path across roots", () => {
    const path = ["Semester", "Course"];

    expect(
      findCollisions([
        plannedNode("a", "year1", path, true),
        plannedNode("b", "year2", path, true),
      ])
    ).toHaveLength(1);
  });
});
