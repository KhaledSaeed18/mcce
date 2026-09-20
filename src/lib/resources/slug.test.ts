import { describe, expect, it } from "vitest";
import { isValidResourceId, toResourceId } from "./slug";

describe("isValidResourceId", () => {
  it("accepts kebab-case ascii", () => {
    expect(isValidResourceId("zotero-better-bibtex")).toBe(true);
    expect(isValidResourceId("ns3-5g-lena")).toBe(true);
  });

  it("rejects case, spaces, and edge hyphens", () => {
    expect(isValidResourceId("Zotero")).toBe(false);
    expect(isValidResourceId("gnu radio")).toBe(false);
    expect(isValidResourceId("-lead")).toBe(false);
    expect(isValidResourceId("double--hyphen")).toBe(false);
  });
});

describe("toResourceId", () => {
  it("slugs an owner and name pair", () => {
    expect(toResourceId("JabRef/jabref")).toBe("jabref-jabref");
    expect(toResourceId("Future-House/paper-qa")).toBe("future-house-paper-qa");
  });
});
