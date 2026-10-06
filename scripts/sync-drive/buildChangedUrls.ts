import { CURRICULUM } from "../../src/config/curriculum";
import { PAPER_MATERIAL_TYPES } from "../../src/config/materials";
import { SITE_URL } from "../../src/config/site";
import {
  buildCourseContextLookup,
  findCourseCode,
} from "../../src/lib/curriculum/lookup";
import type { DriveNode } from "../../src/lib/drive/types";
import { COURSES_URL, courseUrl } from "../../src/lib/seo/course-url";

const COURSE_LOOKUP = buildCourseContextLookup(CURRICULUM);

export function buildChangedUrls(
  nodes: DriveNode[],
  generatedAt: string
): string[] {
  const changedPages = new Set<string>();
  let hasCourseChanges = false;
  let hasNewPapers = false;

  for (const node of nodes) {
    if (node.firstSeenAt !== generatedAt) {
      continue;
    }
    const courseCode = findCourseCode(COURSE_LOOKUP, node.courseCode ?? "");
    const [, folderId] = node.pathIds;

    if (courseCode) {
      changedPages.add(courseUrl(courseCode));
      hasCourseChanges = true;
    } else if (folderId) {
      changedPages.add(`${SITE_URL}/browse/${folderId}`);
    }

    hasNewPapers ||=
      node.kind !== "folder" &&
      node.courseCode !== null &&
      PAPER_MATERIAL_TYPES.has(node.materialType);
  }

  if (changedPages.size === 0) {
    return [];
  }

  return [
    `${SITE_URL}/`,
    `${SITE_URL}/recent`,
    ...(hasCourseChanges ? [COURSES_URL] : []),
    ...(hasNewPapers ? [`${SITE_URL}/exams`] : []),
    ...changedPages,
  ];
}
