import { queryOptions } from "@tanstack/react-query";
import type { DriveIndex } from "./types";

export const driveIndexQueryOptions = queryOptions({
  queryFn: () =>
    import("@/data/drive-index.json").then(
      (module) => module.default as DriveIndex
    ),
  queryKey: ["drive-index"],
  staleTime: Number.POSITIVE_INFINITY,
});
