import { describe, expect, it } from "vitest";
import { resolveRepoIcon, resolveToolIcon, toMonogram } from "./icon";

describe("resolveToolIcon", () => {
  it("falls back to the category icon without a brand file", () => {
    expect(resolveToolIcon("zotero", undefined)).toEqual({ kind: "category" });
  });

  it("points at the light and dark files when both exist", () => {
    expect(resolveToolIcon("github", { hasDark: true })).toEqual({
      dark: "/resources/icons/github-dark.svg",
      kind: "brand",
      light: "/resources/icons/github.svg",
    });
  });

  it("omits dark when svgl ships one file", () => {
    expect(resolveToolIcon("notion", { hasDark: false })).toEqual({
      dark: undefined,
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
