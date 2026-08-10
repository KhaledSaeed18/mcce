import type { DriveNode } from "./types";

/** Case-insensitive substring match over a node's name, breadcrumb path, and course code. */
export function searchNodes(nodes: DriveNode[], query: string): DriveNode[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return nodes;
  }

  return nodes.filter((node) => {
    const haystack = [node.name, ...node.pathNames, node.courseCode ?? ""]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalized);
  });
}
