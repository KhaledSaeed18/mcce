import type { BrandIconFiles } from "../../src/lib/resources/icon";
import { resolveRepoIcon, resolveToolIcon } from "../../src/lib/resources/icon";
import type {
  LinkStatus,
  RepoEntry,
  Repository,
  Resource,
  ResourceEntry,
  ResourcesIndex,
} from "../../src/lib/resources/types";
import { buildRepoHaystack, buildToolHaystack } from "./haystack";

export interface BuildInputs {
  generatedAt: string;
  icons: ReadonlyMap<string, BrandIconFiles>;
  linkStatuses: ReadonlyMap<string, LinkStatus>;
  repos: Repository[];
  tools: Resource[];
}

export function repoUrl(repo: Pick<Repository, "name" | "owner">): string {
  return `https://github.com/${repo.owner}/${repo.name}`;
}

/** Featured first, then by name, so the category order is stable across builds. */
function compareTools(a: Resource, b: Resource): number {
  const featured = Number(Boolean(b.featured)) - Number(Boolean(a.featured));
  if (featured !== 0) {
    return featured;
  }
  return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
}

function countBy<T>(
  items: T[],
  keys: (item: T) => string[]
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const item of items) {
    for (const key of keys(item)) {
      counts[key] = (counts[key] ?? 0) + 1;
    }
  }
  return counts;
}

function badgeKeys(tool: Resource): string[] {
  return tool.isOpenSource ? [tool.access, "open-source"] : [tool.access];
}

export function buildResourcesIndex(inputs: BuildInputs): ResourcesIndex {
  const { generatedAt, icons, linkStatuses, repos, tools } = inputs;
  const repoByResource = new Map<string, string>();
  for (const repo of repos) {
    if (repo.resourceId && !repoByResource.has(repo.resourceId)) {
      repoByResource.set(repo.resourceId, repo.id);
    }
  }

  const toolEntries: ResourceEntry[] = [...tools]
    .sort(compareTools)
    .map((tool) => ({
      ...tool,
      haystack: buildToolHaystack(tool),
      icon: resolveToolIcon(
        tool.id,
        tool.brandIcon ? icons.get(tool.id) : undefined
      ),
      linkStatus: linkStatuses.get(tool.url) ?? "unchecked",
      repoId: tool.repoId ?? repoByResource.get(tool.id),
    }));
  const iconByTool = new Map(toolEntries.map((tool) => [tool.id, tool.icon]));

  const repoEntries: RepoEntry[] = repos.map((repo) => {
    const url = repoUrl(repo);
    return {
      ...repo,
      haystack: buildRepoHaystack(repo),
      icon: resolveRepoIcon(
        repo.owner,
        repo.resourceId ? iconByTool.get(repo.resourceId) : undefined
      ),
      linkStatus: linkStatuses.get(url) ?? "unchecked",
      url,
    };
  });

  return {
    meta: {
      countsByBadge: countBy(tools, badgeKeys),
      countsByCategory: countBy(tools, (tool) => [tool.category]),
      countsByDomain: countBy(repos, (repo) => [repo.domain]),
      countsByStage: countBy(tools, (tool) => tool.thesisStages ?? []),
      generatedAt,
      repoCount: repos.length,
      toolCount: tools.length,
    },
    repos: repoEntries,
    tools: toolEntries,
  };
}
