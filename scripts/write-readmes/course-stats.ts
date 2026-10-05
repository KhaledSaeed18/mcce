import { TERM_RANK, UNRECORDED_TERM_LABEL } from "../../src/config/exams";
import type { DriveNode } from "../../src/lib/drive/types";

export interface CourseStats {
  assessments: number;
  bytes: number;
  count: number;
  exams: number;
  solutions: number;
  /** Exam and assessment files per term label, newest first, unrecorded last. */
  terms: [label: string, count: number][];
  videos: number;
}

const SOLUTION_MARKER = /\[solution\]/i;
const ACADEMIC_YEAR = /(\d{4})-\d{4}/;

function termKey(label: string): [number, number] {
  const year = Number(label.match(ACADEMIC_YEAR)?.[1] ?? 0);
  return [year, TERM_RANK[label.split(" ")[0]] ?? 0];
}

export function compareTerms(a: string, b: string): number {
  if (a === UNRECORDED_TERM_LABEL || b === UNRECORDED_TERM_LABEL) {
    return (
      Number(a === UNRECORDED_TERM_LABEL) - Number(b === UNRECORDED_TERM_LABEL)
    );
  }
  const [yearA, rankA] = termKey(a);
  const [yearB, rankB] = termKey(b);
  return yearB - yearA || rankB - rankA || a.localeCompare(b);
}

function countTerms(files: DriveNode[]): CourseStats["terms"] {
  const counts = new Map<string, number>();
  for (const file of files) {
    if (file.materialType === "exam" || file.materialType === "assessment") {
      const label = file.termLabel ?? UNRECORDED_TERM_LABEL;
      counts.set(label, (counts.get(label) ?? 0) + 1);
    }
  }
  return [...counts.entries()].sort(([a], [b]) => compareTerms(a, b));
}

export function computeCourseStats(files: DriveNode[]): CourseStats {
  const exams = files.filter((file) => file.materialType === "exam");
  return {
    assessments: files.filter((file) => file.materialType === "assessment")
      .length,
    bytes: files.reduce((sum, file) => sum + (file.sizeBytes ?? 0), 0),
    count: files.length,
    exams: exams.length,
    solutions: exams.filter((file) => SOLUTION_MARKER.test(file.name)).length,
    terms: countTerms(files),
    videos: files.filter((file) => file.kind === "video").length,
  };
}
