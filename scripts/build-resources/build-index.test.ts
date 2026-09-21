import { describe, expect, it } from "vitest";
import type { Repository, Resource } from "../../src/lib/resources/types";
import { buildResourcesIndex, repoUrl } from "./build-index";

const tools: Resource[] = [
  {
    access: "free",
    category: "references",
    description: "Reference manager.",
    id: "zotero",
    isOpenSource: true,
    name: "Zotero",
    platform: ["desktop"],
    thesisStages: ["cite"],
    url: "https://www.zotero.org",
    verifiedOn: "2026-09-20",
  },
  {
    access: "freemium",
    brandIcon: "Notion",
    category: "productivity",
    description: "Notes.",
    featured: true,
    id: "notion",
    isOpenSource: false,
    name: "Notion",
    platform: ["web"],
    url: "https://www.notion.so",
    verifiedOn: "2026-09-20",
  },
];

const repos: Repository[] = [
  {
    description: "Zotero client.",
    domain: "references",
    id: "zotero-zotero",
    license: "AGPL-3.0",
    maintenance: "active",
    name: "zotero",
    owner: "zotero",
    resourceId: "zotero",
    reuseClass: "copyleft",
    verifiedOn: "2026-09-20",
  },
];

describe("buildResourcesIndex", () => {
  const index = buildResourcesIndex({
    generatedAt: "2026-09-20T00:00:00.000Z",
    icons: new Set(["notion"]),
    linkStatuses: new Map([["https://www.zotero.org", "ok"]]),
    repos,
    tools,
  });

  it("sorts featured tools first and resolves icons", () => {
    expect(index.tools.map((tool) => tool.id)).toEqual(["notion", "zotero"]);
    expect(index.tools[0].icon).toEqual({
      kind: "brand",
      light: "/resources/icons/notion.svg",
    });
    expect(index.tools[1].icon).toEqual({ kind: "category" });
  });

  it("stamps link status and cross-links repos", () => {
    expect(index.tools[1].linkStatus).toBe("ok");
    expect(index.tools[1].repoId).toBe("zotero-zotero");
    expect(index.tools[0].linkStatus).toBe("unchecked");
    expect(index.repos[0].url).toBe("https://github.com/zotero/zotero");
    expect(index.repos[0].icon).toEqual({ kind: "monogram", text: "ZO" });
  });

  it("counts by category, badge, stage, and domain", () => {
    expect(index.meta.countsByCategory).toEqual({
      productivity: 1,
      references: 1,
    });
    expect(index.meta.countsByBadge).toEqual({
      free: 1,
      freemium: 1,
      "open-source": 1,
    });
    expect(index.meta.countsByStage).toEqual({ cite: 1 });
    expect(index.meta.countsByDomain).toEqual({ references: 1 });
    expect(index.meta.toolCount).toBe(2);
  });
});

describe("repoUrl", () => {
  it("builds the GitHub URL", () => {
    expect(repoUrl({ name: "pandoc", owner: "jgm" })).toBe(
      "https://github.com/jgm/pandoc"
    );
  });
});
