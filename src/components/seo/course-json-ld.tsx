import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/config/site";
import type { CourseFaqEntry } from "@/lib/curriculum/course-faq";
import type { CurriculumCourseContext } from "@/lib/curriculum/types";
import { buildCourseSchema } from "@/lib/seo/course-schema";
import { COURSES_URL, courseUrl } from "@/lib/seo/course-url";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo/schema";

interface CourseJsonLdProps {
  context: CurriculumCourseContext;
  faq: CourseFaqEntry[];
}

export function CourseJsonLd({ context, faq }: CourseJsonLdProps) {
  const { course } = context;

  return (
    <>
      <JsonLd data={buildCourseSchema(context)} />
      <JsonLd data={buildFaqSchema(faq)} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "All courses", url: COURSES_URL },
          {
            name: `${course.code} ${course.name}`,
            url: courseUrl(course.code),
          },
        ])}
      />
    </>
  );
}
