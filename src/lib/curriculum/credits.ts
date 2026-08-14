import { flattenCourses } from "./lookup";
import type { CurriculumSemester, CurriculumYear } from "./types";

export interface ProgramFact {
  label: string;
  value: string;
}

export function getSemesterCredits(semester: CurriculumSemester): number {
  return semester.courses.reduce((total, course) => total + course.credits, 0);
}

export function getYearCredits(year: CurriculumYear): number {
  return year.semesters.reduce(
    (total, semester) => total + getSemesterCredits(semester),
    0
  );
}

export function getProgramCredits(years: CurriculumYear[]): number {
  return years.reduce((total, year) => total + getYearCredits(year), 0);
}

/** Years, credits, courses, and labs, for stat tiles on the plan-of-study page and homepage. */
export function getProgramFacts(years: CurriculumYear[]): ProgramFact[] {
  const courses = flattenCourses(years);
  const labCount = courses.filter((course) => course.kind === "lab").length;

  return [
    { label: "Years", value: String(years.length) },
    { label: "Credits", value: String(getProgramCredits(years)) },
    { label: "Courses", value: String(courses.length - labCount) },
    { label: "Labs", value: String(labCount) },
  ];
}
