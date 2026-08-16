import { useMemo } from "react";
import { CURRICULUM } from "@/config/curriculum";
import { MCCE_DEGREE_CREDITS } from "@/config/gpa";
import { getSemesterTotals } from "@/lib/gpa/calculate";
import {
  type AverageMap,
  buildGpaSemesters,
  getAllEntries,
} from "@/lib/gpa/entries";
import { project } from "@/lib/gpa/projection";
import { solveTarget } from "@/lib/gpa/target";

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

  const target = useMemo(
    () => solveTarget(cumulative, MCCE_DEGREE_CREDITS, targetGpa),
    [cumulative, targetGpa]
  );

  return { cumulative, projection, semesters, semesterTotals, target };
}
