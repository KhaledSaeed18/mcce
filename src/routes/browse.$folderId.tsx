import { createFileRoute } from "@tanstack/react-router";
import { FolderIcon } from "lucide-react";
import { useMemo } from "react";
import { FolderBreadcrumb } from "@/components/drive/folder-breadcrumb";
import { FolderNotFound } from "@/components/drive/folder-not-found";
import { NodeGrid } from "@/components/drive/node-grid";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { buildChildrenMap } from "@/lib/drive/children-map";
import { driveIndexQueryOptions } from "@/lib/drive/queries";
import { resolveFolderMeta } from "@/lib/drive/resolve-folder";
import { buildFolderHead } from "@/lib/seo/folder-head";

export const Route = createFileRoute("/browse/$folderId")({
  component: BrowseFolder,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(driveIndexQueryOptions),
  head: ({ loaderData, params }) =>
    buildFolderHead(loaderData, params.folderId),
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

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-4 p-4 sm:p-6">
      <FolderBreadcrumb crumbs={crumbs} source={source} />

      <h1 className="break-words font-head text-xl sm:text-2xl">{title}</h1>

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
    </main>
  );
}
