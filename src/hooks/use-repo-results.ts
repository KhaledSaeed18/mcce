import { useMemo } from "react";
import { filterRepos } from "@/lib/resources/filter";
import { groupByDomain } from "@/lib/resources/group";
import { searchItems } from "@/lib/resources/search";
import type { RepoEntry, RepoFilterValues } from "@/lib/resources/types";

export function useRepoResults(repos: RepoEntry[], values: RepoFilterValues) {
  const { domain, license, maintenance } = values;
  const q = values.q ?? "";

  const hasCriteria =
    q.trim().length > 0 || Boolean(domain || license || maintenance);

  const results = useMemo(
    () => searchItems(filterRepos(repos, { domain, license, maintenance }), q),
    [repos, domain, license, maintenance, q]
  );

  const sections = useMemo(
    () => (q.trim().length > 0 ? [] : groupByDomain(results)),
    [results, q]
  );

  return { hasCriteria, results, sections };
}
