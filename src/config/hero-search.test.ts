import { describe, expect, it } from "vitest";
import driveIndex from "@/data/drive-index.json";
import type { DriveIndex } from "@/lib/drive/types";
import { HERO_SEARCH_QUERIES } from "./hero-search";

const { nodes } = driveIndex as DriveIndex;
const FILES = nodes.filter((node) => node.kind !== "folder");
const FILE_NAMES = new Set(FILES.map((file) => file.name));

function countMatches(term: string): number {
  const needle = term.toLowerCase();
  return FILES.filter((file) => file.name.toLowerCase().includes(needle))
    .length;
}

/** The home page panel quotes files and counts that a weekly Drive sync can
 * move out from under it. Without this, the page would go on advertising
 * material the program no longer has, and nothing else would notice. */
describe.each(HERO_SEARCH_QUERIES.map((query) => [query.term, query] as const))(
  "hero search: %s",
  (term, query) => {
    it("shows rows that are real files in the index", () => {
      for (const result of query.results) {
        expect(FILE_NAMES.has(result.name)).toBe(true);
      }
    });

    it("counts every indexed file whose name carries the term", () => {
      expect(query.total).toBe(countMatches(term));
    });

    it("holds back more matches than it shows", () => {
      expect(query.total).toBeGreaterThanOrEqual(query.results.length);
    });
  }
);
