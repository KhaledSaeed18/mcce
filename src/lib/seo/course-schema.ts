import { PROGRAM_NAME, PROGRAM_UNIVERSITY, SITE_URL } from "@/config/site";
import { flattenCourses } from "@/lib/curriculum/lookup";
import type {
  CurriculumCourseContext,
  CurriculumYear,
} from "@/lib/curriculum/types";
import { courseUrl } from "@/lib/seo/course-url";

export function buildCurriculumSchema(years: CurriculumYear[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: flattenCourses(years).map((course, index) => ({
      "@type": "Course",
      item: {
        "@type": "Course",
        courseCode: course.code,
        description: course.description ?? undefined,
        name: course.name,
        provider: {
          "@type": "CollegeOrUniversity",
          name: PROGRAM_UNIVERSITY,
        },
      },
      position: index + 1,
    })),
    name: `${PROGRAM_NAME} plan of study`,
  };
}

export function buildCourseSchema(context: CurriculumCourseContext) {
  const { course, semester, year } = context;

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    courseCode: course.code,
    description: course.description ?? undefined,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "onsite",
      name: `${year.label}, ${semester.label}`,
    },
    isPartOf: {
      "@type": "EducationalOccupationalProgram",
      name: PROGRAM_NAME,
      url: `${SITE_URL}/plan-of-study`,
    },
    name: course.name,
    provider: {
      "@type": "CollegeOrUniversity",
      name: PROGRAM_UNIVERSITY,
    },
    url: courseUrl(course.code),
  };
}
