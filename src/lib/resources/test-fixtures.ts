import type { RepoEntry, ResourceEntry } from "./types";

export function makeTool(
  overrides: Partial<ResourceEntry> = {}
): ResourceEntry {
  const name = overrides.name ?? "Tool";
  return {
    access: "free",
    category: "dev",
    description: "A tool.",
    haystack: name.toLowerCase(),
    icon: { kind: "category" },
    id: name.toLowerCase(),
    isOpenSource: false,
    linkStatus: "ok",
    name,
    platform: ["web"],
    url: `https://example.com/${name.toLowerCase()}`,
    verifiedOn: "2026-09-20",
    ...overrides,
  };
}

export function makeRepo(overrides: Partial<RepoEntry> = {}): RepoEntry {
  const name = overrides.name ?? "repo";
  return {
    description: "A repository.",
    domain: "writing",
    haystack: `owner/${name} ${name}`,
    icon: { kind: "monogram", text: "OW" },
    id: `owner-${name}`,
    license: "MIT",
    linkStatus: "ok",
    maintenance: "active",
    name,
    owner: "owner",
    reuseClass: "permissive",
    url: `https://github.com/owner/${name}`,
    verifiedOn: "2026-09-20",
    ...overrides,
  };
}
