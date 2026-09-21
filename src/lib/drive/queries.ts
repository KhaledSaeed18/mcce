import { queryOptions } from "@tanstack/react-query";
import { getCourseDetail } from "./course-detail";
import { getExamGroups } from "./exam-groups";
import { getHomeSummary } from "./home-summary";
import type { DriveIndex } from "./types";

export const driveIndexQueryOptions = queryOptions({
  queryFn: () =>
    import("@/data/drive-index.json").then(
      (module) => module.default as DriveIndex
    ),
  queryKey: ["drive-index"],
  staleTime: Number.POSITIVE_INFINITY,
});

export const homeSummaryQueryOptions = queryOptions({
  queryFn: () => getHomeSummary(),
  queryKey: ["home-summary"],
  staleTime: Number.POSITIVE_INFINITY,
});

export const courseDetailQueryOptions = (code: string) =>
  queryOptions({
    queryFn: () => getCourseDetail({ data: { code } }),
    queryKey: ["course-detail", code],
    staleTime: Number.POSITIVE_INFINITY,
  });

export const examGroupsQueryOptions = queryOptions({
  queryFn: () => getExamGroups(),
  queryKey: ["exam-groups"],
  staleTime: Number.POSITIVE_INFINITY,
});
