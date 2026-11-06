import type { CourseMaterialGroup, MaterialType } from "./types";

const LIST_FORMAT = new Intl.ListFormat("en", {
  style: "long",
  type: "conjunction",
});

export function formatProseList(items: string[]): string {
  return LIST_FORMAT.format(items);
}

/**
 * The material kinds a course has, as prose ("lectures, exams, and labs").
 * "Other" says nothing about the course, so it never makes the list.
 */
export function formatMaterialList(
  groups: CourseMaterialGroup[]
): string | null {
  const labels = groups
    .filter((group) => group.type !== "other")
    .map((group) => group.label.toLowerCase());

  return labels.length > 0 ? formatProseList(labels) : null;
}

export function countMaterialFiles(groups: CourseMaterialGroup[]): number {
  return groups.reduce((total, group) => total + group.items.length, 0);
}

export function countMaterialType(
  groups: CourseMaterialGroup[],
  type: MaterialType
): number {
  return groups.find((group) => group.type === type)?.items.length ?? 0;
}
