import { createFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";
import { ResourcesOpenSourcePage } from "@/components/resources/resources-open-source-page";
import {
  MAINTENANCE_STATES,
  REPO_DOMAINS,
  REUSE_CLASSES,
} from "@/config/resources/repo-domains";
import { resourcesIndexQueryOptions } from "@/lib/resources/queries";
import type { RepoFilterValues } from "@/lib/resources/types";
import { readOptionalOneOf, readOptionalQuery } from "@/lib/search-params";
import { buildOpenSourceHead } from "@/lib/seo/resources-head";

const DOMAIN_IDS = REPO_DOMAINS.map((domain) => domain.id);

export const Route = createFileRoute("/resources/open-source")({
  component: OpenSourcePage,
  head: buildOpenSourceHead,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(resourcesIndexQueryOptions),
  validateSearch: (search: Record<string, unknown>): RepoFilterValues => ({
    domain: readOptionalOneOf(search.domain, DOMAIN_IDS),
    license: readOptionalOneOf(search.license, REUSE_CLASSES),
    maintenance: readOptionalOneOf(search.maintenance, MAINTENANCE_STATES),
    q: readOptionalQuery(search.q),
  }),
});

function OpenSourcePage() {
  const index = Route.useLoaderData();
  const values = Route.useSearch();
  const navigate = Route.useNavigate();

  const handleChange = useCallback(
    (patch: Partial<RepoFilterValues>) => {
      navigate({
        replace: "q" in patch,
        search: (prev) => ({ ...prev, ...patch }),
      });
    },
    [navigate]
  );

  const handleClear = useCallback(() => {
    navigate({ search: {} });
  }, [navigate]);

  return (
    <ResourcesOpenSourcePage
      index={index}
      onChange={handleChange}
      onClear={handleClear}
      values={values}
    />
  );
}
