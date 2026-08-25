import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { CourseIndexHero } from "@/components/course/course-index-hero";
import { CourseIndexYear } from "@/components/course/course-index-year";
import { JsonLd } from "@/components/seo/json-ld";
import { CURRICULUM } from "@/config/curriculum";
import { SITE_URL } from "@/config/site";
import { getProgramCredits } from "@/lib/curriculum/credits";
import { flattenCourses } from "@/lib/curriculum/lookup";
import { buildCourseSummaryMap } from "@/lib/drive/courses";
import { driveIndexQueryOptions } from "@/lib/drive/queries";
import { buildPageMeta } from "@/lib/seo/meta";
import { buildCurriculumSchema } from "@/lib/seo/schema";

const COURSES_URL = `${SITE_URL}/course`;
const COURSE_COUNT = flattenCourses(CURRICULUM).length;

export const Route = createFileRoute("/course/")({
  component: CourseIndexPage,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(driveIndexQueryOptions),
  head: () => ({
    links: [{ href: COURSES_URL, rel: "canonical" }],
    meta: buildPageMeta({
      description: `Every course in the MCCE program: ${COURSE_COUNT} courses across ${getProgramCredits(CURRICULUM)} credits, each with its description, prerequisites, and indexed material.`,
      title: "Courses · MCCE",
      url: COURSES_URL,
    }),
  }),
});

function CourseIndexPage() {
  const driveIndex = Route.useLoaderData();
  const materialsMap = useMemo(
    () => buildCourseSummaryMap(driveIndex.nodes),
    [driveIndex.nodes]
  );

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-4 py-8 sm:p-6 sm:py-14">
      <CourseIndexHero />

      {CURRICULUM.map((year) => (
        <CourseIndexYear
          key={year.id}
          materialsMap={materialsMap}
          year={year}
        />
      ))}

      <JsonLd data={buildCurriculumSchema(CURRICULUM)} />
    </main>
  );
}
