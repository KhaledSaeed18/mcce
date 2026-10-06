import { PROGRAM_NAME, SITE_NAME, SITE_URL } from "@/config/site";
import { flattenCourses } from "@/lib/curriculum/lookup";
import type {
  CurriculumCourseContext,
  CurriculumYear,
} from "@/lib/curriculum/types";
import { buildCourseNode } from "@/lib/seo/course-node";
import { courseUrl } from "@/lib/seo/course-url";
import { UNIVERSITY_PROVIDER } from "@/lib/seo/provider";

const PROGRAM_NODE = {
  "@type": "EducationalOccupationalProgram",
  alternateName: SITE_NAME,
  name: PROGRAM_NAME,
  provider: UNIVERSITY_PROVIDER,
  url: `${SITE_URL}/plan-of-study`,
};

function nonEmpty<T>(items: T[]): T[] | undefined {
  return items.length > 0 ? items : undefined;
}

export function buildCurriculumSchema(years: CurriculumYear[]) {
  const courses = flattenCourses(years);

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: courses.map((course, index) => ({
      "@type": "ListItem",
      item: buildCourseNode(course),
      position: index + 1,
    })),
    name: `${PROGRAM_NAME} plan of study`,
    numberOfItems: courses.length,
  };
}

export function buildCourseSchema(context: CurriculumCourseContext) {
  const { course, semester, year } = context;

  return {
    "@context": "https://schema.org",
    ...buildCourseNode(course),
    about: nonEmpty(
      (course.topics ?? []).map((topic) => ({ "@type": "Thing", name: topic }))
    ),
    coursePrerequisites: nonEmpty(
      course.prerequisites.map((code) => ({
        "@type": "Course",
        courseCode: code,
        url: courseUrl(code),
      }))
    ),
    educationalLevel: "Graduate",
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      name: `${year.label}, ${semester.label}`,
    },
    inLanguage: "en",
    isPartOf: PROGRAM_NODE,
    numberOfCredits: course.credits,
    teaches: nonEmpty(course.objectives),
  };
}
