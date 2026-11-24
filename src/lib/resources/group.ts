import type { ResourceCategory } from "@/config/resources/categories";
import { RESOURCE_CATEGORIES } from "@/config/resources/categories";
import type { RepoDomain } from "@/config/resources/repo-domains";
import { REPO_DOMAINS } from "@/config/resources/repo-domains";
import type { ThesisStage } from "@/config/resources/thesis-stages";
import { THESIS_STAGES } from "@/config/resources/thesis-stages";
import type { RepoEntry, ResourceEntry } from "./types";

export interface CategorySection {
  category: ResourceCategory;
  tools: ResourceEntry[];
}

export interface StageSection {
  stage: ThesisStage;
  tools: ResourceEntry[];
}

export interface DomainSection {
  domain: RepoDomain;
  repos: RepoEntry[];
}

/** Taxonomy order, empty sections dropped, so a filtered page reads as a short list. */
export function groupByCategory(tools: ResourceEntry[]): CategorySection[] {
  return RESOURCE_CATEGORIES.map((category) => ({
    category,
    tools: tools.filter((tool) => tool.category === category.id),
  })).filter((section) => section.tools.length > 0);
}

/** Featured picks first within a stage; a tool may appear under several stages. */
export function groupByStage(tools: ResourceEntry[]): StageSection[] {
  return THESIS_STAGES.map((stage) => ({
    stage,
    tools: tools
      .filter((tool) => tool.thesisStages?.includes(stage.id))
      .sort(
        (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
      ),
  })).filter((section) => section.tools.length > 0);
}

export function groupByDomain(repos: RepoEntry[]): DomainSection[] {
  return REPO_DOMAINS.map((domain) => ({
    domain,
    repos: repos.filter((repo) => repo.domain === domain.id),
  })).filter((section) => section.repos.length > 0);
}
