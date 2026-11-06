import { describe, expect, it } from "vitest";
import { selectFolderSlice } from "./folder-slice";
import type { DriveNode } from "./types";

function makeNode(id: string, parentId: string | null): DriveNode {
  return { id, parentId } as DriveNode;
}

describe("selectFolderSlice", () => {
  const nodes = [
    makeNode("root", null),
    makeNode("folder", "root"),
    makeNode("child", "folder"),
    makeNode("grandchild", "child"),
    makeNode("deep", "grandchild"),
    makeNode("sibling", "root"),
  ];

  it("keeps the folder and two levels below it", () => {
    const ids = selectFolderSlice(nodes, "folder").map((node) => node.id);

    expect(ids).toEqual(["folder", "child", "grandchild"]);
  });

  it("works for a source root that has no node of its own", () => {
    const ids = selectFolderSlice(nodes, "missing-root").map((node) => node.id);

    expect(ids).toEqual([]);
  });
});
