import { describe, expect, it } from "vitest";
import { filterRepos, filterResources } from "./filter";
import { makeRepo, makeTool } from "./test-fixtures";

const tools = [
  makeTool({ access: "free", category: "dev", isOpenSource: true, name: "A" }),
  makeTool({ access: "freemium", category: "dev", name: "B" }),
  makeTool({ access: "student", category: "ml", name: "C" }),
];

describe("filterResources", () => {
  it("returns everything with no filters", () => {
    expect(filterResources(tools, {})).toHaveLength(3);
  });

  it("narrows by category", () => {
    expect(
      filterResources(tools, { category: "ml" }).map((t) => t.name)
    ).toEqual(["C"]);
  });

  it("widens across badges and treats open-source as a badge", () => {
    expect(
      filterResources(tools, { badge: ["student", "open-source"] }).map(
        (t) => t.name
      )
    ).toEqual(["A", "C"]);
  });

  it("combines category and badge with AND", () => {
    expect(
      filterResources(tools, { badge: ["free", "freemium"], category: "dev" })
    ).toHaveLength(2);
    expect(
      filterResources(tools, { badge: ["student"], category: "dev" })
    ).toHaveLength(0);
  });
});

describe("filterRepos", () => {
  const repos = [
    makeRepo({
      domain: "writing",
      maintenance: "active",
      name: "a",
      reuseClass: "permissive",
    }),
    makeRepo({
      domain: "ml",
      maintenance: "dormant",
      name: "b",
      reuseClass: "copyleft",
    }),
  ];

  it("filters by domain, licence class, and maintenance", () => {
    expect(filterRepos(repos, { domain: "ml" }).map((r) => r.name)).toEqual([
      "b",
    ]);
    expect(
      filterRepos(repos, { license: "permissive" }).map((r) => r.name)
    ).toEqual(["a"]);
    expect(
      filterRepos(repos, { maintenance: "dormant" }).map((r) => r.name)
    ).toEqual(["b"]);
  });
});
