import { PROGRAM_UNIVERSITY_SHORT, SITE_BRAND, SITE_NAME } from "@/config/site";
import type { CurriculumCourseContext } from "@/lib/curriculum/types";
import { formatMaterialList } from "@/lib/drive/material-list";
import type { CourseMaterialGroup } from "@/lib/drive/types";
import { courseUrl } from "@/lib/seo/course-url";
import { buildPageMeta } from "@/lib/seo/meta";
import { formatPageTitle } from "@/lib/seo/page-title";

/** Code, university, and program lead, since those are what a searcher types. */
function buildDescription(
  { course }: CurriculumCourseContext,
  groups: CourseMaterialGroup[]
): string {
  const kinds = formatMaterialList(groups);
  const contents = kinds
    ? `${kinds}, plus the course description and prerequisites`
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
            `${context.course.code}: ${context.course.name}`,
            SITE_BRAND
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
