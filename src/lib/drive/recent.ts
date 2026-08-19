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

/** UTC day, matching the date-only stamp the UI renders for a batch. */
function toDayKey(iso: string): string {
  return iso.slice(0, 10);
}

/**
 * Files added since the index started tracking additions, newest day first.
 * Runs are merged per calendar day: several syncs can land on one date, and
 * splitting them would show the same date twice with partial counts.
 * Nodes still carrying the baseline stamp are excluded: that run saw everything
 * at once, so counting it as an addition would report the whole archive as new.
 */
export function buildRecentBatches(index: DriveIndex): RecentBatch[] {
  const byDay = new Map<string, DriveNode[]>();

  for (const node of index.nodes) {
    if (node.kind === "folder" || node.firstSeenAt === index.meta.baselineAt) {
      continue;
    }
    const day = toDayKey(node.firstSeenAt);
    const group = byDay.get(day) ?? [];
    group.push(node);
    byDay.set(day, group);
  }

  return [...byDay.entries()]
    .map(([day, items]) => ({
      addedAt: items.reduce(
        (latest, item) =>
          item.firstSeenAt > latest ? item.firstSeenAt : latest,
        items[0].firstSeenAt
      ),
      courses: toCourseGroups(items),
      day,
      total: items.length,
    }))
    .sort((a, b) => b.day.localeCompare(a.day));
}
