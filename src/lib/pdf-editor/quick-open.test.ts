import { describe, expect, it } from "vitest";
import { groupQuickOpenFiles } from "./quick-open";
import type { EditorTreeNode } from "./types";

function pdf(id: string, name: string, courseCode: string | null) {
  return {
    courseCode,
    id,
    kind: "pdf",
    materialType: "lecture",
    name,
    parentId: null,
  } satisfies EditorTreeNode;
}

const NODES: EditorTreeNode[] = [
  pdf("b10", "Lecture10.pdf", "EENG527"),
  pdf("x", "Final.pdf", "CENG566"),
  pdf("b2", "Lecture2.pdf", "EENG527"),
  { ...pdf("folder", "Lectures", "EENG527"), kind: "folder" },
];

describe("groupQuickOpenFiles", () => {
  it("puts the course being read first, in natural order, and leaves out folders", () => {
    const groups = groupQuickOpenFiles(NODES, "EENG527");

    expect(groups.course.map((node) => node.id)).toEqual(["b2", "b10"]);
    expect(groups.others.map((node) => node.id)).toEqual(["x"]);
  });

  it("puts everything in the rest with no course open", () => {
    const groups = groupQuickOpenFiles(NODES, null);

    expect(groups.course).toEqual([]);
    expect(groups.others.map((node) => node.id)).toEqual(["x", "b2", "b10"]);
  });
});
