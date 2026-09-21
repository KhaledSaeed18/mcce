import { createServerFn } from "@tanstack/react-start";
import { buildExamGroups } from "./exams";
import type { DriveIndex, ExamCourseGroup } from "./types";

/**
 * The exams page only needs exam-type nodes, not the full drive index tree,
 * so this runs server-side and hands back the exam groups instead of letting
 * the client hydrate every indexed node on the site.
 */
export const getExamGroups = createServerFn({ method: "GET" }).handler(
  async (): Promise<ExamCourseGroup[]> => {
    const { nodes } = (await import("@/data/drive-index.json"))
      .default as DriveIndex;

    return buildExamGroups(nodes);
  }
);
