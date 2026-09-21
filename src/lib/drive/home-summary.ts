import { createServerFn } from "@tanstack/react-start";
import type { HeroSearchQuery } from "@/components/marketing/types";
import { DRIVE_SOURCES } from "@/config/sources";
import { buildCourseSummaries } from "./courses";
import { buildHeroSearchQueries } from "./hero-search";
import { buildRecentBatches } from "./recent";
import { buildIndexStats } from "./stats";
import type { CourseSummary, DriveIndex, DriveIndexStats } from "./types";

export interface HomeSummary {
  courses: CourseSummary[];
  heroQueries: HeroSearchQuery[];
  latestBatch: { addedAt: string; total: number } | null;
  sourceSummaries: DriveIndex["meta"]["sources"];
  stats: DriveIndexStats;
}

/**
 * The home page only needs a handful of derived numbers, not the full node
 * tree, so this runs server-side and hands back a summary instead of letting
 * the client hydrate the entire drive index for a landing page.
 */
export const getHomeSummary = createServerFn({ method: "GET" }).handler(
  async (): Promise<HomeSummary> => {
    const index = (await import("@/data/drive-index.json"))
      .default as DriveIndex;
    const [latestBatch] = buildRecentBatches(index);

    return {
      courses: buildCourseSummaries(index.nodes),
      heroQueries: buildHeroSearchQueries(index.nodes),
      latestBatch: latestBatch
        ? { addedAt: latestBatch.addedAt, total: latestBatch.total }
        : null,
      sourceSummaries: index.meta.sources,
      stats: buildIndexStats(index, DRIVE_SOURCES.length),
    };
  }
);
