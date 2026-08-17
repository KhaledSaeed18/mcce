import { useMemo } from "react";
import { buildChildrenMap } from "@/lib/drive/children-map";
import { buildFacetOptions } from "@/lib/drive/facets";
import { filterNodes } from "@/lib/drive/filter";
import { searchNodes } from "@/lib/drive/search";
import type { DriveNode, SearchFilterValues } from "@/lib/drive/types";

export function useDriveSearch(nodes: DriveNode[], values: SearchFilterValues) {
  const { q, semester, course, kind } = values;

  const facets = useMemo(() => buildFacetOptions(nodes), [nodes]);
  const childrenMap = useMemo(() => buildChildrenMap(nodes), [nodes]);

  const courseOptions = useMemo(() => {
    if (!semester) {
      return facets.courses;
    }
    return buildFacetOptions(filterNodes(nodes, { semester })).courses;
  }, [nodes, facets.courses, semester]);

  const hasCriteria =
    q.trim().length > 0 || Boolean(semester || course || kind);

  const results = useMemo(() => {
    if (!hasCriteria) {
      return [];
    }
    const filtered = filterNodes(nodes, {
      courseCode: course,
      kind,
      semester,
    });
    return searchNodes(filtered, q);
  }, [nodes, q, semester, course, kind, hasCriteria]);

  return { childrenMap, courseOptions, facets, hasCriteria, results };
}
