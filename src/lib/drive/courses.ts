import type { LucideIcon } from "lucide-react";
import {
  COURSE_ICON_BY_CODE,
  COURSE_ICON_KEYWORDS,
  DEFAULT_COURSE_ICON,
} from "@/config/courses";
import type { CourseSummary, DriveNode } from "./types";

/** Exact code match, then keyword match against the name, then a generic fallback. */
export function getCourseIcon(code: string, name: string): LucideIcon {
  const exact = COURSE_ICON_BY_CODE[code];
  if (exact) {
    return exact;
  }

  const keywordMatch = COURSE_ICON_KEYWORDS.find(({ pattern }) =>
    pattern.test(name)
  );
  return keywordMatch?.icon ?? DEFAULT_COURSE_ICON;
}

/** One summary per distinct course code, ranked by file count descending. */
export function buildCourseSummaries(nodes: DriveNode[]): CourseSummary[] {
  const byCode = new Map<string, CourseSummary>();

  for (const node of nodes) {
    if (!(node.courseCode && node.courseName)) {
      continue;
    }

    const existing = byCode.get(node.courseCode) ?? {
      code: node.courseCode,
      fileCount: 0,
      folderCount: 0,
      name: node.courseName,
      semester: node.semester,
      sourceId: node.sourceId,
    };

    if (node.kind === "folder") {
      existing.folderCount += 1;
    } else {
      existing.fileCount += 1;
    }

    byCode.set(node.courseCode, existing);
  }

  return [...byCode.values()].sort((a, b) => b.fileCount - a.fileCount);
}

/** Course code to its Drive summary, for cross-referencing curriculum courses against indexed materials. */
export function buildCourseSummaryMap(
  nodes: DriveNode[]
): Map<string, CourseSummary> {
  return new Map(
    buildCourseSummaries(nodes).map((summary) => [summary.code, summary])
  );
}
