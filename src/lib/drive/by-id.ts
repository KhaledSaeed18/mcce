import type { DriveNode } from "./types";

/**
 * Resolves stored ids against the current index, in the order they were stored.
 * Ids that no longer resolve are dropped rather than shown: the sync that
 * removed a file is exactly when a stale bookmark would start lying.
 */
export function resolveNodeIds(nodes: DriveNode[], ids: string[]): DriveNode[] {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const resolved: DriveNode[] = [];

  for (const id of ids) {
    const node = byId.get(id);
    if (node) {
      resolved.push(node);
    }
  }

  return resolved;
}
