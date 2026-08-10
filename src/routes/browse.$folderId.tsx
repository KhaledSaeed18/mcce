import { createFileRoute, Link } from "@tanstack/react-router";
import { FolderIcon } from "lucide-react";
import { Fragment, useMemo } from "react";
import { NodeCard } from "@/components/drive/node-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { DRIVE_SOURCES } from "@/config/sources";
import { buildChildrenMap } from "@/lib/drive/children-map";
import { driveIndexQueryOptions } from "@/lib/drive/queries";

export const Route = createFileRoute("/browse/$folderId")({
  component: BrowseFolder,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(driveIndexQueryOptions),
});

function BrowseFolder() {
  const { folderId } = Route.useParams();
  const driveIndex = Route.useLoaderData();

  const childrenMap = useMemo(
    () => buildChildrenMap(driveIndex.nodes),
    [driveIndex.nodes]
  );
  const nodesById = useMemo(
    () => new Map(driveIndex.nodes.map((node) => [node.id, node])),
    [driveIndex.nodes]
  );

  const currentNode = nodesById.get(folderId);
  const source = currentNode
    ? DRIVE_SOURCES.find((s) => s.id === currentNode.sourceId)
    : DRIVE_SOURCES.find((s) => s.rootFolderId === folderId);

  if (!source) {
    return (
      <main className="mx-auto max-w-5xl p-4 sm:p-6">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderIcon />
            </EmptyMedia>
            <EmptyTitle>Folder not found</EmptyTitle>
            <EmptyDescription>
              This folder isn't in the current index. It may have moved, or the
              index may be stale.
            </EmptyDescription>
          </EmptyHeader>
          <Button nativeButton={false} render={<Link to="/" />}>
            Back to dashboard
          </Button>
        </Empty>
      </main>
    );
  }

  const children = childrenMap.get(folderId) ?? [];
  const title = currentNode?.name ?? source.label;
  const crumbs = currentNode
    ? currentNode.pathIds.map((id, index) => ({
        id,
        name: currentNode.pathNames[index],
      }))
    : [];

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-4 p-4 sm:p-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              render={
                <Link
                  params={{ folderId: source.rootFolderId }}
                  to="/browse/$folderId"
                />
              }
            >
              {source.label}
            </BreadcrumbLink>
          </BreadcrumbItem>
          {crumbs.map((crumb, index) => (
            <Fragment key={crumb.id}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {index === crumbs.length - 1 ? (
                  <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    render={
                      <Link
                        params={{ folderId: crumb.id }}
                        to="/browse/$folderId"
                      />
                    }
                  >
                    {crumb.name}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

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
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {children.map((node) => (
            <NodeCard
              childCount={
                node.kind === "folder"
                  ? (childrenMap.get(node.id)?.length ?? 0)
                  : undefined
              }
              key={node.id}
              node={node}
            />
          ))}
        </div>
      )}
    </main>
  );
}
