import { describe, expect, it } from "vitest";
import { buildRepoHaystack, buildToolHaystack } from "./haystack";

describe("buildToolHaystack", () => {
  it("lowercases and joins name, aliases, tags, category, and description", () => {
    expect(
      buildToolHaystack({
        access: "free",
        aliases: ["draw.io"],
        category: "diagramming",
        description: "Full stencil sets.",
        id: "diagrams-net",
        isOpenSource: true,
        name: "diagrams.net",
        platform: ["web"],
        tags: ["Network"],
        url: "https://app.diagrams.net",
        verifiedOn: "2026-09-20",
      })
    ).toBe("diagrams.net draw.io network diagramming full stencil sets.");
  });
});

describe("buildRepoHaystack", () => {
  it("includes the owner slash name so a typed path matches", () => {
    expect(
      buildRepoHaystack({
        description: "Pandoc.",
        domain: "writing",
        id: "jgm-pandoc",
        languages: ["Haskell"],
        license: "GPL-2.0",
        maintenance: "active",
        name: "pandoc",
        owner: "jgm",
        reuseClass: "copyleft",
        verifiedOn: "2026-09-20",
      })
    ).toBe("jgm/pandoc pandoc haskell writing gpl-2.0 pandoc.");
  });
});
