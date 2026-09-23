import { locateCharacter } from "./page-text";
import type { PageText, SearchHit, SearchMatch } from "./types";

/** Every place the query appears, page by page in the order the pages sit in
 * now. A page whose text has not been read yet is passed as undefined. */
export function findMatches(
  pages: readonly (PageText | undefined)[],
  query: string
): SearchMatch[] {
  const needle = query.trim().toLowerCase();
  if (!needle) {
    return [];
  }
  const matches: SearchMatch[] = [];
  for (const [position, page] of pages.entries()) {
    if (!page) {
      continue;
    }
    let from = page.text.indexOf(needle);
    while (from !== -1) {
      const last = locateCharacter(page, from + needle.length - 1);
      matches.push({
        end: { item: last.item, offset: last.offset + 1 },
        position,
        start: locateCharacter(page, from),
      });
      from = page.text.indexOf(needle, from + needle.length);
    }
  }
  return matches;
}

/** The matches each page has to draw, keyed by the page's position. */
export function groupHitsByPosition(
  matches: readonly SearchMatch[],
  current: number
): Map<number, SearchHit[]> {
  const hits = new Map<number, SearchHit[]>();
  for (const [index, match] of matches.entries()) {
    const list = hits.get(match.position) ?? [];
    list.push({ isCurrent: index === current, span: match });
    hits.set(match.position, list);
  }
  return hits;
}
