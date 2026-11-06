import { queryOptions } from "@tanstack/react-query";
import { getCourseDetail } from "./course-detail";
import { getCourseSummaries } from "./course-summaries";
import { getExamGroups } from "./exam-groups";
import { getFolderDetail } from "./folder-detail";
import { getHomeSummary } from "./home-summary";
import { getLinksSummary } from "./links-summary";
import { getRecentSummary } from "./recent-summary";
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

export const linksSummaryQueryOptions = queryOptions({
  queryFn: () => getLinksSummary(),
  queryKey: ["links-summary"],
  staleTime: Number.POSITIVE_INFINITY,
});

export const courseDetailQueryOptions = (code: string) =>
  queryOptions({
    queryFn: () => getCourseDetail({ data: { code } }),
    queryKey: ["course-detail", code],
    staleTime: Number.POSITIVE_INFINITY,
  });

export const courseSummariesQueryOptions = queryOptions({
  queryFn: () => getCourseSummaries(),
  queryKey: ["course-summaries"],
  staleTime: Number.POSITIVE_INFINITY,
});

export const folderDetailQueryOptions = (folderId: string) =>
  queryOptions({
    queryFn: () => getFolderDetail({ data: { folderId } }),
    queryKey: ["folder-detail", folderId],
    staleTime: Number.POSITIVE_INFINITY,
  });

export const recentSummaryQueryOptions = queryOptions({
  queryFn: () => getRecentSummary(),
  queryKey: ["recent-summary"],
  staleTime: Number.POSITIVE_INFINITY,
});

export const examGroupsQueryOptions = queryOptions({
  queryFn: () => getExamGroups(),
  queryKey: ["exam-groups"],
  staleTime: Number.POSITIVE_INFINITY,
});
