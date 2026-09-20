import type {
  BadgeFilter,
  RepoEntry,
  RepoFilterValues,
  ResourceEntry,
  ResourceFilterValues,
} from "./types";

function matchesBadge(tool: ResourceEntry, badge: BadgeFilter): boolean {
  return badge === "open-source" ? tool.isOpenSource : tool.access === badge;
}

/** Category narrows; the badge list widens (any of the chosen badges). */
export function filterResources(
  tools: ResourceEntry[],
  filters: Pick<ResourceFilterValues, "badge" | "category">
): ResourceEntry[] {
  const badges = filters.badge ?? [];
  return tools.filter((tool) => {
    if (filters.category && tool.category !== filters.category) {
      return false;
    }
    if (
      badges.length > 0 &&
      !badges.some((badge) => matchesBadge(tool, badge))
    ) {
      return false;
    }
    return true;
  });
}

export function filterRepos(
  repos: RepoEntry[],
  filters: Pick<RepoFilterValues, "domain" | "license" | "maintenance">
): RepoEntry[] {
  return repos.filter((repo) => {
    if (filters.domain && repo.domain !== filters.domain) {
      return false;
    }
    if (filters.license && repo.reuseClass !== filters.license) {
      return false;
    }
    if (filters.maintenance && repo.maintenance !== filters.maintenance) {
      return false;
    }
    return true;
  });
}
