import { compareNaturally } from "./natural-sort";
import type { DriveNode } from "./types";

type TreeNode = Pick<DriveNode, "kind" | "name" | "parentId">;

function compareNodes(a: TreeNode, b: TreeNode): number {
  if (a.kind === "folder" && b.kind !== "folder") {
    return -1;
  }
  if (a.kind !== "folder" && b.kind === "folder") {
    return 1;
  }
  return compareNaturally(a.name, b.name);
}

/** Groups nodes by parentId, folders before files, natural order within each group. */
export function buildChildrenMap<T extends TreeNode>(
  nodes: T[]
): Map<string, T[]> {
  const map = new Map<string, T[]>();

  for (const node of nodes) {
    if (!node.parentId) {
      continue;
    }
    const siblings = map.get(node.parentId) ?? [];
    siblings.push(node);
    map.set(node.parentId, siblings);
  }

  for (const siblings of map.values()) {
    siblings.sort(compareNodes);
  }

  return map;
}
