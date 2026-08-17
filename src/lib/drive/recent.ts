import { compareNaturally } from "./natural-sort";
import type {
  DriveIndex,
  DriveNode,
  RecentBatch,
  RecentCourseGroup,
} from "./types";

const UNGROUPED_LABEL = "Program files";

function toCourseGroups(items: DriveNode[]): RecentCourseGroup[] {
  const byCourse = new Map<string, DriveNode[]>();

  for (const item of items) {
    const label = item.courseCode ?? UNGROUPED_LABEL;
    const group = byCourse.get(label) ?? [];
    group.push(item);
    byCourse.set(label, group);
  }

  return [...byCourse.entries()]
    .map(([code, group]) => ({
      code,
      items: group.sort((a, b) => compareNaturally(a.name, b.name)),
      name: group[0].courseName,
    }))
    .sort((a, b) => compareNaturally(a.code, b.code));
}

/**
 * Files added since the index started tracking additions, newest sync first.
 * Nodes still carrying the baseline stamp are excluded: that run saw everything
 * at once, so counting it as an addition would report the whole archive as new.
 */
export function buildRecentBatches(index: DriveIndex): RecentBatch[] {
  const byRun = new Map<string, DriveNode[]>();

  for (const node of index.nodes) {
    if (node.kind === "folder" || node.firstSeenAt === index.meta.baselineAt) {
      continue;
    }
    const group = byRun.get(node.firstSeenAt) ?? [];
    group.push(node);
    byRun.set(node.firstSeenAt, group);
  }

  return [...byRun.entries()]
    .map(([addedAt, items]) => ({
      addedAt,
      courses: toCourseGroups(items),
      total: items.length,
    }))
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt));
}
