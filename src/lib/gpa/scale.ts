import {
  MAX_QUALITY_POINTS,
  PASSING_AVERAGE,
  QPT_AVERAGE_DIVISOR,
  QPT_AVERAGE_OFFSET,
} from "@/config/gpa";

/** Quality points rise linearly with the average, then flatten at 4.0. */
export function getQualityPoints(average: number): number {
  if (average < PASSING_AVERAGE) {
    return 0;
  }

  return Math.min(
    (average - QPT_AVERAGE_OFFSET) / QPT_AVERAGE_DIVISOR,
    MAX_QUALITY_POINTS
  );
}

/** The course average that earns a given quality-point value. */
export function getAverageForQualityPoints(qualityPoints: number): number {
  return qualityPoints * QPT_AVERAGE_DIVISOR + QPT_AVERAGE_OFFSET;
}

export function isPassing(average: number): boolean {
  return average >= PASSING_AVERAGE;
}
