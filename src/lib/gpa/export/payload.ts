import { MCCE_DEGREE_CREDITS } from "@/config/gpa";
import { getSemesterTotals } from "@/lib/gpa/calculate";
import type { GpaTrendPoint } from "@/lib/gpa/chart";
import type { GpaSemester } from "@/lib/gpa/entries";
import { getQualityPoints } from "@/lib/gpa/scale";
import { getStanding } from "@/lib/gpa/standing";
import type { GpaTotals, Projection, TargetOutcome } from "@/lib/gpa/types";
import type { GpaExportPayload, GpaExportSemester } from "./types";

interface BuildPayloadInput {
  cumulative: GpaTotals;
  projection: Projection | null;
  semesters: GpaSemester[];
  target: TargetOutcome | null;
  targetGpa: number;
  trend: GpaTrendPoint[];
}

function toExportSemester(
  semester: GpaSemester,
  cumulativeGpa: number | null
): GpaExportSemester {
  const totals = getSemesterTotals(semester.entries);

  return {
    courses: semester.entries.map((entry) => ({
      average: entry.average,
      code: entry.code,
      credits: entry.credits,
      name: entry.name,
      qualityPoints:
        entry.average === null ? null : getQualityPoints(entry.average),
    })),
    credits: totals.credits,
    cumulativeGpa,
    gpa: totals.gpa,
    label: semester.label,
    qualityPoints: totals.qualityPoints,
  };
}

/** One serialisable snapshot every format renders from, so they cannot drift. */
export function buildExportPayload({
  cumulative,
  projection,
  semesters,
  target,
  targetGpa,
  trend,
}: BuildPayloadInput): GpaExportPayload {
  const cumulativeById = new Map(
    trend.map((point) => [point.id, point.cumulativeGpa])
  );

  return {
    cumulative,
    degreeCredits: MCCE_DEGREE_CREDITS,
    generatedAt: new Date().toISOString(),
    projection,
    semesters: semesters.map((semester) =>
      toExportSemester(semester, cumulativeById.get(semester.id) ?? null)
    ),
    standing:
      cumulative.gpa === null ? null : getStanding(cumulative.gpa).label,
    target,
    targetGpa,
    trend,
  };
}
