import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { CoursesSection } from "@/components/drive/courses-section";
import { SourcesSection } from "@/components/drive/sources-section";
import { FeatureGridSection } from "@/components/marketing/feature-grid-section";
import { HeroSection } from "@/components/marketing/hero-section";
import { HomeCtaSection } from "@/components/marketing/home-cta-section";
import { ProgramGlanceSection } from "@/components/marketing/program-glance-section";
import { RecentStrip } from "@/components/marketing/recent-strip";
import { SectionDivider } from "@/components/marketing/section-divider";
import { SectionDividerDots } from "@/components/marketing/section-divider-dots";
import { SyncSection } from "@/components/marketing/sync-section";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/config/site";
import { DRIVE_SOURCES } from "@/config/sources";
import { buildCourseSummaries } from "@/lib/drive/courses";
import { driveIndexQueryOptions } from "@/lib/drive/queries";
import { buildRecentBatches } from "@/lib/drive/recent";
import { buildIndexStats } from "@/lib/drive/stats";
import { buildProgramSchema } from "@/lib/seo/schema";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    links: [{ href: SITE_URL, rel: "canonical" }],
  }),
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(driveIndexQueryOptions),
});

function HomePage() {
  const driveIndex = Route.useLoaderData();
  const stats = useMemo(
    () => buildIndexStats(driveIndex, DRIVE_SOURCES.length),
    [driveIndex]
  );
  const courses = useMemo(
    () => buildCourseSummaries(driveIndex.nodes),
    [driveIndex.nodes]
  );
  const [latestBatch] = useMemo(
    () => buildRecentBatches(driveIndex),
    [driveIndex]
  );

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-4 sm:p-6">
      <HeroSection stats={stats} />

      {latestBatch ? (
        <RecentStrip addedAt={latestBatch.addedAt} count={latestBatch.total} />
      ) : null}

      <SectionDivider />

      <SourcesSection sourceSummaries={driveIndex.meta.sources} />

      <CoursesSection courses={courses} />

      <SectionDividerDots />

      <ProgramGlanceSection />

      <FeatureGridSection />

      <SectionDividerDots />

      <SyncSection stats={stats} />

      <HomeCtaSection />

      <JsonLd data={buildProgramSchema()} />
    </main>
  );
}
