import { MAX_QUALITY_POINTS, MIN_PASSING_QUALITY_POINTS } from "@/config/gpa";
import type { GpaTotals, Projection } from "./types";

function projectWith(
  cumulative: GpaTotals,
  creditsRemaining: number,
  assumedQpt: number
): number {
  const qualityPoints =
    cumulative.qualityPoints + assumedQpt * creditsRemaining;

  return qualityPoints / (cumulative.credits + creditsRemaining);
}

/**
 * Graded credits are locked in, so the best case is a real ceiling below 4.0
 * rather than a promise that any GPA is still reachable.
 */
export function project(
  cumulative: GpaTotals,
  degreeCredits: number
): Projection | null {
  const creditsRemaining = degreeCredits - cumulative.credits;

  if (creditsRemaining <= 0) {
    return null;
  }

  return {
    bestCase: projectWith(cumulative, creditsRemaining, MAX_QUALITY_POINTS),
    creditsRemaining,
    worstCasePassing: projectWith(
      cumulative,
      creditsRemaining,
      MIN_PASSING_QUALITY_POINTS
    ),
  };
}
