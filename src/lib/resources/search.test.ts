import { describe, expect, it } from "vitest";
import { searchItems, tokenise } from "./search";
import { makeTool } from "./test-fixtures";

const tools = [
  makeTool({ haystack: "zotero reference citation bibtex", name: "Zotero" }),
  makeTool({ haystack: "jabref bibtex reference", name: "JabRef" }),
  makeTool({ haystack: "typst typesetting", name: "Typst" }),
  makeTool({ haystack: "notion notes kanban", name: "Notion" }),
];

describe("tokenise", () => {
  it("splits on whitespace and lowercases", () => {
    expect(tokenise("  GNU Radio ")).toEqual(["gnu", "radio"]);
  });
});

describe("searchItems", () => {
  it("returns the input untouched for an empty query", () => {
    expect(searchItems(tools, "  ")).toBe(tools);
  });

  it("ranks a name hit above a haystack hit", () => {
    expect(searchItems(tools, "bibtex").map((t) => t.name)).toEqual([
      "Zotero",
      "JabRef",
    ]);
    expect(searchItems(tools, "jab").map((t) => t.name)).toEqual(["JabRef"]);
  });

  it("expands synonyms", () => {
    expect(searchItems(tools, "latex").map((t) => t.name)).toEqual(["Typst"]);
    expect(searchItems(tools, "cite").map((t) => t.name)).toEqual([
      "Zotero",
      "JabRef",
    ]);
  });

  it("requires every token", () => {
    expect(searchItems(tools, "zotero kanban")).toEqual([]);
  });
});
