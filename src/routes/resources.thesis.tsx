import { createFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";
import { ResourcesThesisPage } from "@/components/resources/resources-thesis-page";
import { BADGE_FILTERS } from "@/config/resources/badges";
import { resourcesIndexQueryOptions } from "@/lib/resources/queries";
import type { ResourceFilterValues } from "@/lib/resources/types";
import { readOptionalList, readOptionalQuery } from "@/lib/search-params";
import { buildThesisHead } from "@/lib/seo/resources-head";

export const Route = createFileRoute("/resources/thesis")({
  component: ThesisPage,
  head: buildThesisHead,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(resourcesIndexQueryOptions),
  validateSearch: (search: Record<string, unknown>): ResourceFilterValues => ({
    badge: readOptionalList(search.badge, BADGE_FILTERS),
    q: readOptionalQuery(search.q),
  }),
});

function ThesisPage() {
  const index = Route.useLoaderData();
  const values = Route.useSearch();
  const navigate = Route.useNavigate();

  const handleChange = useCallback(
    (patch: Partial<ResourceFilterValues>) => {
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
    <ResourcesThesisPage
      index={index}
      onChange={handleChange}
      onClear={handleClear}
      values={values}
    />
  );
}
