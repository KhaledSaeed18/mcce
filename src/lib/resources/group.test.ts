import { describe, expect, it } from "vitest";
import { groupByCategory, groupByDomain, groupByStage } from "./group";
import { makeRepo, makeTool } from "./test-fixtures";

describe("groupByCategory", () => {
  it("keeps taxonomy order and drops empty categories", () => {
    const sections = groupByCategory([
      makeTool({ category: "ml", name: "A" }),
      makeTool({ category: "dev", name: "B" }),
    ]);
    expect(sections.map((s) => s.category.id)).toEqual(["dev", "ml"]);
  });
});

describe("groupByStage", () => {
  it("puts featured picks first and repeats a tool across its stages", () => {
    const sections = groupByStage([
      makeTool({ name: "A", thesisStages: ["cite", "screen"] }),
      makeTool({ featured: true, name: "B", thesisStages: ["cite"] }),
      makeTool({ name: "C" }),
    ]);
    expect(sections.map((s) => s.stage.id)).toEqual(["screen", "cite"]);
    expect(sections[1].tools.map((t) => t.name)).toEqual(["B", "A"]);
  });
});

describe("groupByDomain", () => {
  it("groups repositories in domain order", () => {
    const sections = groupByDomain([
      makeRepo({ domain: "ml", name: "a" }),
      makeRepo({ domain: "writing", name: "b" }),
    ]);
    expect(sections.map((s) => s.domain.id)).toEqual(["writing", "ml"]);
  });
});
