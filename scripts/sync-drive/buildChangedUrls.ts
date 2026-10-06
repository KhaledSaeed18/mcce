import { SITE_URL } from "../../src/config/site";
import type { DriveNode } from "../../src/lib/drive/types";
import { courseUrl } from "../../src/lib/seo/course-url";

/** Course folder (depth 1) and course page URLs touched by nodes first seen this sync. */
export function buildChangedUrls(
  nodes: DriveNode[],
  generatedAt: string
): string[] {
  const added = nodes.filter((node) => node.firstSeenAt === generatedAt);
  const folderIds = new Set(
    added.map((node) => node.pathIds[1]).filter((id): id is string => !!id)
  );
  const courseCodes = new Set(
    added
      .map((node) => node.courseCode)
      .filter((code): code is string => !!code)
  );

  if (folderIds.size === 0 && courseCodes.size === 0) {
    return [];
  }

  return [
    `${SITE_URL}/`,
    `${SITE_URL}/recent`,
    ...[...folderIds].map((id) => `${SITE_URL}/browse/${id}`),
    ...[...courseCodes].map(courseUrl),
  ];
}
