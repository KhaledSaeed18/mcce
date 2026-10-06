import { CURRICULUM } from "../../src/config/curriculum";
import { CURRICULUM_LASTMOD } from "../../src/config/seo/sitemap";
import { flattenCourses } from "../../src/lib/curriculum/lookup";
import { courseUrl } from "../../src/lib/seo/course-url";
import { buildUrlEntry } from "./sitemapXml";

export function buildCourseEntries(courseDates: Map<string, string>): string[] {
  return flattenCourses(CURRICULUM).map((course) =>
    buildUrlEntry(
      courseUrl(course.code),
      courseDates.get(course.code) ?? CURRICULUM_LASTMOD,
      "weekly",
      "0.8"
    )
  );
}
