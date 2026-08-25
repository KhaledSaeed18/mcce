import { CourseGridMark } from "@/components/course/course-grid-mark";
import { PageHero } from "@/components/marketing/page-hero";
import { PageHeroMotion } from "@/components/marketing/page-hero-motion";
import { CURRICULUM } from "@/config/curriculum";
import { getProgramCredits } from "@/lib/curriculum/credits";
import { flattenCourses } from "@/lib/curriculum/lookup";

const COURSE_COUNT = flattenCourses(CURRICULUM).length;

export function CourseIndexHero() {
  return (
    <PageHero
      badge="COURSES"
      decoration={
        <PageHeroMotion width="w-32">
          <CourseGridMark />
        </PageHeroMotion>
      }
      description={`${COURSE_COUNT} courses across ${getProgramCredits(CURRICULUM)} credits. Each one carries its description, prerequisites, and whatever material has reached the Drive.`}
      highlight="course by course."
      title="The whole program,"
    />
  );
}
