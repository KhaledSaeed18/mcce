import type { EditorPage } from "./types";

/**
 * Markup points at a page by identity rather than by number, so that it stays
 * with the page when other pages come and go around it. The identity of a page
 * the file itself came with is derived from its place in the file, so markup
 * saved before pages had identities still finds its page.
 */
export function buildPageId(sourceIndex: number): string {
  return `p${sourceIndex}`;
}

/** The document as it arrives: every page once, upright, in the file's own order. */
export function buildPages(pageCount: number): EditorPage[] {
  return Array.from({ length: pageCount }, (_, sourceIndex) => ({
    id: buildPageId(sourceIndex),
    rotation: 0,
    sourceIndex,
  }));
}
