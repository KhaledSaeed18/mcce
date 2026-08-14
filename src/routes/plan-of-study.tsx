import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { CurriculumCourseDialog } from "@/components/curriculum/curriculum-course-dialog";
import { CurriculumExport } from "@/components/curriculum/curriculum-export";
import { CurriculumHero } from "@/components/curriculum/curriculum-hero";
import { CurriculumNotes } from "@/components/curriculum/curriculum-notes";
import { CurriculumOverview } from "@/components/curriculum/curriculum-overview";
import { CurriculumRoadmap } from "@/components/curriculum/curriculum-roadmap";
import { CurriculumYearTabs } from "@/components/curriculum/curriculum-year-tabs";
import { JsonLd } from "@/components/seo/json-ld";
import { CURRICULUM } from "@/config/curriculum";
import { SITE_URL } from "@/config/site";
import { useCurriculumSelection } from "@/hooks/use-curriculum-selection";
import { getProgramCredits } from "@/lib/curriculum/credits";
import { buildCourseContextLookup } from "@/lib/curriculum/lookup";
import { buildCourseSummaryMap } from "@/lib/drive/courses";
import { driveIndexQueryOptions } from "@/lib/drive/queries";
import { buildCurriculumSchema } from "@/lib/seo/schema";

const PLAN_OF_STUDY_URL = `${SITE_URL}/plan-of-study`;
const courseLookup = buildCourseContextLookup(CURRICULUM);

export const Route = createFileRoute("/plan-of-study")({
  component: PlanOfStudyPage,
  head: () => ({
    links: [{ href: PLAN_OF_STUDY_URL, rel: "canonical" }],
    meta: [
      { title: "Plan of Study · MCCE" },
      {
        content: `The MCCE curriculum by year and semester: ${getProgramCredits(CURRICULUM)} credits so far, with descriptions, objectives, prerequisites, corequisites, and links to indexed materials.`,
        name: "description",
      },
    ],
  }),
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(driveIndexQueryOptions),
});

function PlanOfStudyPage() {
  const driveIndex = Route.useLoaderData();
  const { handleOpenChange, selectCourse, selectedCode } =
    useCurriculumSelection();

  const materialsMap = useMemo(
    () => buildCourseSummaryMap(driveIndex.nodes),
    [driveIndex.nodes]
  );

  const selectedContext = selectedCode
    ? courseLookup.get(selectedCode)
    : undefined;

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-4 py-8 sm:p-6 sm:py-14">
      <CurriculumHero />
      <CurriculumOverview years={CURRICULUM} />
      <CurriculumExport years={CURRICULUM} />
      <CurriculumRoadmap onSelectCourse={selectCourse} years={CURRICULUM} />
      <CurriculumYearTabs
        materialsMap={materialsMap}
        onSelectCourse={selectCourse}
        years={CURRICULUM}
      />

      <CurriculumNotes />

      {selectedContext ? (
        <CurriculumCourseDialog
          context={selectedContext}
          fileCount={materialsMap.get(selectedContext.course.code)?.fileCount}
          lookup={courseLookup}
          onOpenChange={handleOpenChange}
          onSelectRequirement={selectCourse}
          open={Boolean(selectedContext)}
        />
      ) : null}

      <JsonLd data={buildCurriculumSchema(CURRICULUM)} />
    </main>
  );
}
