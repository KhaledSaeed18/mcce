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
import { SITE_URL } from "@/config/site";
import { buildChildrenMap } from "@/lib/drive/children-map";
import { driveIndexQueryOptions } from "@/lib/drive/queries";
import { resolveFolderMeta } from "@/lib/drive/resolve-folder";

export const Route = createFileRoute("/browse/$folderId")({
  component: BrowseFolder,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(driveIndexQueryOptions),
  head: ({ loaderData, params }) => {
    const meta = loaderData
      ? resolveFolderMeta(loaderData, params.folderId)
      : null;
    const title = meta ? `${meta.title} · MCCE` : "MCCE";

    return {
      links: [
        { href: `${SITE_URL}/browse/${params.folderId}`, rel: "canonical" },
      ],
      meta: [{ title }, { content: "noindex, follow", name: "robots" }],
    };
  },
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
            Back to homepage
          </Button>
        </Empty>
      </main>
    );
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
