import { createFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";
import { CategoryNotFound } from "@/components/resources/category-not-found";
import { ResourcesCategoryPage } from "@/components/resources/resources-category-page";
import { BADGE_FILTERS } from "@/config/resources/badges";
import { RESOURCE_CATEGORY_BY_ID } from "@/config/resources/categories";
import { resourcesIndexQueryOptions } from "@/lib/resources/queries";
import type {
  ResourceCategoryId,
  ResourceFilterValues,
} from "@/lib/resources/types";
import { readOptionalList, readOptionalQuery } from "@/lib/search-params";
import { buildCategoryHead } from "@/lib/seo/resources-head";

export const Route = createFileRoute("/resources/$category")({
  component: CategoryPage,
  // `loader` must precede `head`: otherwise the loader data type is not yet
  // known when `head` is checked, and useLoaderData degrades to undefined.
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(resourcesIndexQueryOptions),
  head: ({ params }) =>
    buildCategoryHead(
      RESOURCE_CATEGORY_BY_ID.get(params.category as ResourceCategoryId),
      params.category
    ),
  validateSearch: (search: Record<string, unknown>): ResourceFilterValues => ({
    badge: readOptionalList(search.badge, BADGE_FILTERS),
    q: readOptionalQuery(search.q),
  }),
});

function CategoryPage() {
  const { category: categoryId } = Route.useParams();
  const index = Route.useLoaderData();
  const values = Route.useSearch();
  const navigate = Route.useNavigate();
  const category = RESOURCE_CATEGORY_BY_ID.get(
    categoryId as ResourceCategoryId
  );

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

  if (!category) {
    return <CategoryNotFound categoryId={categoryId} />;
  }

  return (
    <ResourcesCategoryPage
      category={category}
      index={index}
      onChange={handleChange}
      onClear={handleClear}
      values={values}
    />
  );
}
