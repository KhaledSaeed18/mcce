import { describe, expect, it } from "vitest";
import { resolveRepoIcon, resolveToolIcon, toMonogram } from "./icon";

describe("resolveToolIcon", () => {
  it("falls back to the category icon without a brand file", () => {
    expect(resolveToolIcon("zotero", false)).toEqual({ kind: "category" });
  });

  it("points at the light file when one was fetched", () => {
    expect(resolveToolIcon("notion", true)).toEqual({
      kind: "brand",
      light: "/resources/icons/notion.svg",
    });
  });
});

describe("resolveRepoIcon", () => {
  it("borrows the tool brand icon", () => {
    const brand = { kind: "brand" as const, light: "/resources/icons/x.svg" };
    expect(resolveRepoIcon("owner", brand)).toBe(brand);
  });

  it("uses a monogram otherwise", () => {
    expect(resolveRepoIcon("Future-House", { kind: "category" })).toEqual({
      kind: "monogram",
      text: "FU",
    });
  });
});

describe("toMonogram", () => {
  it("keeps two alphanumerics, uppercased", () => {
    expect(toMonogram("jgm")).toBe("JG");
    expect(toMonogram("777arc")).toBe("77");
  });
});
