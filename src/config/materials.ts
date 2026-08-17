import type { MaterialType } from "@/lib/drive/types";

/** Filter order, most-used first, rather than alphabetical. */
export const MATERIAL_TYPES: MaterialType[] = [
  "lecture",
  "exam",
  "exercise",
  "assignment",
  "lab",
  "book",
  "other",
];

export const MATERIAL_TYPE_LABELS: Record<MaterialType, string> = {
  assignment: "Assignments",
  book: "Books",
  exam: "Exams",
  exercise: "Exercises",
  lab: "Labs",
  lecture: "Lectures",
  other: "Other",
};
