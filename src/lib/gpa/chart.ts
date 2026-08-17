import { MAX_QUALITY_POINTS } from "@/config/gpa";
import { getSemesterTotals } from "./calculate";
import type { CourseContribution } from "./contribution";
import type { GpaSemester } from "./entries";
import type { GradeEntry } from "./types";

export interface GpaTrendPoint {
  credits: number;
  cumulativeGpa: number;
  id: string;
  label: string;
  semesterGpa: number;
}

/** Share of the 0 to 4 axis a GPA occupies, as a CSS percentage. */
export function toAxisPercent(gpa: number): number {
  return (gpa / MAX_QUALITY_POINTS) * 100;
}

/** The largest pull in either direction, which sets the contribution scale. */
export function getPeakContribution(
  contributions: CourseContribution[]
): number {
  return contributions.reduce(
    (peak, entry) => Math.max(peak, Math.abs(entry.contribution)),
    0
  );
}

/** Share of one side of a diverging axis a pull occupies, as a percentage. */
export function toContributionPercent(
  contribution: number,
  peak: number
): number {
  return peak === 0 ? 0 : (Math.abs(contribution) / peak) * 100;
}

/**
 * One point per graded semester, each carrying the cumulative GPA as it stood
 * after that semester. Semesters with nothing entered yet are left out rather
 * than plotted as zero, which would read as a failed term.
 */
export function buildTrendPoints(semesters: GpaSemester[]): GpaTrendPoint[] {
  const points: GpaTrendPoint[] = [];
  const graded: GradeEntry[] = [];

  for (const semester of semesters) {
    const totals = getSemesterTotals(semester.entries);

    if (totals.gpa === null) {
      continue;
    }

    graded.push(...semester.entries);
    const cumulative = getSemesterTotals(graded);

    points.push({
      credits: totals.credits,
      cumulativeGpa: cumulative.gpa ?? totals.gpa,
      id: semester.id,
      label: semester.shortLabel,
      semesterGpa: totals.gpa,
    });
  }

  return points;
}
