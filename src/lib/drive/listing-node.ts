import type { CourseMaterialGroup, DriveNode, RecentBatch } from "./types";

/**
 * What a file card and its preview read. Folder paths are only shown in search
 * results, which use the full index, and they made up much of a listing page's HTML.
 */
export function toListingNode(node: DriveNode): DriveNode {
  return {
    categoryPath: [],
    courseCode: node.courseCode,
    courseName: node.courseName,
    depth: node.depth,
    extension: node.extension,
    firstSeenAt: node.firstSeenAt,
    id: node.id,
    kind: node.kind,
    materialType: node.materialType,
    mimeType: node.mimeType,
    modifiedTime: node.modifiedTime,
    name: node.name,
    parentId: node.parentId,
    pathIds: [],
    pathNames: [],
    semester: node.semester,
    sizeBytes: node.sizeBytes,
    sourceId: node.sourceId,
    termLabel: node.termLabel,
    webViewLink: node.webViewLink,
  };
}

export function toListingGroups(
  groups: CourseMaterialGroup[]
): CourseMaterialGroup[] {
  return groups.map((group) => ({
    ...group,
    items: group.items.map(toListingNode),
  }));
}

export function toListingBatches(batches: RecentBatch[]): RecentBatch[] {
  return batches.map((batch) => ({
    ...batch,
    courses: batch.courses.map((course) => ({
      ...course,
      items: course.items.map(toListingNode),
    })),
  }));
}
