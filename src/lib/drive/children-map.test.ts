import { describe, expect, it } from "vitest";
import { buildChildrenMap } from "./children-map";
import { makeNode } from "./test-fixtures";

describe("buildChildrenMap", () => {
  it("groups nodes by parentId", () => {
    const nodes = [
      makeNode({ id: "a", name: "A", parentId: "root" }),
      makeNode({ id: "b", name: "B", parentId: "root" }),
      makeNode({ id: "c", name: "C", parentId: "a" }),
    ];

    const map = buildChildrenMap(nodes);

    expect(map.get("root")?.map((node) => node.id)).toEqual(["a", "b"]);
    expect(map.get("a")?.map((node) => node.id)).toEqual(["c"]);
  });

  it("sorts folders before files, then alphabetically", () => {
    const nodes = [
      makeNode({
        id: "z-file",
        kind: "pdf",
        name: "Zebra.pdf",
        parentId: "root",
      }),
      makeNode({
        id: "a-folder",
        kind: "folder",
        name: "Apples",
        parentId: "root",
      }),
      makeNode({
        id: "a-file",
        kind: "pdf",
        name: "Aardvark.pdf",
        parentId: "root",
      }),
    ];

    const map = buildChildrenMap(nodes);

    expect(map.get("root")?.map((node) => node.id)).toEqual([
      "a-folder",
      "a-file",
      "z-file",
    ]);
  });

  it("skips nodes with no parentId", () => {
    const nodes = [makeNode({ id: "orphan", parentId: null })];

    const map = buildChildrenMap(nodes);

    expect(map.size).toBe(0);
  });
});
