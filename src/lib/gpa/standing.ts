import {
  GPA_DECIMAL_PLACES,
  GPA_STATUSES,
  GRADUATION_MIN_GPA,
  PROBATION_STATUS,
} from "@/config/gpa";
import type { AcademicStanding } from "./types";

/** GPA_STATUSES is ordered high to low, so the first match wins. */
export function getStanding(gpa: number): AcademicStanding {
  return GPA_STATUSES.find((entry) => gpa >= entry.minGpa) ?? PROBATION_STATUS;
}

export function canGraduate(gpa: number): boolean {
  return gpa >= GRADUATION_MIN_GPA;
}

/**
 * MyLIU truncates rather than rounds: a 2.725 semester shows as 2.72, not 2.73.
 */
export function formatGpa(gpa: number): string {
  const factor = 10 ** GPA_DECIMAL_PLACES;

  return (Math.trunc(gpa * factor) / factor).toFixed(GPA_DECIMAL_PLACES);
}
