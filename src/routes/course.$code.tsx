import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { CourseHeader } from "@/components/course/course-header";
import { CourseMaterials } from "@/components/course/course-materials";
import { CourseNotFound } from "@/components/course/course-not-found";
import { CourseQuickLinks } from "@/components/course/course-quick-links";
import { CourseRequirements } from "@/components/course/course-requirements";
import { CourseTopics } from "@/components/course/course-topics";
import { FilePreviewHost } from "@/components/drive/file-preview-host";
import { JsonLd } from "@/components/seo/json-ld";
import { CURRICULUM } from "@/config/curriculum";
import { SITE_URL } from "@/config/site";
import { buildCourseContextLookup } from "@/lib/curriculum/lookup";
import {
  buildCourseMaterials,
  findCourseFolderId,
} from "@/lib/drive/course-materials";
import { driveIndexQueryOptions } from "@/lib/drive/queries";
import type { FilePreviewSearch } from "@/lib/drive/types";
import { readOptionalString } from "@/lib/search-params";
import { buildCourseHead } from "@/lib/seo/course-head";
import { buildBreadcrumbSchema, buildCourseSchema } from "@/lib/seo/schema";

const courseLookup = buildCourseContextLookup(CURRICULUM);

export const Route = createFileRoute("/course/$code")({
  component: CoursePage,
  // `loader` must precede `head`: otherwise the loader data type is not yet
  // known when `head` is checked, and useLoaderData degrades to undefined.
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(driveIndexQueryOptions),
  head: ({ params }) =>
    buildCourseHead(courseLookup.get(params.code), params.code),
  validateSearch: (search: Record<string, unknown>): FilePreviewSearch => ({
    file: readOptionalString(search.file),
  }),
});

function CoursePage() {
  const { code } = Route.useParams();
  const driveIndex = Route.useLoaderData();
  const context = courseLookup.get(code);

  const materials = useMemo(
    () => buildCourseMaterials(driveIndex.nodes, code),
    [driveIndex.nodes, code]
  );
  const folderId = useMemo(
    () => findCourseFolderId(driveIndex.nodes, code),
    [driveIndex.nodes, code]
  );

  if (!context) {
    return <CourseNotFound code={code} />;
  }

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 p-4 sm:p-6">
      <CourseHeader context={context} />

      <CourseTopics topics={context.course.topics ?? []} />

      <CourseRequirements context={context} lookup={courseLookup} />

      <CourseQuickLinks code={code} folderId={folderId} />

      <CourseMaterials courseCode={code} groups={materials} />

      <FilePreviewHost nodes={driveIndex.nodes} />
      <JsonLd data={buildCourseSchema(context)} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "All courses", url: `${SITE_URL}/course` },
          { name: context.course.name, url: `${SITE_URL}/course/${code}` },
        ])}
      />
    </main>
  );
}
