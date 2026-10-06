import { createFileRoute } from "@tanstack/react-router";
import { CourseHeader } from "@/components/course/course-header";
import { CourseMaterials } from "@/components/course/course-materials";
import { CourseNotFound } from "@/components/course/course-not-found";
import { CourseQuickLinks } from "@/components/course/course-quick-links";
import { CourseRequirements } from "@/components/course/course-requirements";
import { CourseTopics } from "@/components/course/course-topics";
import { FilePreviewHost } from "@/components/drive/file-preview-host";
import { CourseJsonLd } from "@/components/seo/course-json-ld";
import { CURRICULUM } from "@/config/curriculum";
import { redirectToCanonicalCourse } from "@/lib/curriculum/canonical-course";
import { buildCourseIntro } from "@/lib/curriculum/course-intro";
import { buildCourseContextLookup } from "@/lib/curriculum/lookup";
import { courseDetailQueryOptions } from "@/lib/drive/queries";
import type { FilePreviewSearch } from "@/lib/drive/types";
import { readOptionalString } from "@/lib/search-params";
import { buildCourseHead } from "@/lib/seo/course-head";

const courseLookup = buildCourseContextLookup(CURRICULUM);

export const Route = createFileRoute("/course/$code")({
  beforeLoad: ({ params, search }) =>
    redirectToCanonicalCourse(courseLookup, params.code, search),
  component: CoursePage,
  // `loader` must precede `head`: otherwise the loader data type is not yet
  // known when `head` is checked, and useLoaderData degrades to undefined.
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(courseDetailQueryOptions(params.code)),
  head: ({ loaderData, match, params }) =>
    buildCourseHead(
      courseLookup.get(params.code),
      params.code,
      loaderData?.materials ?? [],
      Boolean(match.search.file)
    ),
  validateSearch: (search: Record<string, unknown>): FilePreviewSearch => ({
    file: readOptionalString(search.file),
  }),
});

function CoursePage() {
  const { code } = Route.useParams();
  const { folderId, materials } = Route.useLoaderData();
  const context = courseLookup.get(code);

  if (!context) {
    return <CourseNotFound code={code} />;
  }

  const previewNodes = materials.flatMap((group) => group.items);

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 p-4 sm:p-6">
      <CourseHeader
        context={context}
        folderId={folderId}
        intro={buildCourseIntro(context, materials)}
      />

      <CourseTopics topics={context.course.topics ?? []} />

      <CourseRequirements context={context} lookup={courseLookup} />

      <CourseQuickLinks code={code} folderId={folderId} />

      <CourseMaterials courseCode={code} groups={materials} />

      <FilePreviewHost nodes={previewNodes} />
      <CourseJsonLd context={context} />
    </main>
  );
}
