import type { CurriculumSemester, CurriculumYear } from "./types";

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
