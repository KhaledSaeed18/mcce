import { SectionDividerDots } from "@/components/marketing/section-divider-dots";
import { RepoChecklist } from "@/components/resources/repo-checklist";
import { RepoDomainSection } from "@/components/resources/repo-domain-section";
import { RepoFilters } from "@/components/resources/repo-filters";
import { RepoGrid } from "@/components/resources/repo-grid";
import { ResourceEmptyState } from "@/components/resources/resource-empty-state";
import { ResourcesHero } from "@/components/resources/resources-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { OPEN_SOURCE_HERO } from "@/config/resources/copy";
import { SITE_NAME, SITE_URL } from "@/config/site";
import { useRepoResults } from "@/hooks/use-repo-results";
import type { RepoFilterValues, ResourcesIndex } from "@/lib/resources/types";
import {
  RESOURCES_OPEN_SOURCE_URL,
  RESOURCES_URL,
} from "@/lib/seo/resources-head";
import { buildReposSchema } from "@/lib/seo/resources-schema";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

interface ResourcesOpenSourcePageProps {
  index: ResourcesIndex;
  onChange: (patch: Partial<RepoFilterValues>) => void;
  onClear: () => void;
  values: RepoFilterValues;
}

export function ResourcesOpenSourcePage({
  index,
  onChange,
  onClear,
  values,
}: ResourcesOpenSourcePageProps) {
  const { hasCriteria, results, sections } = useRepoResults(
    index.repos,
    values
  );
  const isRanked = Boolean(values.q?.trim());

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-4 py-8 sm:p-6 sm:py-14">
      <ResourcesHero
        badge={OPEN_SOURCE_HERO.badge}
        description={`${index.meta.repoCount} public GitHub repositories for coursework and thesis work, each with its licence class and maintenance state.`}
        highlight={OPEN_SOURCE_HERO.highlight}
        title={OPEN_SOURCE_HERO.title}
      >
        <RepoFilters
          hasCriteria={hasCriteria}
          onChange={onChange}
          onClear={onClear}
          resultCount={results.length}
          values={values}
        />
      </ResourcesHero>

      {results.length === 0 ? <ResourceEmptyState onClear={onClear} /> : null}
      {isRanked ? <RepoGrid repos={results} /> : null}
      {isRanked
        ? null
        : sections.map((section) => (
            <RepoDomainSection key={section.domain.id} section={section} />
          ))}

      <SectionDividerDots />
      <RepoChecklist />

      <JsonLd data={buildReposSchema(index.repos, RESOURCES_OPEN_SOURCE_URL)} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: SITE_NAME, url: SITE_URL },
          { name: "Tools", url: RESOURCES_URL },
          { name: "Open source index", url: RESOURCES_OPEN_SOURCE_URL },
        ])}
      />
    </main>
  );
}
