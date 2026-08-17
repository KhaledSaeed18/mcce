import { getQualityPoints } from "./scale";
import type { GpaTotals, GradeEntry } from "./types";

export interface CourseContribution {
  code: string;
  /** GPA points this course adds to, or takes off, the cumulative figure. */
  contribution: number;
  credits: number;
  name: string;
  qualityPoints: number;
}

function toContribution(
  entry: GradeEntry,
  average: number,
  cumulative: GpaTotals & { gpa: number }
): CourseContribution {
  const qualityPoints = getQualityPoints(average);

  return {
    code: entry.code,
    contribution:
      (entry.credits * (qualityPoints - cumulative.gpa)) / cumulative.credits,
    credits: entry.credits,
    name: entry.name,
    qualityPoints,
  };
}

/**
 * Each course pulls the cumulative GPA by its distance from it, weighted by its
 * share of the graded credits, so the pulls sum to zero by construction. The
 * chart then reads as one number split up rather than a set of loose bars.
 *
 * Sorted by pull rather than curriculum order, since the outliers are the point.
 */
export function buildContributions(
  entries: GradeEntry[],
  cumulative: GpaTotals
): CourseContribution[] {
  const { gpa } = cumulative;

  if (gpa === null || cumulative.credits === 0) {
    return [];
  }

  return entries
    .flatMap((entry) =>
      entry.average === null
        ? []
        : [toContribution(entry, entry.average, { ...cumulative, gpa })]
    )
    .sort((first, second) => second.contribution - first.contribution);
}
