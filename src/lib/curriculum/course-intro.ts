import { COURSE_REQUIREMENT_CATEGORY_LABEL } from "@/config/courses";
import {
  PROGRAM_NAME,
  PROGRAM_UNIVERSITY,
  PROGRAM_UNIVERSITY_SHORT,
  SITE_NAME,
} from "@/config/site";
import {
  countMaterialFiles,
  formatMaterialList,
} from "@/lib/drive/material-list";
import type { CourseMaterialGroup } from "@/lib/drive/types";
import type { CurriculumCourseContext } from "./types";

function describeStanding({
  course,
  semester,
  year,
}: CurriculumCourseContext): string {
  const category =
    COURSE_REQUIREMENT_CATEGORY_LABEL[course.requirementCategory].toLowerCase();

  return `${course.code} ${course.name} is a ${course.credits}-credit ${category} in the ${PROGRAM_NAME} (${SITE_NAME}) at ${PROGRAM_UNIVERSITY} (${PROGRAM_UNIVERSITY_SHORT}), scheduled in the ${semester.label} of the ${year.label}.`;
}

function describeMaterials(groups: CourseMaterialGroup[]): string | null {
  const fileCount = countMaterialFiles(groups);
  const kinds = formatMaterialList(groups);

  if (fileCount === 0) {
    return null;
  }

  const files = `${fileCount} indexed ${fileCount === 1 ? "file" : "files"}`;
  return kinds
    ? `This page lists its ${files}, including ${kinds}.`
    : `This page lists its ${files}.`;
}

/**
 * The opening paragraph of a course page: one sentence that ties the code to
 * the program and university, so the page answers "what is ENGG515" on its own.
 */
export function buildCourseIntro(
  context: CurriculumCourseContext,
  groups: CourseMaterialGroup[]
): string {
  return [describeStanding(context), describeMaterials(groups)]
    .filter(Boolean)
    .join(" ");
}
