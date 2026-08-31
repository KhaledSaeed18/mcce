import type {
  HeroSearchQuery,
  HeroSearchResult,
} from "@/components/marketing/types";
import { HERO_SEARCH_ROW_COUNT, HERO_SEARCH_TERMS } from "@/config/hero-search";
import type { DriveNode } from "./types";

function toResult(node: DriveNode, courseCode: string): HeroSearchResult {
  return {
    courseCode,
    kind: node.kind,
    materialType: node.materialType,
    name: node.name,
  };
}

/** A few rows from different courses, so the panel reads like a real result list. */
function pickRows(matches: DriveNode[]): HeroSearchResult[] {
  const rows: HeroSearchResult[] = [];
  const courses = new Set<string>();

  for (const node of matches) {
    if (rows.length === HERO_SEARCH_ROW_COUNT) {
      break;
    }
    if (node.courseCode && !courses.has(node.courseCode)) {
      courses.add(node.courseCode);
      rows.push(toResult(node, node.courseCode));
    }
  }

  return rows;
}

/**
 * What the home page panel shows, read from the index it claims to be searching.
 *
 * The rows and the counts were once written out by hand, which a Drive sync
 * quietly falsified every time it ran: the panel went on advertising a number
 * of files the program no longer had, and only a test comparing the two noticed.
 * Reading them from the index leaves nothing to fall out of step.
 */
export function buildHeroSearchQueries(nodes: DriveNode[]): HeroSearchQuery[] {
  const files = nodes.filter((node) => node.kind !== "folder");

  return HERO_SEARCH_TERMS.map((term) => {
    const needle = term.toLowerCase();
    const matches = files.filter((file) =>
      file.name.toLowerCase().includes(needle)
    );
    return { results: pickRows(matches), term, total: matches.length };
  });
}
