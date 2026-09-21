import { BADGE_FILTERS } from "@/config/resources/badges";
import type { BadgeFilter, ResourceEntry } from "./types";

/** How many tools each badge toggle would keep, shown beside its label. */
export function countByBadge(
  tools: ResourceEntry[]
): Record<BadgeFilter, number> {
  const counts = Object.fromEntries(
    BADGE_FILTERS.map((badge) => [badge, 0])
  ) as Record<BadgeFilter, number>;
  for (const tool of tools) {
    counts[tool.access] += 1;
    if (tool.isOpenSource) {
      counts["open-source"] += 1;
    }
  }
  return counts;
}
