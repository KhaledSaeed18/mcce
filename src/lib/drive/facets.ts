import { MATERIAL_TYPE_LABELS, MATERIAL_TYPES } from "@/config/materials";
import type { DriveNode, FilterOption } from "./types";

export interface FacetOptions {
  courses: FilterOption[];
  kinds: FilterOption[];
  materialTypes: FilterOption[];
  semesters: FilterOption[];
}

/** Distinct filter values seen across a node set, ready to render as filter options. */
export function buildFacetOptions(nodes: DriveNode[]): FacetOptions {
  const semesters = new Set<string>();
  const courses = new Set<string>();
  const kinds = new Set<string>();
  const materialTypes = new Set<string>();

  for (const node of nodes) {
    if (node.semester) {
      semesters.add(node.semester);
    }
    if (node.courseCode) {
      courses.add(node.courseCode);
    }
    kinds.add(node.kind);
    materialTypes.add(node.materialType);
  }

  return {
    courses: toSortedOptions(courses),
    kinds: toSortedOptions(kinds),
    materialTypes: MATERIAL_TYPES.filter((type) => materialTypes.has(type)).map(
      (type) => ({ label: MATERIAL_TYPE_LABELS[type], value: type })
    ),
    semesters: toSortedOptions(semesters),
  };
}

function toSortedOptions(values: Set<string>): FilterOption[] {
  return [...values]
    .sort((a, b) => a.localeCompare(b))
    .map((value) => ({ label: value, value }));
}
