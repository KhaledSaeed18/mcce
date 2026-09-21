import { SectionDividerDots } from "@/components/marketing/section-divider-dots";
import { ResourceBadgeLegend } from "@/components/resources/resource-badge-legend";
import { ResourceCategoryJump } from "@/components/resources/resource-category-jump";
import { ResourceCategorySection } from "@/components/resources/resource-category-section";
import { ResourceEmptyState } from "@/components/resources/resource-empty-state";
import { ResourceFilters } from "@/components/resources/resource-filters";
import { ResourceGrid } from "@/components/resources/resource-grid";
import { ResourceSuggestBlock } from "@/components/resources/resource-suggest-block";
import { ResourcesHero } from "@/components/resources/resources-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { RESOURCE_CATEGORIES } from "@/config/resources/categories";
import {
  RESOURCES_HERO,
  RESOURCES_NOT_SPONSORED,
} from "@/config/resources/copy";
import { SITE_NAME, SITE_URL } from "@/config/site";
import { useResourceResults } from "@/hooks/use-resource-results";
import type {
  ResourceFilterValues,
  ResourcesIndex,
} from "@/lib/resources/types";
import { RESOURCES_URL } from "@/lib/seo/resources-head";
import { buildToolsSchema } from "@/lib/seo/resources-schema";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

interface ResourcesToolsPageProps {
  index: ResourcesIndex;
  onChange: (patch: Partial<ResourceFilterValues>) => void;
  onClear: () => void;
  values: ResourceFilterValues;
}

export function ResourcesToolsPage({
  index,
  onChange,
  onClear,
  values,
}: ResourcesToolsPageProps) {
  const { badgeCounts, hasCriteria, results, sections } = useResourceResults(
    index.tools,
    values
  );
  const isRanked = Boolean(values.q?.trim());
  const showJump = !(isRanked || values.category) && sections.length > 1;

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-4 py-8 sm:p-6 sm:py-14">
      <ResourcesHero
        badge={RESOURCES_HERO.badge}
        description={`${index.meta.toolCount} tools across ${RESOURCE_CATEGORIES.length} categories, each with its cost up front. ${RESOURCES_NOT_SPONSORED}`}
        highlight={RESOURCES_HERO.highlight}
        title={RESOURCES_HERO.title}
      >
        <ResourceFilters
          badgeCounts={badgeCounts}
          hasCriteria={hasCriteria}
          onChange={onChange}
          onClear={onClear}
          resultCount={results.length}
          showLegendLink
          values={values}
        />
      </ResourcesHero>

      {results.length === 0 ? <ResourceEmptyState onClear={onClear} /> : null}

      {isRanked ? <ResourceGrid tools={results} /> : null}

      {showJump ? <ResourceCategoryJump sections={sections} /> : null}

      {isRanked
        ? null
        : sections.map((section) => (
            <ResourceCategorySection
              key={section.category.id}
              section={section}
            />
          ))}

      <SectionDividerDots />
      <ResourceBadgeLegend />
      <ResourceSuggestBlock />

      <JsonLd
        data={buildToolsSchema(index.tools, "MCCE tools", RESOURCES_URL)}
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: SITE_NAME, url: SITE_URL },
          { name: "Tools", url: RESOURCES_URL },
        ])}
      />
    </main>
  );
}
