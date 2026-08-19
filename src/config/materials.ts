import type { MaterialType } from "@/lib/drive/types";

/** Filter order, most-used first, rather than alphabetical. */
export const MATERIAL_TYPES: MaterialType[] = [
  "lecture",
  "exam",
  "assessment",
  "exercise",
  "assignment",
  "lab",
  "book",
  "other",
];

/**
 * The types that describe a sat paper. These are what the exams page collects
 * and the only ones whose file names are worth reading a term out of.
 */
export const PAPER_MATERIAL_TYPES: ReadonlySet<MaterialType> = new Set([
  "assessment",
  "exam",
]);

export const MATERIAL_TYPE_LABELS: Record<MaterialType, string> = {
  assessment: "Assessments",
  assignment: "Assignments",
  book: "Books",
  exam: "Exams",
  exercise: "Exercises",
  lab: "Labs",
  lecture: "Lectures",
  other: "Other",
};
