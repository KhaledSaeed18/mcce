import type { CourseSummary, DriveNode } from "./types";

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
