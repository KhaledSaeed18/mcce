import { queryOptions } from "@tanstack/react-query";
import type { ResourcesIndex } from "./types";

export const resourcesIndexQueryOptions = queryOptions({
  queryFn: () =>
    import("@/data/resources-index.json").then(
      (module) => module.default as ResourcesIndex
    ),
  queryKey: ["resources-index"],
  staleTime: Number.POSITIVE_INFINITY,
});
