import type {
  CurriculumCourse,
  CurriculumCourseContext,
  CurriculumYear,
} from "./types";

/** Every course across every year and semester, in curriculum order. */
export function flattenCourses(years: CurriculumYear[]): CurriculumCourse[] {
  return years.flatMap((year) =>
    year.semesters.flatMap((semester) => semester.courses)
  );
}

/** Course code to full year/semester context, for resolving requirement badges and dialog subtitles. */
export function buildCourseContextLookup(
  years: CurriculumYear[]
): Map<string, CurriculumCourseContext> {
  const lookup = new Map<string, CurriculumCourseContext>();

  for (const year of years) {
    for (const semester of year.semesters) {
      for (const course of semester.courses) {
        lookup.set(course.code, { course, semester, year });
      }
    }
  }

  return lookup;
}

/** The curriculum spelling of a course code typed in any case, or null when the curriculum does not list it. */
export function findCourseCode(
  lookup: Map<string, CurriculumCourseContext>,
  code: string
): string | null {
  const normalized = code.toUpperCase();
  return lookup.has(normalized) ? normalized : null;
}
