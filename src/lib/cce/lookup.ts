import { CCE_CATALOG } from "@/config/cce/catalog";
import type { CceCourse, CcePlanYear, CceProgram } from "@/lib/cce/types";

export function getCceCourse(code: string): CceCourse | undefined {
  return CCE_CATALOG[code];
}

/** Codes filled in by the published plan, leaving the elective slots out. */
export function getPlanCourseCodes(plan: CcePlanYear[]): string[] {
  return plan.flatMap((year) =>
    year.semesters.flatMap((semester) =>
      semester.entries.flatMap((entry) =>
        entry.kind === "course" ? [entry.code] : []
      )
    )
  );
}

/** Every course a student on this track sits, electives that always run included. */
export function getProgramCourseCodes(program: CceProgram): string[] {
  return [
    ...getPlanCourseCodes(program.plan),
    ...program.effectiveMajorElectiveCodes,
  ];
}

/** Codes across both tracks, ordered, for the catalog section and the schema. */
export function getCatalogCodes(programs: CceProgram[]): string[] {
  const codes = new Set(programs.flatMap(getProgramCourseCodes));
  return [...codes].sort();
}
