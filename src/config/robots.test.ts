import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { DRIVE_SOURCES } from "@/config/sources";

const robots = readFileSync("public/robots.txt", "utf8");

describe("robots.txt", () => {
  it("allows Google-Extended", () => {
    expect(robots).toContain("User-agent: Google-Extended\nAllow: /");
  });

  it("keeps every Drive source root crawlable while blocking other folders", () => {
    expect(robots).toContain("Disallow: /browse/");

    for (const source of DRIVE_SOURCES) {
      expect(robots).toContain(`Allow: /browse/${source.rootFolderId}$`);
    }
  });
});
