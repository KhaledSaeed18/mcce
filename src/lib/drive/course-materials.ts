import { MATERIAL_TYPE_LABELS, MATERIAL_TYPES } from "@/config/materials";
import { compareNaturally } from "./natural-sort";
import type { CourseMaterialGroup, DriveNode } from "./types";

const COURSE_FOLDER_DEPTH = 1;

/**
 * A course's files regrouped by what they are for, in the configured order.
 * Folders are left out: the point of the page is to answer by material type
 * rather than to replay the Drive tree, which /browse already does.
 */
export function buildCourseMaterials(
  nodes: DriveNode[],
  courseCode: string
): CourseMaterialGroup[] {
  const byType = new Map<string, DriveNode[]>();

  for (const node of nodes) {
    if (node.kind === "folder" || node.courseCode !== courseCode) {
      continue;
    }
    const group = byType.get(node.materialType) ?? [];
    group.push(node);
    byType.set(node.materialType, group);
  }

  return MATERIAL_TYPES.filter((type) => byType.has(type)).map((type) => ({
    items: (byType.get(type) ?? []).sort((a, b) =>
      compareNaturally(a.name, b.name)
    ),
    label: MATERIAL_TYPE_LABELS[type],
    type,
  }));
}

/** The course's own Drive folder, for handing browsing back to /browse. */
export function findCourseFolderId(
  nodes: DriveNode[],
  courseCode: string
): string | null {
  const folder = nodes.find(
    (node) =>
      node.kind === "folder" &&
      node.depth === COURSE_FOLDER_DEPTH &&
      node.courseCode === courseCode
  );
  return folder?.id ?? null;
}
