import { getQualityPoints } from "./scale";
import type { GpaTotals, GradeEntry } from "./types";

export function toGpa(qualityPoints: number, credits: number): number | null {
  return credits > 0 ? qualityPoints / credits : null;
}

/**
 * Sums quality points before dividing, so a set of courses is never the plain
 * average of their GPAs. Rows without an average are still being filled in.
 */
export function getSemesterTotals(entries: GradeEntry[]): GpaTotals {
  let credits = 0;
  let qualityPoints = 0;

  for (const entry of entries) {
    if (entry.average === null) {
      continue;
    }
    credits += entry.credits;
    qualityPoints += getQualityPoints(entry.average) * entry.credits;
  }

  return { credits, gpa: toGpa(qualityPoints, credits), qualityPoints };
}
