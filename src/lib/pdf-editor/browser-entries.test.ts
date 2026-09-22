import { describe, expect, it } from "vitest";
import { DRIVE_SOURCES } from "@/config/sources";
import { buildCrumbs, ROOT_CRUMB } from "./browser-entries";
import type { EditorTreeNode } from "./types";

const [SOURCE] = DRIVE_SOURCES;
const SOURCE_CRUMB = { id: SOURCE.rootFolderId, name: SOURCE.label };

const TREE: EditorTreeNode[] = [
  {
    id: "semester",
    kind: "folder",
    name: "Fall",
    parentId: SOURCE.rootFolderId,
  },
  { id: "course", kind: "folder", name: "CENG566", parentId: "semester" },
  { id: "lectures", kind: "folder", name: "Lectures", parentId: "course" },
];

describe("buildCrumbs", () => {
  it("returns only the root crumb with no folder open", () => {
    expect(buildCrumbs(TREE, null)).toEqual([ROOT_CRUMB]);
  });

  it("names a source root, which is not itself a node", () => {
    expect(buildCrumbs(TREE, SOURCE.rootFolderId)).toEqual([
      ROOT_CRUMB,
      SOURCE_CRUMB,
    ]);
  });

  it("walks up through every parent to the source", () => {
    expect(buildCrumbs(TREE, "lectures")).toEqual([
      ROOT_CRUMB,
      SOURCE_CRUMB,
      { id: "semester", name: "Fall" },
      { id: "course", name: "CENG566" },
      { id: "lectures", name: "Lectures" },
    ]);
  });

  it("falls back to the root crumb for an unknown folder", () => {
    expect(buildCrumbs(TREE, "missing")).toEqual([ROOT_CRUMB]);
  });
});
