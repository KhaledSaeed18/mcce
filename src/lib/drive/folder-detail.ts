import { createServerFn } from "@tanstack/react-start";
import { selectFolderSlice } from "./folder-slice";
import { toListingNode } from "./listing-node";
import type { DriveIndex, DriveNode } from "./types";

export interface FolderDetail {
  nodes: DriveNode[];
}

/** Folder pages are the heaviest for crawlers, so each one carries only its own slice. */
export const getFolderDetail = createServerFn({ method: "GET" })
  .validator((data: { folderId: string }) => data)
  .handler(async ({ data }): Promise<FolderDetail> => {
    const { nodes } = (await import("@/data/drive-index.json"))
      .default as DriveIndex;

    // The folder keeps its own path, which its breadcrumb is built from.
    return {
      nodes: selectFolderSlice(nodes, data.folderId).map((node) =>
        node.id === data.folderId ? node : toListingNode(node)
      ),
    };
  });
