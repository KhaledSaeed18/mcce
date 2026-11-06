import { createServerFn } from "@tanstack/react-start";
import { buildSemesterFolders } from "./semester-folders";
import type { DriveIndex, SemesterFolder } from "./types";

export interface LinksSummary {
  semesterFolders: SemesterFolder[];
  syncedAt: string;
}

/** Server-side so a page people open from a phone never downloads the full index. */
export const getLinksSummary = createServerFn({ method: "GET" }).handler(
  async (): Promise<LinksSummary> => {
    const index = (await import("@/data/drive-index.json"))
      .default as DriveIndex;

    return {
      semesterFolders: buildSemesterFolders(index.nodes),
      syncedAt: index.meta.generatedAt,
    };
  }
);
