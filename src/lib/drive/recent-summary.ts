import { createServerFn } from "@tanstack/react-start";
import { toListingBatches } from "./listing-node";
import { buildRecentBatches } from "./recent";
import type { DriveIndex, RecentBatch } from "./types";

export interface RecentSummary {
  baselineAt: string;
  batches: RecentBatch[];
}

/** Only the recently added files, so the page does not embed the whole index in its HTML. */
export const getRecentSummary = createServerFn({ method: "GET" }).handler(
  async (): Promise<RecentSummary> => {
    const index = (await import("@/data/drive-index.json"))
      .default as DriveIndex;

    return {
      baselineAt: index.meta.baselineAt,
      batches: toListingBatches(buildRecentBatches(index)),
    };
  }
);
