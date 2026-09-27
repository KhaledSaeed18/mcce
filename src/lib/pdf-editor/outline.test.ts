import { describe, expect, it } from "vitest";
import { flattenOutline } from "./outline";
import type { OutlineNode } from "./types";

function node(title: string, dest: unknown, items: OutlineNode[] = []) {
  return { dest, items, title };
}

const resolveNumber = (dest: unknown) =>
  Promise.resolve(typeof dest === "number" ? dest : null);

describe("flattenOutline", () => {
  it("lists a tree top to bottom with how deep each entry sits", async () => {
    const outline = [
      node("Part 1", 0, [node("1.1", 1), node("1.2", 2, [node("1.2.1", 3)])]),
      node("Part 2", 4),
    ];

    const entries = await flattenOutline(outline, resolveNumber);

    expect(entries.map((entry) => [entry.title, entry.depth])).toEqual([
      ["Part 1", 0],
      ["1.1", 1],
      ["1.2", 1],
      ["1.2.1", 2],
      ["Part 2", 0],
    ]);
  });

  it("gives each entry the page it points at", async () => {
    const entries = await flattenOutline(
      [node("A", 3), node("B", "missing")],
      resolveNumber
    );

    expect(entries.map((entry) => entry.sourceIndex)).toEqual([3, null]);
  });

  it("gives each entry an id from its path through the tree", async () => {
    const entries = await flattenOutline(
      [node("A", 0, [node("A.1", 1)]), node("B", 2)],
      resolveNumber
    );

    expect(entries.map((entry) => entry.id)).toEqual(["0", "0.0", "1"]);
  });

  it("trims the space some files leave around titles", async () => {
    const [entry] = await flattenOutline(
      [node("  Intro \n", 0)],
      resolveNumber
    );

    expect(entry.title).toBe("Intro");
  });
});
