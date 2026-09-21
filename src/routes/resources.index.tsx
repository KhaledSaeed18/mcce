import { createFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";
import { ResourcesToolsPage } from "@/components/resources/resources-tools-page";
import { BADGE_FILTERS } from "@/config/resources/badges";
import { RESOURCE_CATEGORIES } from "@/config/resources/categories";
import { resourcesIndexQueryOptions } from "@/lib/resources/queries";
import type { ResourceFilterValues } from "@/lib/resources/types";
import {
  readOptionalList,
  readOptionalOneOf,
  readOptionalQuery,
} from "@/lib/search-params";
import { buildResourcesHead } from "@/lib/seo/resources-head";

const CATEGORY_IDS = RESOURCE_CATEGORIES.map((category) => category.id);

export const Route = createFileRoute("/resources/")({
  component: ResourcesPage,
  head: buildResourcesHead,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(resourcesIndexQueryOptions),
  validateSearch: (search: Record<string, unknown>): ResourceFilterValues => ({
    badge: readOptionalList(search.badge, BADGE_FILTERS),
    category: readOptionalOneOf(search.category, CATEGORY_IDS),
    q: readOptionalQuery(search.q),
  }),
});

function ResourcesPage() {
  const index = Route.useLoaderData();
  const values = Route.useSearch();
  const navigate = Route.useNavigate();

  // Typing replaces history so the back button steps between filter states,
  // not between characters; select and toggle changes push.
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
    <ResourcesToolsPage
      index={index}
      onChange={handleChange}
      onClear={handleClear}
      values={values}
    />
  );
}
