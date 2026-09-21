import { useMemo } from "react";
import { filterResources } from "@/lib/resources/filter";
import { groupByStage } from "@/lib/resources/group";
import { searchItems } from "@/lib/resources/search";
import type { BadgeFilter, ResourceEntry } from "@/lib/resources/types";

interface ThesisFilterValues {
  badge?: BadgeFilter[];
  q: string;
}

/** Only tools tagged with a stage belong here; the rest of the catalog stays on the tools page. */
export function useThesisSections(
  tools: ResourceEntry[],
  values: ThesisFilterValues
) {
  const { badge, q } = values;

  const staged = useMemo(
    () =>
      tools.filter((tool) => tool.thesisStages && tool.thesisStages.length > 0),
    [tools]
  );

  const hasCriteria = q.trim().length > 0 || Boolean(badge?.length);

  const sections = useMemo(
    () => groupByStage(searchItems(filterResources(staged, { badge }), q)),
    [staged, badge, q]
  );

  const count = useMemo(
    () =>
      new Set(
        sections.flatMap((section) => section.tools.map((tool) => tool.id))
      ).size,
    [sections]
  );

  return { count, hasCriteria, sections };
}
