import { createFileRoute } from "@tanstack/react-router";
import { ClockIcon } from "lucide-react";
import { useMemo } from "react";
import { FilePreviewHost } from "@/components/drive/file-preview-host";
import { RecentBatchSection } from "@/components/recent/recent-batch-section";
import { RecentHero } from "@/components/recent/recent-hero";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { SITE_URL } from "@/config/site";
import { formatDate } from "@/lib/drive/format";
import { driveIndexQueryOptions } from "@/lib/drive/queries";
import { buildRecentBatches } from "@/lib/drive/recent";
import type { FilePreviewSearch } from "@/lib/drive/types";
import { readOptionalString } from "@/lib/search-params";
import { buildPageMeta } from "@/lib/seo/meta";

const RECENT_URL = `${SITE_URL}/recent`;

export const Route = createFileRoute("/recent")({
  component: RecentPage,
  head: () => ({
    links: [{ href: RECENT_URL, rel: "canonical" }],
    meta: buildPageMeta({
      description:
        "Files added to the MCCE index since the last syncs, grouped by the week they arrived.",
      title: "Recently added · MCCE",
      url: RECENT_URL,
    }),
  }),
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(driveIndexQueryOptions),
  validateSearch: (search: Record<string, unknown>): FilePreviewSearch => ({
    file: readOptionalString(search.file),
  }),
});

function RecentPage() {
  const driveIndex = Route.useLoaderData();
  const batches = useMemo(() => buildRecentBatches(driveIndex), [driveIndex]);

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-4 py-8 sm:p-6 sm:py-14">
      <RecentHero />

      {batches.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ClockIcon />
            </EmptyMedia>
            <EmptyTitle>Nothing new yet</EmptyTitle>
            <EmptyDescription>
              The index started tracking additions on{" "}
              {formatDate(driveIndex.meta.baselineAt)}. Anything shared to the
              Drive after that shows up here.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        batches.map((batch) => (
          <RecentBatchSection batch={batch} key={batch.day} />
        ))
      )}

      <FilePreviewHost nodes={driveIndex.nodes} />
    </main>
  );
}
