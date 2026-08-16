import { MAX_QUALITY_POINTS, MIN_PASSING_QUALITY_POINTS } from "@/config/gpa";
import { getAverageForQualityPoints } from "./scale";
import type { GpaTotals, TargetOutcome } from "./types";

/**
 * Works backwards from a target: the quality points the whole degree needs,
 * minus what is already earned, spread across the credits still to come. The
 * scale is continuous, so this resolves to a single course average rather than
 * a split across letter grades.
 */
export function solveTarget(
  cumulative: GpaTotals,
  degreeCredits: number,
  targetGpa: number
): TargetOutcome | null {
  const creditsRemaining = degreeCredits - cumulative.credits;

  if (creditsRemaining <= 0) {
    return null;
  }

  const requiredAverageQpt =
    (targetGpa * degreeCredits - cumulative.qualityPoints) / creditsRemaining;
  const requiredAverage = getAverageForQualityPoints(requiredAverageQpt);

  if (requiredAverageQpt > MAX_QUALITY_POINTS) {
    return { kind: "impossible", requiredAverage, requiredAverageQpt };
  }

  if (requiredAverageQpt <= MIN_PASSING_QUALITY_POINTS) {
    return { kind: "guaranteed", requiredAverage, requiredAverageQpt };
  }

  return { kind: "achievable", requiredAverage, requiredAverageQpt };
}
