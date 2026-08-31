import { describe, expect, it } from "vitest";
import driveIndex from "@/data/drive-index.json";
import { buildHeroSearchQueries } from "@/lib/drive/hero-search";
import type { DriveIndex } from "@/lib/drive/types";
import { HERO_SEARCH_ROW_COUNT, HERO_SEARCH_TERMS } from "./hero-search";

const { nodes } = driveIndex as DriveIndex;
const FILE_NAMES = new Set(
  nodes.filter((node) => node.kind !== "folder").map((file) => file.name)
);
const QUERIES = buildHeroSearchQueries(nodes);

/**
 * The panel quotes files and counts from the index, so a Drive sync cannot move
 * them out from under it. What is worth holding is that each search still stands
 * for something: a term that stopped matching anything would leave the home page
 * demonstrating an empty result list.
 */
describe("buildHeroSearchQueries", () => {
  it("builds one search for every term the panel cycles through", () => {
    expect(QUERIES.map((query) => query.term)).toEqual(HERO_SEARCH_TERMS);
  });

  it("counts every indexed file whose name carries the term", () => {
    for (const query of QUERIES) {
      const matches = nodes.filter(
        (node) =>
          node.kind !== "folder" &&
          node.name.toLowerCase().includes(query.term.toLowerCase())
      );
      expect(query.total).toBe(matches.length);
    }
  });

  it("still finds material for every term", () => {
    for (const query of QUERIES) {
      expect(query.total).toBeGreaterThan(0);
      expect(query.results.length).toBeGreaterThan(0);
    }
  });

  it("shows rows that are real files in the index", () => {
    for (const query of QUERIES) {
      for (const result of query.results) {
        expect(FILE_NAMES.has(result.name)).toBe(true);
      }
    }
  });

  it("shows only rows that carry the term they were found by", () => {
    for (const query of QUERIES) {
      for (const result of query.results) {
        expect(result.name.toLowerCase()).toContain(query.term.toLowerCase());
      }
    }
  });

  it("holds back more matches than it shows", () => {
    for (const query of QUERIES) {
      expect(query.results.length).toBeLessThanOrEqual(HERO_SEARCH_ROW_COUNT);
      expect(query.total).toBeGreaterThanOrEqual(query.results.length);
    }
  });

  it("takes each row from a different course, so the list looks like a search", () => {
    for (const query of QUERIES) {
      const courses = query.results.map((result) => result.courseCode);
      expect(new Set(courses).size).toBe(courses.length);
    }
  });
});
