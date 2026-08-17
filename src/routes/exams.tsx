import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { ExamCourseJump } from "@/components/exams/exam-course-jump";
import { ExamCourseSection } from "@/components/exams/exam-course-section";
import { SITE_URL } from "@/config/site";
import { buildExamGroups } from "@/lib/drive/exams";
import { driveIndexQueryOptions } from "@/lib/drive/queries";
import { buildPageMeta } from "@/lib/seo/meta";

const EXAMS_URL = `${SITE_URL}/exams`;
const EXAMS_DESCRIPTION =
  "Past midterms, finals, and assessments for the MCCE program, grouped by course and by the term they were sat.";

export const Route = createFileRoute("/exams")({
  component: ExamsPage,
  head: () => ({
    links: [{ href: EXAMS_URL, rel: "canonical" }],
    meta: buildPageMeta({
      description: EXAMS_DESCRIPTION,
      title: "Past exams · MCCE",
      url: EXAMS_URL,
    }),
  }),
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(driveIndexQueryOptions),
});

function ExamsPage() {
  const driveIndex = Route.useLoaderData();
  const groups = useMemo(
    () => buildExamGroups(driveIndex.nodes),
    [driveIndex.nodes]
  );
  const total = groups.reduce((sum, group) => sum + group.total, 0);

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 p-4 sm:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="font-head text-xl sm:text-2xl">Past exams</h1>
        <p className="text-muted-foreground text-sm">
          {total} papers across {groups.length} courses, newest term first.
          Papers whose name records no year are grouped at the end of each
          course.
        </p>
      </div>

      <ExamCourseJump groups={groups} />

      {groups.map((group) => (
        <ExamCourseSection group={group} key={group.code} />
      ))}
    </main>
  );
}
