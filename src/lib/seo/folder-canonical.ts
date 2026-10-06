import { CURRICULUM } from "@/config/curriculum";
import { flattenCourses } from "@/lib/curriculum/lookup";
import type { DriveNode } from "@/lib/drive/types";

const CURRICULUM_CODES = new Set(
  flattenCourses(CURRICULUM).map((course) => course.code)
);

/**
 * A course's top-level Drive folder lists the same files as its course page,
 * so the two compete for the same queries. The course page is the one worth
 * ranking, which makes it the canonical for the folder.
 */
export function findFolderCourseCode(node: DriveNode | null): string | null {
  if (!(node?.courseCode && node.kind === "folder" && node.depth === 1)) {
    return null;
  }

  return CURRICULUM_CODES.has(node.courseCode) ? node.courseCode : null;
}
