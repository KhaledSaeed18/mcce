import { createFileRoute } from "@tanstack/react-router";
import { FolderIcon } from "lucide-react";
import { useMemo } from "react";
import { FilePreviewHost } from "@/components/drive/file-preview-host";
import { FolderBreadcrumb } from "@/components/drive/folder-breadcrumb";
import { FolderNotFound } from "@/components/drive/folder-not-found";
import { NodeGrid } from "@/components/drive/node-grid";
import { OpenInDriveButton } from "@/components/drive/open-in-drive-button";
import { JsonLd } from "@/components/seo/json-ld";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { SITE_URL } from "@/config/site";
import { buildChildrenMap } from "@/lib/drive/children-map";
import { driveIndexQueryOptions } from "@/lib/drive/queries";
import { resolveFolderMeta } from "@/lib/drive/resolve-folder";
import type { FilePreviewSearch } from "@/lib/drive/types";
import { buildDriveFolderUrl } from "@/lib/drive/urls";
import { readOptionalString } from "@/lib/search-params";
import { buildFolderHead } from "@/lib/seo/folder-head";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

export const Route = createFileRoute("/browse/$folderId")({
  component: BrowseFolder,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(driveIndexQueryOptions),
  head: ({ loaderData, params }) =>
    buildFolderHead(loaderData, params.folderId),
  validateSearch: (search: Record<string, unknown>): FilePreviewSearch => ({
    file: readOptionalString(search.file),
  }),
});

function BrowseFolder() {
  const { folderId } = Route.useParams();
  const driveIndex = Route.useLoaderData();

  const childrenMap = useMemo(
    () => buildChildrenMap(driveIndex.nodes),
    [driveIndex.nodes]
  );

  const meta = resolveFolderMeta(driveIndex, folderId);

  if (!meta) {
    return <FolderNotFound />;
  }

  const { source, title, node: currentNode } = meta;
  const children = childrenMap.get(folderId) ?? [];
  const crumbs = currentNode
    ? currentNode.pathIds.map((id, index) => ({
        id,
        name: currentNode.pathNames[index],
      }))
    : [];
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    {
      name: source.label,
      url: `${SITE_URL}/browse/${source.rootFolderId}`,
    },
    ...crumbs.map((crumb) => ({
      name: crumb.name,
      url: `${SITE_URL}/browse/${crumb.id}`,
    })),
  ]);

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-4 p-4 sm:p-6">
      <FolderBreadcrumb crumbs={crumbs} source={source} />
      <JsonLd data={breadcrumbSchema} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="break-words font-head text-xl sm:text-2xl">{title}</h1>
        <OpenInDriveButton
          href={buildDriveFolderUrl(folderId)}
          label="Open this folder in Drive"
        />
      </div>

      {children.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderIcon />
            </EmptyMedia>
            <EmptyTitle>Empty folder</EmptyTitle>
            <EmptyDescription>Nothing in here yet.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <NodeGrid childrenMap={childrenMap} nodes={children} />
      )}

      <FilePreviewHost nodes={driveIndex.nodes} />
    </main>
  );
}
