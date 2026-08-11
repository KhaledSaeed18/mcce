import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { AboutMcce } from "@/components/about-mcce";
import { CoursesSection } from "@/components/drive/courses-section";
import { SourceCard } from "@/components/drive/source-card";
import { HeroSection } from "@/components/marketing/hero-section";
import { SectionDivider } from "@/components/marketing/section-divider";
import { McceFaq } from "@/components/mcce-faq";
import { JsonLd } from "@/components/seo/json-ld";
import { PROGRAM_FAQ } from "@/config/faq";
import { SITE_URL } from "@/config/site";
import { DRIVE_SOURCES } from "@/config/sources";
import { buildCourseSummaries } from "@/lib/drive/courses";
import { driveIndexQueryOptions } from "@/lib/drive/queries";
import { buildFaqSchema, buildProgramSchema } from "@/lib/seo/schema";

export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({
    links: [{ href: SITE_URL, rel: "canonical" }],
  }),
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(driveIndexQueryOptions),
});

function Dashboard() {
  const driveIndex = Route.useLoaderData();
  const stats = {
    fileCount: driveIndex.meta.sources.reduce((sum, s) => sum + s.fileCount, 0),
    folderCount: driveIndex.meta.sources.reduce(
      (sum, s) => sum + s.folderCount,
      0
    ),
    generatedAt: driveIndex.meta.generatedAt,
    sourceCount: DRIVE_SOURCES.length,
  };
  const courses = useMemo(
    () => buildCourseSummaries(driveIndex.nodes),
    [driveIndex.nodes]
  );

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-10 p-4 sm:p-6">
      <HeroSection stats={stats} />

      <SectionDivider />

      <div className="flex scroll-mt-20 flex-col gap-6" id="materials">
        <h2 className="font-head text-2xl sm:text-3xl">Program materials</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {DRIVE_SOURCES.map((source) => {
            const summary = driveIndex.meta.sources.find(
              (s) => s.id === source.id
            );
            return (
              <SourceCard
                description={summary?.description ?? null}
                fileCount={summary?.fileCount ?? 0}
                folderCount={summary?.folderCount ?? 0}
                key={source.id}
                source={source}
                totalBytes={summary?.totalBytes ?? 0}
              />
            );
          })}
        </div>
      </div>

      <CoursesSection courses={courses} />

      <AboutMcce />
      <McceFaq />

      <JsonLd data={buildProgramSchema()} />
      <JsonLd data={buildFaqSchema(PROGRAM_FAQ)} />
    </main>
  );
}
