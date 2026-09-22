import { createFileRoute } from "@tanstack/react-router";
import { CoursesSection } from "@/components/drive/courses-section";
import { SourcesSection } from "@/components/drive/sources-section";
import { DriveDirectSection } from "@/components/marketing/drive-direct-section";
import { FeatureGridSection } from "@/components/marketing/feature-grid-section";
import { FeatureLinksSection } from "@/components/marketing/feature-links-section";
import { HeroSection } from "@/components/marketing/hero-section";
import { HomeCtaSection } from "@/components/marketing/home-cta-section";
import { ProgramGlanceSection } from "@/components/marketing/program-glance-section";
import { RecentStrip } from "@/components/marketing/recent-strip";
import { SectionDivider } from "@/components/marketing/section-divider";
import { SectionDividerDots } from "@/components/marketing/section-divider-dots";
import { SyncSection } from "@/components/marketing/sync-section";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/config/site";
import { homeSummaryQueryOptions } from "@/lib/drive/queries";
import { buildProgramSchema } from "@/lib/seo/schema";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    links: [{ href: SITE_URL, rel: "canonical" }],
  }),
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(homeSummaryQueryOptions),
});

function HomePage() {
  const { courses, heroStations, latestBatch, sourceSummaries, stats } =
    Route.useLoaderData();

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-4 sm:p-6">
      <HeroSection stations={heroStations} stats={stats} />

      {latestBatch ? (
        <RecentStrip addedAt={latestBatch.addedAt} count={latestBatch.total} />
      ) : null}

      <SectionDivider />

      <DriveDirectSection />

      <SectionDividerDots />

      <SourcesSection sourceSummaries={sourceSummaries} />

      <CoursesSection courses={courses} />

      <SectionDividerDots />

      <ProgramGlanceSection />

      <FeatureGridSection />

      <SectionDividerDots />

      <FeatureLinksSection />

      <SectionDividerDots />

      <SyncSection stats={stats} />

      <HomeCtaSection />

      <JsonLd data={buildProgramSchema()} />
    </main>
  );
}
