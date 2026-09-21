import { createFileRoute } from "@tanstack/react-router";
import { FilePreviewHost } from "@/components/drive/file-preview-host";
import { ExamCourseSection } from "@/components/exams/exam-course-section";
import { ExamsHero } from "@/components/exams/exams-hero";
import { SITE_URL } from "@/config/site";
import { examGroupsQueryOptions } from "@/lib/drive/queries";
import type { FilePreviewSearch } from "@/lib/drive/types";
import { readOptionalString } from "@/lib/search-params";
import { buildPageMeta } from "@/lib/seo/meta";

const EXAMS_URL = `${SITE_URL}/exams`;
const EXAMS_DESCRIPTION =
  "The open MCCE exam archive: past midterms, finals, and assessments for the LIU Computer and Communication Engineering program, grouped by course and term. The listing is open, no account required.";

export const Route = createFileRoute("/exams")({
  component: ExamsPage,
  head: () => ({
    links: [{ href: EXAMS_URL, rel: "canonical" }],
    meta: buildPageMeta({
      description: EXAMS_DESCRIPTION,
      title: "MCCE Exam Archive · Past Exams, Midterms and Finals",
      url: EXAMS_URL,
    }),
  }),
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(examGroupsQueryOptions),
  validateSearch: (search: Record<string, unknown>): FilePreviewSearch => ({
    file: readOptionalString(search.file),
  }),
});

function ExamsPage() {
  const groups = Route.useLoaderData();
  const previewNodes = groups.flatMap((group) =>
    group.terms.flatMap((term) => term.items)
  );

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-4 py-8 sm:p-6 sm:py-14">
      <ExamsHero groups={groups} />

      {groups.map((group) => (
        <ExamCourseSection group={group} key={group.code} />
      ))}

      <FilePreviewHost nodes={previewNodes} />
    </main>
  );
}
