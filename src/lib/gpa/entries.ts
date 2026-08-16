import type {
  CurriculumSemester,
  CurriculumTerm,
  CurriculumYear,
} from "@/lib/curriculum/types";
import type { GradeEntry } from "./types";

export type AverageMap = Record<string, number | null>;

const TERM_LABELS: Record<CurriculumTerm, string> = {
  fall: "Fall",
  spring: "Spring",
  summer: "Summer",
};

export interface GpaSemester {
  entries: GradeEntry[];
  id: string;
  label: string;
  /** Fits a chart axis, where the full label would need rotating. */
  shortLabel: string;
}

function toEntries(
  semester: CurriculumSemester,
  averages: AverageMap
): GradeEntry[] {
  return semester.courses.map((course) => ({
    average: averages[course.code] ?? null,
    code: course.code,
    credits: course.credits,
    id: course.code,
    name: course.name,
  }));
}

/** Flattens the curriculum into one grade-entry list per semester, in order. */
export function buildGpaSemesters(
  years: CurriculumYear[],
  averages: AverageMap
): GpaSemester[] {
  return years.flatMap((year) =>
    year.semesters.map((semester) => ({
      entries: toEntries(semester, averages),
      id: semester.id,
      label: `${year.label}, ${semester.label}`,
      shortLabel: `Y${year.year} ${TERM_LABELS[semester.term]}`,
    }))
  );
}

export function getAllEntries(semesters: GpaSemester[]): GradeEntry[] {
  return semesters.flatMap((semester) => semester.entries);
}
