import { PROGRAM_UNIVERSITY_SHORT, SITE_NAME } from "@/config/site";
import type { CurriculumCourseContext } from "@/lib/curriculum/types";
import {
  countMaterialFiles,
  countMaterialType,
  formatMaterialList,
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

/** Code, university, and program lead, since those are what a searcher types. */
function buildDescription(
  { course }: CurriculumCourseContext,
  groups: CourseMaterialGroup[]
): string {
  const kinds = formatMaterialList(groups);
  const exams = countMaterialType(groups, "exam");
  const examLead =
    exams > 0
      ? `${exams} past exams among ${countMaterialFiles(groups)} files, with `
      : "";
  const contents = kinds
    ? `${examLead}${kinds}, plus the course description and prerequisites`
    : "course description, credits, and prerequisites";

  return `${course.code} ${course.name} at ${PROGRAM_UNIVERSITY_SHORT}, part of the ${SITE_NAME} program: ${contents}.`;
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
          description: buildDescription(context, groups),
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
