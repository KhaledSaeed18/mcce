import { describe, expect, it } from "vitest";
import type { Repository, Resource } from "../../src/lib/resources/types";
import { type ValidationContext, validateCatalog } from "./validate";

const context: ValidationContext = {
  categoryIds: new Set(["dev"]),
  courseCodes: new Set(["CENG507"]),
  domainIds: new Set(["writing"]),
  stageIds: new Set(["write"]),
};

function makeTool(overrides: Partial<Resource> = {}): Resource {
  return {
    access: "free",
    category: "dev",
    description: "An editor.",
    id: "vs-code",
    isOpenSource: true,
    name: "VS Code",
    platform: ["desktop"],
    url: "https://code.visualstudio.com",
    verifiedOn: "2026-09-20",
    ...overrides,
  };
}

function makeRepo(overrides: Partial<Repository> = {}): Repository {
  return {
    description: "Pandoc.",
    domain: "writing",
    id: "jgm-pandoc",
    license: "GPL-2.0",
    maintenance: "active",
    name: "pandoc",
    owner: "jgm",
    reuseClass: "copyleft",
    verifiedOn: "2026-09-20",
    ...overrides,
  };
}

describe("validateCatalog", () => {
  it("passes a minimal valid catalog", () => {
    expect(validateCatalog([makeTool()], [makeRepo()], context)).toEqual([]);
  });

  it("reports duplicate ids and urls", () => {
    const out = validateCatalog([makeTool(), makeTool()], [], context);
    expect(out).toContain("duplicate tool id: vs-code");
    expect(out).toContain("duplicate tool url: https://code.visualstudio.com");
  });

  it("rejects trailing slashes and query strings", () => {
    const out = validateCatalog(
      [makeTool({ url: "https://example.com/?x=1" })],
      [],
      context
    );
    expect(out.some((line) => line.includes("no query"))).toBe(true);
  });

  it("requires liu verification for university access", () => {
    const out = validateCatalog(
      [makeTool({ access: "university" })],
      [],
      context
    );
    expect(out).toContain(
      'tool vs-code: university access must carry verification "liu"'
    );
  });

  it("checks stage, course, domain, and resource references", () => {
    const out = validateCatalog(
      [makeTool({ courses: ["EENG999"], thesisStages: ["defend"] })],
      [makeRepo({ domain: "ml", resourceId: "missing" })],
      context
    );
    expect(out).toContain("tool vs-code: unknown course code EENG999");
    expect(out).toContain("tool vs-code: unknown thesis stage defend");
    expect(out).toContain("repo jgm/pandoc: unknown domain ml");
    expect(out).toContain(
      "repo jgm/pandoc: resourceId missing does not match a tool"
    );
  });

  it("flags an empty category", () => {
    expect(validateCatalog([], [], context)).toContain(
      "category dev has no tools"
    );
  });
});
