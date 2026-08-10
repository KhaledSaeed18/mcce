import type { DriveNode, DriveNodeKind } from "./types";

export interface DriveFilters {
  courseCode?: string;
  kind?: DriveNodeKind;
  semester?: string;
  sourceId?: string;
}

export function filterNodes(
  nodes: DriveNode[],
  filters: DriveFilters
): DriveNode[] {
  return nodes.filter((node) => {
    if (filters.sourceId && node.sourceId !== filters.sourceId) {
      return false;
    }
    if (filters.semester && node.semester !== filters.semester) {
      return false;
    }
    if (filters.courseCode && node.courseCode !== filters.courseCode) {
      return false;
    }
    if (filters.kind && node.kind !== filters.kind) {
      return false;
    }
    return true;
  });
}
