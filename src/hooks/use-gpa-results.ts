import { useMemo } from "react";
import { CURRICULUM } from "@/config/curriculum";
import { MCCE_DEGREE_CREDITS } from "@/config/gpa";
import { getSemesterTotals } from "@/lib/gpa/calculate";
import { buildTrendPoints } from "@/lib/gpa/chart";
import { buildContributions } from "@/lib/gpa/contribution";
import {
  type AverageMap,
  buildGpaSemesters,
  getAllEntries,
} from "@/lib/gpa/entries";
import { project } from "@/lib/gpa/projection";
import { solveTarget } from "@/lib/gpa/target";

/** Every figure the page derives, passed to sections as one bundle. */
export type GpaResults = ReturnType<typeof useGpaResults>;

/** Derives every figure on the page from the entered averages. */
export function useGpaResults(averages: AverageMap, targetGpa: number) {
  const semesters = useMemo(
    () => buildGpaSemesters(CURRICULUM, averages),
    [averages]
  );

  const semesterTotals = useMemo(
    () => semesters.map((semester) => getSemesterTotals(semester.entries)),
    [semesters]
  );

  const cumulative = useMemo(
    () => getSemesterTotals(getAllEntries(semesters)),
    [semesters]
  );

  const projection = useMemo(
    () => project(cumulative, MCCE_DEGREE_CREDITS),
    [cumulative]
  );

  const trendPoints = useMemo(() => buildTrendPoints(semesters), [semesters]);

  const contributions = useMemo(
    () => buildContributions(getAllEntries(semesters), cumulative),
    [cumulative, semesters]
  );

  const target = useMemo(
    () => solveTarget(cumulative, MCCE_DEGREE_CREDITS, targetGpa),
    [cumulative, targetGpa]
  );

  return {
    contributions,
    cumulative,
    projection,
    semesters,
    semesterTotals,
    target,
    trendPoints,
  };
}
