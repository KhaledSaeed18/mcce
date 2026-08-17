import type { DriveIndex, DriveNode } from "../../src/lib/drive/types";
import type { CrawledNode } from "./crawl";

export interface FirstSeenResult {
  baselineAt: string;
  nodes: DriveNode[];
}

/**
 * Stamps each node with the run that first saw its id, carrying earlier stamps
 * forward. Computed against what the last sync saw rather than from Drive's own
 * modifiedTime, which moves when a file is re-uploaded in place and does not
 * move when one is shared into the folder from elsewhere.
 */
export function stampFirstSeen(
  nodes: CrawledNode[],
  previous: DriveIndex | null,
  generatedAt: string
): FirstSeenResult {
  if (!previous) {
    return {
      baselineAt: generatedAt,
      nodes: nodes.map((node) => ({ ...node, firstSeenAt: generatedAt })),
    };
  }

  // The index artifact is committed alongside the code that reads it, so a
  // previous index is always in the current shape.
  const { baselineAt } = previous.meta;
  const seenBefore = new Map(
    previous.nodes.map((node) => [node.id, node.firstSeenAt])
  );

  return {
    baselineAt,
    nodes: nodes.map((node) => ({
      ...node,
      firstSeenAt: seenBefore.get(node.id) ?? generatedAt,
    })),
  };
}
