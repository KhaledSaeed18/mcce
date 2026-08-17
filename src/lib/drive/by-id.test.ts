import { describe, expect, it } from "vitest";
import { resolveNodeIds } from "./by-id";
import { makeNode } from "./test-fixtures";

describe("resolveNodeIds", () => {
  const nodes = [makeNode({ id: "a" }), makeNode({ id: "b" })];

  it("keeps the stored order, not the index order", () => {
    expect(resolveNodeIds(nodes, ["b", "a"]).map((n) => n.id)).toEqual([
      "b",
      "a",
    ]);
  });

  it("drops ids the index no longer has", () => {
    expect(resolveNodeIds(nodes, ["a", "gone"]).map((n) => n.id)).toEqual([
      "a",
    ]);
  });

  it("returns nothing for an empty list", () => {
    expect(resolveNodeIds(nodes, [])).toEqual([]);
  });
});
