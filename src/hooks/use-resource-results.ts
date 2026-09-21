import { useMemo } from "react";
import { countByBadge } from "@/lib/resources/facets";
import { filterResources } from "@/lib/resources/filter";
import { groupByCategory } from "@/lib/resources/group";
import { searchItems } from "@/lib/resources/search";
import type {
  ResourceEntry,
  ResourceFilterValues,
} from "@/lib/resources/types";

export function useResourceResults(
  tools: ResourceEntry[],
  values: ResourceFilterValues
) {
  const { badge, category, q } = values;

  const badgeCounts = useMemo(() => countByBadge(tools), [tools]);

  const hasCriteria =
    q.trim().length > 0 || Boolean(category) || Boolean(badge?.length);

  const results = useMemo(
    () => searchItems(filterResources(tools, { badge, category }), q),
    [tools, badge, category, q]
  );

  // Idle shows every category as a section; a query shows one ranked list.
  const sections = useMemo(
    () => (q.trim().length > 0 ? [] : groupByCategory(results)),
    [results, q]
  );

  return { badgeCounts, hasCriteria, results, sections };
}
