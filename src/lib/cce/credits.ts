import { getCceCourse, getProgramCourseCodes } from "@/lib/cce/lookup";
import type { CcePlanSemester, CcePlanYear, CceProgram } from "@/lib/cce/types";

export function getCceSemesterCredits(semester: CcePlanSemester): number {
  return semester.entries.reduce((total, entry) => {
    if (entry.kind === "elective") {
      return total + entry.credits;
    }

    const course = getCceCourse(entry.code);

    if (!course) {
      return total;
    }

    return total + course.credits;
  }, 0);
}

export function getCceYearCredits(year: CcePlanYear): number {
  return year.semesters.reduce(
    (total, semester) => total + getCceSemesterCredits(semester),
    0
  );
}

export function getCcePlanCredits(plan: CcePlanYear[]): number {
  return plan.reduce((total, year) => total + getCceYearCredits(year), 0);
}

export function getCceCourseCount(program: CceProgram): number {
  return getProgramCourseCodes(program).length;
}
