import { CURRICULUM } from "../../src/config/curriculum";
import { COURSE_CONTENT_LASTMOD } from "../../src/config/seo/sitemap";
import { flattenCourses } from "../../src/lib/curriculum/lookup";
import { courseUrl } from "../../src/lib/seo/course-url";
import { latestDate } from "../../src/lib/seo/latestDate";
import { buildUrlEntry } from "./sitemapXml";

export function buildCourseEntries(courseDates: Map<string, string>): string[] {
  return flattenCourses(CURRICULUM).map((course) =>
    buildUrlEntry(
      courseUrl(course.code),
      latestDate(courseDates.get(course.code) ?? "", COURSE_CONTENT_LASTMOD),
      "weekly",
      "0.8"
    )
  );
}
