import {
  GPA_SHARE_SEPARATOR,
  GPA_SHARE_UNGRADED,
  MAX_COURSE_AVERAGE,
} from "@/config/gpa";
import type { CurriculumCourse } from "@/lib/curriculum/types";
import type { AverageMap } from "../entries";

export interface SharedGrade {
  average: number;
  code: string;
  credits: number;
  name: string;
}

function readSlot(slot: string | undefined): number | null {
  if (slot === undefined || slot === "" || slot === GPA_SHARE_UNGRADED) {
    return null;
  }

  const average = Number(slot);
  const isInRange = average >= 0 && average <= MAX_COURSE_AVERAGE;

  return Number.isFinite(average) && isInRange ? average : null;
}

/**
 * A hand-edited or truncated link still yields whatever slots do parse, since
 * dropping the readable half of a shared plan helps nobody.
 */
export function decodeShareValue(
  value: string,
  courses: CurriculumCourse[]
): SharedGrade[] {
  const slots = value.split(GPA_SHARE_SEPARATOR);

  return courses.flatMap((course, index) => {
    const average = readSlot(slots[index]);

    return average === null
      ? []
      : [
          {
            average,
            code: course.code,
            credits: course.credits,
            name: course.name,
          },
        ];
  });
}

export function toAverageMap(grades: SharedGrade[]): AverageMap {
  return Object.fromEntries(grades.map((grade) => [grade.code, grade.average]));
}
