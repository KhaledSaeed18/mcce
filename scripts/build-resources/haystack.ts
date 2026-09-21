import type { Repository, Resource } from "../../src/lib/resources/types";

const WHITESPACE = /\s+/g;

function normalise(parts: Array<string | undefined>): string {
  return parts
    .filter((part): part is string => Boolean(part))
    .join(" ")
    .toLowerCase()
    .replace(WHITESPACE, " ")
    .trim();
}

/** Name first, then aliases and tags, then the description, so scoring can weight by position. */
export function buildToolHaystack(tool: Resource): string {
  return normalise([
    tool.name,
    ...(tool.aliases ?? []),
    ...(tool.tags ?? []),
    tool.category,
    tool.description,
  ]);
}

export function buildRepoHaystack(repo: Repository): string {
  return normalise([
    `${repo.owner}/${repo.name}`,
    repo.name,
    ...(repo.languages ?? []),
    repo.domain,
    repo.license,
    repo.description,
  ]);
}
