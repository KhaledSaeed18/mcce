import { createServerFn } from "@tanstack/react-start";
import { buildCourseSummaries } from "./courses";
import type { CourseSummary, DriveIndex } from "./types";

/** Pages that only show per-course counts should not embed the whole index in their HTML. */
export const getCourseSummaries = createServerFn({ method: "GET" }).handler(
  async (): Promise<CourseSummary[]> => {
    const { nodes } = (await import("@/data/drive-index.json"))
      .default as DriveIndex;

    return buildCourseSummaries(nodes);
  }
);
