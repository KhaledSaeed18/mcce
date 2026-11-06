import { createServerFn } from "@tanstack/react-start";
import { selectFolderSlice } from "./folder-slice";
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

    return { nodes: selectFolderSlice(nodes, data.folderId) };
  });
