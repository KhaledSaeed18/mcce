import { PROGRAM_UNIVERSITY_SHORT, SITE_NAME } from "@/config/site";
import type { CurriculumCourseContext } from "@/lib/curriculum/types";
import {
  countMaterialFiles,
  countMaterialType,
} from "@/lib/drive/material-list";
import type { CourseMaterialGroup } from "@/lib/drive/types";
import { courseUrl } from "@/lib/seo/course-url";
import { buildPageMeta } from "@/lib/seo/meta";
import { formatPageTitle } from "@/lib/seo/page-title";

/** Past exams are what students search a course code for, so the title says so when they exist. */
function buildTitleTopic(groups: CourseMaterialGroup[]): string {
  if (countMaterialType(groups, "exam") > 0) {
    return `${PROGRAM_UNIVERSITY_SHORT} Past Exams`;
  }
  return countMaterialFiles(groups) > 0
    ? `${PROGRAM_UNIVERSITY_SHORT} Course Files`
    : `${PROGRAM_UNIVERSITY_SHORT} Course Overview`;
}

/** Search engines cut descriptions near 160 characters, so this leads with what students want. */
export function buildCourseDescription(
  { course }: CurriculumCourseContext,
  groups: CourseMaterialGroup[]
): string {
  const lead = `${course.code} ${course.name} at ${PROGRAM_UNIVERSITY_SHORT}`;
  const files = countMaterialFiles(groups);
  const exams = countMaterialType(groups, "exam");

  if (exams > 0) {
    return `${lead}: ${exams} past exams among ${files} ${SITE_NAME} course files, plus topics and prerequisites.`;
  }
  return files > 0
    ? `${lead}: ${files} ${SITE_NAME} course files, plus topics and prerequisites.`
    : `${lead}, part of the ${SITE_NAME} program: course description, credits, and prerequisites.`;
}

/** Head tags for a course page, which has to cover codes the curriculum does not list. */
export function buildCourseHead(
  context: CurriculumCourseContext | undefined,
  code: string,
  groups: CourseMaterialGroup[],
  isPreview = false
) {
  const url = courseUrl(code);
  const previewRobots = isPreview ? "noindex, follow" : undefined;

  return {
    links: [{ href: url, rel: "canonical" }],
    meta: context
      ? buildPageMeta({
          description: buildCourseDescription(context, groups),
          robots: previewRobots,
          title: formatPageTitle(
            `${context.course.code} ${context.course.name}`,
            buildTitleTopic(groups)
          ),
          url,
        })
      : buildPageMeta({
          description: "This course is not part of the MCCE plan of study.",
          robots: "noindex, follow",
          title: formatPageTitle("Course not found", SITE_NAME),
          url,
        }),
  };
}
