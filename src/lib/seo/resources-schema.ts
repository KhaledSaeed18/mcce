import { RESOURCE_CATEGORY_BY_ID } from "@/config/resources/categories";
import type { ThesisStage } from "@/config/resources/thesis-stages";
import type { RepoEntry, ResourceEntry } from "@/lib/resources/types";

/** Enough for a directory snippet without shipping the whole catalog twice. */
const ITEM_LIST_CAP = 100;

function toSoftwareApplication(tool: ResourceEntry, position: number) {
  return {
    "@type": "ListItem",
    item: {
      "@type": "SoftwareApplication",
      applicationCategory: RESOURCE_CATEGORY_BY_ID.get(tool.category)?.label,
      description: tool.description,
      name: tool.name,
      ...(tool.access === "free"
        ? { offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }
        : {}),
      url: tool.url,
    },
    position,
  };
}

export function buildToolsSchema(
  tools: ResourceEntry[],
  name: string,
  url: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: tools
        .slice(0, ITEM_LIST_CAP)
        .map((tool, index) => toSoftwareApplication(tool, index + 1)),
      numberOfItems: tools.length,
    },
    name,
    url,
  };
}

interface StageWithPicks {
  picks: ResourceEntry[];
  stage: ThesisStage;
}

export function buildThesisSchema(stages: StageWithPicks[], url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "MCCE thesis toolkit",
    step: stages.map(({ picks, stage }, index) => ({
      "@type": "HowToStep",
      name: stage.label,
      position: index + 1,
      text: stage.note,
      tool: picks.map((pick) => ({ "@type": "HowToTool", name: pick.name })),
    })),
    url,
  };
}

export function buildReposSchema(repos: RepoEntry[], url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: repos.slice(0, ITEM_LIST_CAP).map((repo, index) => ({
        "@type": "ListItem",
        item: {
          "@type": "SoftwareSourceCode",
          codeRepository: repo.url,
          description: repo.description,
          license: repo.license,
          name: `${repo.owner}/${repo.name}`,
        },
        position: index + 1,
      })),
      numberOfItems: repos.length,
    },
    name: "MCCE open source index",
    url,
  };
}
