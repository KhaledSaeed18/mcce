import { createFileRoute } from "@tanstack/react-router";
import { AboutMcce } from "@/components/about-mcce";
import { SourceCard } from "@/components/drive/source-card";
import { McceFaq } from "@/components/mcce-faq";
import { JsonLd } from "@/components/seo/json-ld";
import { PROGRAM_FAQ } from "@/config/faq";
import {
  PROGRAM_NAME,
  PROGRAM_UNIVERSITY,
  PROGRAM_UNIVERSITY_SHORT,
  SITE_URL,
} from "@/config/site";
import { DRIVE_SOURCES } from "@/config/sources";
import { formatDateTime } from "@/lib/drive/format";
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

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-10 p-4 sm:p-6">
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-1">
          <h1 className="font-head text-2xl sm:text-3xl">Program materials</h1>
          <p className="text-muted-foreground text-sm">
            {PROGRAM_NAME} (MCCE), {PROGRAM_UNIVERSITY} (
            {PROGRAM_UNIVERSITY_SHORT})
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {DRIVE_SOURCES.map((source) => {
            const summary = driveIndex.meta.sources.find(
              (s) => s.id === source.id
            );
            return (
              <SourceCard
                fileCount={summary?.fileCount ?? 0}
                folderCount={summary?.folderCount ?? 0}
                key={source.id}
                source={source}
                totalBytes={summary?.totalBytes ?? 0}
              />
            );
          })}
        </div>

        <p className="text-muted-foreground text-xs">
          Last synced {formatDateTime(driveIndex.meta.generatedAt)}
        </p>
      </div>

      <AboutMcce />
      <McceFaq />

      <JsonLd data={buildProgramSchema()} />
      <JsonLd data={buildFaqSchema(PROGRAM_FAQ)} />
    </main>
  );
}
