import { SITE_URL } from "@/config/site";
import type { CurriculumCourseContext } from "@/lib/curriculum/types";
import { buildPageMeta } from "@/lib/seo/meta";

function buildDescription(context: CurriculumCourseContext): string {
  const { course, semester, year } = context;

  if (course.description) {
    return `${course.code}, ${course.name}. ${course.description}`;
  }

  return `${course.code}, ${course.name}. ${course.credits} credits, ${year.label}, ${semester.label}. Lectures, exams, exercises, and labs indexed from the program Drive.`;
}

/** Head tags for a course page, which has to cover codes the curriculum does not list. */
export function buildCourseHead(
  context: CurriculumCourseContext | undefined,
  code: string,
  isPreview = false
) {
  const url = `${SITE_URL}/course/${code}`;
  const previewRobots = isPreview ? "noindex, follow" : undefined;

  return {
    links: [{ href: url, rel: "canonical" }],
    meta: context
      ? buildPageMeta({
          description: buildDescription(context),
          robots: previewRobots,
          title: `${context.course.code}, ${context.course.name} · MCCE`,
          url,
        })
      : buildPageMeta({
          description: "This course is not part of the MCCE plan of study.",
          robots: "noindex, follow",
          title: "Course not found · MCCE",
          url,
        }),
  };
}
