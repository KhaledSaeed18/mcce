import { SectionDividerDots } from "@/components/marketing/section-divider-dots";
import { ResourceEmptyState } from "@/components/resources/resource-empty-state";
import { ResourceFilters } from "@/components/resources/resource-filters";
import { ResourceGrid } from "@/components/resources/resource-grid";
import { ResourceSuggestBlock } from "@/components/resources/resource-suggest-block";
import { ResourcesHero } from "@/components/resources/resources-hero";
import { JsonLd } from "@/components/seo/json-ld";
import type { ResourceCategory } from "@/config/resources/categories";
import { RESOURCES_HERO } from "@/config/resources/copy";
import { SITE_NAME, SITE_URL } from "@/config/site";
import { useResourceResults } from "@/hooks/use-resource-results";
import type {
  ResourceFilterValues,
  ResourcesIndex,
} from "@/lib/resources/types";
import { categoryUrl, RESOURCES_URL } from "@/lib/seo/resources-head";
import { buildToolsSchema } from "@/lib/seo/resources-schema";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

interface ResourcesCategoryPageProps {
  category: ResourceCategory;
  index: ResourcesIndex;
  onChange: (patch: Partial<ResourceFilterValues>) => void;
  onClear: () => void;
  values: ResourceFilterValues;
}

export function ResourcesCategoryPage({
  category,
  index,
  onChange,
  onClear,
  values,
}: ResourcesCategoryPageProps) {
  const scoped = { ...values, category: category.id };
  const { badgeCounts, hasCriteria, results } = useResourceResults(
    index.tools,
    scoped
  );
  const url = categoryUrl(category.id);

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-4 py-8 sm:p-6 sm:py-14">
      <ResourcesHero
        badge={RESOURCES_HERO.badge}
        description={category.tagline}
        highlight={category.label}
        title="Tools for"
      >
        <ResourceFilters
          badgeCounts={badgeCounts}
          hasCriteria={hasCriteria}
          onChange={onChange}
          onClear={onClear}
          resultCount={results.length}
          showCategory={false}
          values={values}
        />
      </ResourcesHero>

      {results.length === 0 ? (
        <ResourceEmptyState onClear={onClear} />
      ) : (
        <ResourceGrid tools={results} />
      )}

      <SectionDividerDots />
      <ResourceSuggestBlock />

      <JsonLd
        data={buildToolsSchema(results, `${category.label}, MCCE tools`, url)}
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: SITE_NAME, url: SITE_URL },
          { name: "Tools", url: RESOURCES_URL },
          { name: category.label, url },
        ])}
      />
    </main>
  );
}
