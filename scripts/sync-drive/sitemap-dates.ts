import type { DriveIndex, DriveNode } from "../../src/lib/drive/types";

/** Drive stamps every node in the same RFC 3339 UTC shape, so plain string
 * comparison orders them correctly without parsing a Date. */
function newer(a: string, b: string): string {
  return a > b ? a : b;
}

function toIsoDate(timestamp: string): string {
  return timestamp.slice(0, 10);
}

/**
 * The newest modification time anywhere in the index. Pages that exist to list
 * Drive content change exactly when this does, so it stands in for their
 * lastmod. Falls back to the baseline run when the index holds no nodes.
 */
export function getIndexDate(index: DriveIndex): string {
  let newest = index.meta.baselineAt;

  for (const node of index.nodes) {
    newest = newer(newest, node.modifiedTime);
  }

  return toIsoDate(newest);
}

/** Newest modification date per course code, for the courses that have material. */
export function buildCourseDateMap(nodes: DriveNode[]): Map<string, string> {
  const byCode = new Map<string, string>();

  for (const node of nodes) {
    if (!node.courseCode) {
      continue;
    }

    const current = byCode.get(node.courseCode);
    byCode.set(
      node.courseCode,
      current ? newer(current, node.modifiedTime) : node.modifiedTime
    );
  }

  return new Map(
    [...byCode].map(([code, timestamp]) => [code, toIsoDate(timestamp)])
  );
}
