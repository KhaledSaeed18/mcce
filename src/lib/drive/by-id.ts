import type { DriveNode } from "./types";

/**
 * Resolves stored ids against the current index, in the order they were stored.
 * Ids that no longer resolve are dropped rather than shown: the sync that
 * removed a file is exactly when a stale bookmark would start lying.
 */
export function resolveNodeIds<T extends Pick<DriveNode, "id">>(
  nodes: T[],
  ids: string[]
): T[] {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const resolved: T[] = [];

  for (const id of ids) {
    const node = byId.get(id);
    if (node) {
      resolved.push(node);
    }
  }

  return resolved;
}
