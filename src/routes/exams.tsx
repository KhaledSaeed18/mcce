import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { FilePreviewHost } from "@/components/drive/file-preview-host";
import { ExamCourseSection } from "@/components/exams/exam-course-section";
import { ExamsHero } from "@/components/exams/exams-hero";
import { SITE_URL } from "@/config/site";
import { buildExamGroups } from "@/lib/drive/exams";
import { driveIndexQueryOptions } from "@/lib/drive/queries";
import type { FilePreviewSearch } from "@/lib/drive/types";
import { readOptionalString } from "@/lib/search-params";
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
  validateSearch: (search: Record<string, unknown>): FilePreviewSearch => ({
    file: readOptionalString(search.file),
  }),
});

function ExamsPage() {
  const driveIndex = Route.useLoaderData();
  const groups = useMemo(
    () => buildExamGroups(driveIndex.nodes),
    [driveIndex.nodes]
  );
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-4 py-8 sm:p-6 sm:py-14">
      <ExamsHero groups={groups} />

      {groups.map((group) => (
        <ExamCourseSection group={group} key={group.code} />
      ))}

      <FilePreviewHost nodes={driveIndex.nodes} />
    </main>
  );
}
