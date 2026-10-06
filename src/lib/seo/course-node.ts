import { PROGRAM_UNIVERSITY_SHORT } from "@/config/site";
import type { CurriculumCourse } from "@/lib/curriculum/types";
import { courseUrl } from "@/lib/seo/course-url";
import { UNIVERSITY_PROVIDER } from "@/lib/seo/provider";

/** Enough to identify the course anywhere it is listed, with its page as the url. */
export function buildCourseNode(course: CurriculumCourse) {
  return {
    "@type": "Course",
    alternateName: `${PROGRAM_UNIVERSITY_SHORT} ${course.code}`,
    courseCode: course.code,
    description: course.description ?? undefined,
    name: course.name,
    provider: UNIVERSITY_PROVIDER,
    url: courseUrl(course.code),
  };
}
