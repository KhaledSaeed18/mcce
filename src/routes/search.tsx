import { createFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";
import { SearchFilters } from "@/components/drive/search-filters";
import { SearchResults } from "@/components/drive/search-results";
import { SITE_URL } from "@/config/site";
import { useDriveSearch } from "@/hooks/use-drive-search";
import { driveIndexQueryOptions } from "@/lib/drive/queries";
import type { DriveNodeKind, SearchFilterValues } from "@/lib/drive/types";
import { readOptionalString } from "@/lib/search-params";
import { buildPageMeta } from "@/lib/seo/meta";

const SEARCH_URL = `${SITE_URL}/search`;

export const Route = createFileRoute("/search")({
  component: SearchPage,
  head: () => ({
    links: [{ href: SEARCH_URL, rel: "canonical" }],
    meta: buildPageMeta({
      description:
        "Search MCCE program materials by name, semester, course, or file type.",
      robots: "noindex, follow",
      title: "Search · MCCE",
      url: SEARCH_URL,
    }),
  }),
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(driveIndexQueryOptions),
  validateSearch: (search: Record<string, unknown>): SearchFilterValues => ({
    course: readOptionalString(search.course),
    kind: readOptionalString(search.kind) as DriveNodeKind | undefined,
    q: typeof search.q === "string" ? search.q : "",
    semester: readOptionalString(search.semester),
  }),
});

function SearchPage() {
  const driveIndex = Route.useLoaderData();
  const values = Route.useSearch();
  const navigate = Route.useNavigate();

  const { childrenMap, courseOptions, facets, hasCriteria, results } =
    useDriveSearch(driveIndex.nodes, values);

  const handleChange = useCallback(
    (patch: Partial<SearchFilterValues>) => {
      navigate({ search: (prev) => ({ ...prev, ...patch }) });
    },
    [navigate]
  );

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-4 p-4 sm:p-6">
      <h1 className="font-head text-xl sm:text-2xl">Search</h1>

      <SearchFilters
        courseOptions={courseOptions}
        facets={facets}
        onChange={handleChange}
        values={values}
      />

      <SearchResults
        childrenMap={childrenMap}
        hasCriteria={hasCriteria}
        results={results}
      />
    </main>
  );
}
