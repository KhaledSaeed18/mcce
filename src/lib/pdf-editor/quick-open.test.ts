import { describe, expect, it } from "vitest";
import { groupQuickOpenFiles } from "./quick-open";
import type { EditorTreeNode } from "./types";

function pdf(
  id: string,
  name: string,
  courseCode: string | null,
  parentId = "lectures"
) {
  return {
    courseCode,
    id,
    kind: "pdf",
    materialType: "lecture",
    modifiedTime: "2026-01-01T00:00:00.000Z",
    name,
    parentId,
  } satisfies EditorTreeNode;
}

const NODES: EditorTreeNode[] = [
  pdf("b10", "Lecture10.pdf", "EENG527"),
  pdf("x", "Final.pdf", "CENG566", "exams"),
  pdf("b2", "Lecture2.pdf", "EENG527"),
  pdf("sol", "[Solution]Midterm.pdf", "EENG527", "exams"),
  { ...pdf("folder", "Lectures", "EENG527"), kind: "folder" },
];

describe("groupQuickOpenFiles", () => {
  it("puts the folder being read first, then its course, then the rest", () => {
    const groups = groupQuickOpenFiles(NODES, {
      courseCode: "EENG527",
      parentId: "lectures",
    });

    expect(groups.folder.map((node) => node.id)).toEqual(["b2", "b10"]);
    expect(groups.course.map((node) => node.id)).toEqual(["sol"]);
    expect(groups.others.map((node) => node.id)).toEqual(["x"]);
  });

  it("puts everything in the rest with nothing being read", () => {
    const groups = groupQuickOpenFiles(NODES, null);

    expect(groups.folder).toEqual([]);
    expect(groups.course).toEqual([]);
    expect(groups.others.map((node) => node.id)).toEqual([
      "x",
      "sol",
      "b2",
      "b10",
    ]);
  });
});
