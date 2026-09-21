import { useMemo } from "react";
import { SectionDividerDots } from "@/components/marketing/section-divider-dots";
import { ResourceEmptyState } from "@/components/resources/resource-empty-state";
import { ResourceFilters } from "@/components/resources/resource-filters";
import { ResourcesHero } from "@/components/resources/resources-hero";
import { ThesisDefaultStack } from "@/components/resources/thesis-default-stack";
import { ThesisRouteMap } from "@/components/resources/thesis-route-map";
import { ThesisStageJump } from "@/components/resources/thesis-stage-jump";
import { ThesisStageSection } from "@/components/resources/thesis-stage-section";
import { JsonLd } from "@/components/seo/json-ld";
import { THESIS_HERO } from "@/config/resources/copy";
import { THESIS_STAGES } from "@/config/resources/thesis-stages";
import { SITE_NAME, SITE_URL } from "@/config/site";
import { useThesisSections } from "@/hooks/use-thesis-sections";
import { countByBadge } from "@/lib/resources/facets";
import type {
  ResourceFilterValues,
  ResourcesIndex,
} from "@/lib/resources/types";
import { RESOURCES_THESIS_URL, RESOURCES_URL } from "@/lib/seo/resources-head";
import { buildThesisSchema } from "@/lib/seo/resources-schema";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

interface ResourcesThesisPageProps {
  index: ResourcesIndex;
  onChange: (patch: Partial<ResourceFilterValues>) => void;
  onClear: () => void;
  values: ResourceFilterValues;
}

export function ResourcesThesisPage({
  index,
  onChange,
  onClear,
  values,
}: ResourcesThesisPageProps) {
  const { count, hasCriteria, sections } = useThesisSections(
    index.tools,
    values
  );
  const toolsById = useMemo(
    () => new Map(index.tools.map((tool) => [tool.id, tool])),
    [index.tools]
  );
  const badgeCounts = useMemo(
    () => countByBadge(index.tools.filter((tool) => tool.thesisStages?.length)),
    [index.tools]
  );
  const stageOrder = new Map(
    THESIS_STAGES.map((stage, order) => [stage.id, order])
  );

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-4 py-8 sm:p-6 sm:py-14">
      <ResourcesHero
        badge={THESIS_HERO.badge}
        description="CENG695A and CENG695B in order, from framing the topic to the defense. Each stage names its first picks, then the alternates."
        highlight={THESIS_HERO.highlight}
        title={THESIS_HERO.title}
      >
        <ThesisRouteMap />
        <ResourceFilters
          badgeCounts={badgeCounts}
          hasCriteria={hasCriteria}
          onChange={onChange}
          onClear={onClear}
          resultCount={count}
          showCategory={false}
          values={values}
        />
      </ResourcesHero>

      {sections.length === 0 ? <ResourceEmptyState onClear={onClear} /> : null}
      {sections.length > 1 ? <ThesisStageJump sections={sections} /> : null}

      {sections.map((section) => (
        <ThesisStageSection
          key={section.stage.id}
          order={stageOrder.get(section.stage.id) ?? 0}
          section={section}
        />
      ))}

      <SectionDividerDots />
      <ThesisDefaultStack toolsById={toolsById} />

      <JsonLd
        data={buildThesisSchema(
          sections.map((section) => ({
            picks: section.tools.filter((tool) => tool.featured),
            stage: section.stage,
          })),
          RESOURCES_THESIS_URL
        )}
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: SITE_NAME, url: SITE_URL },
          { name: "Tools", url: RESOURCES_URL },
          { name: "Thesis toolkit", url: RESOURCES_THESIS_URL },
        ])}
      />
    </main>
  );
}
