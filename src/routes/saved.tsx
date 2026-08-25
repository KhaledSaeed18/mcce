import { createFileRoute } from "@tanstack/react-router";
import { BookmarkIcon } from "lucide-react";
import { useMemo } from "react";
import { FilePreviewHost } from "@/components/drive/file-preview-host";
import { NodeGrid } from "@/components/drive/node-grid";
import { useSavedNodes } from "@/components/providers/saved-nodes-provider";
import { SavedHero } from "@/components/saved/saved-hero";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { SITE_URL } from "@/config/site";
import { resolveNodeIds } from "@/lib/drive/by-id";
import { driveIndexQueryOptions } from "@/lib/drive/queries";
import type { FilePreviewSearch } from "@/lib/drive/types";
import { readOptionalString } from "@/lib/search-params";
import { buildPageMeta } from "@/lib/seo/meta";

const SAVED_URL = `${SITE_URL}/saved`;

export const Route = createFileRoute("/saved")({
  component: SavedPage,
  head: () => ({
    links: [{ href: SAVED_URL, rel: "canonical" }],
    meta: buildPageMeta({
      description: "Files you saved while browsing the MCCE index.",
      robots: "noindex, follow",
      title: "Saved · MCCE",
      url: SAVED_URL,
    }),
  }),
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(driveIndexQueryOptions),
  validateSearch: (search: Record<string, unknown>): FilePreviewSearch => ({
    file: readOptionalString(search.file),
  }),
});

function SavedPage() {
  const driveIndex = Route.useLoaderData();
  const { ids } = useSavedNodes();
  const saved = useMemo(
    () => resolveNodeIds(driveIndex.nodes, ids),
    [driveIndex.nodes, ids]
  );

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-4 py-8 sm:p-6 sm:py-14">
      <SavedHero />

      {saved.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <BookmarkIcon />
            </EmptyMedia>
            <EmptyTitle>Nothing saved yet</EmptyTitle>
            <EmptyDescription>
              Open any file and choose Save to keep it here.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <NodeGrid nodes={saved} />
      )}

      <FilePreviewHost nodes={driveIndex.nodes} />
    </main>
  );
}
