import { PAGE_FULL_TURN, PAGE_QUARTER_TURN } from "@/config/pdf-editor";
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

/** A page put in on top of the ones the file came with needs an identity of its own. */
export function createPageId(): string {
  return crypto.randomUUID();
}

/** The document as it arrives: every page once, upright, in the file's own order. */
export function buildPages(pageCount: number): EditorPage[] {
  return Array.from({ length: pageCount }, (_, sourceIndex) => ({
    id: buildPageId(sourceIndex),
    rotation: 0,
    sourceIndex,
  }));
}

/** A document has to keep a page, so the last one left is not removable. */
export function withoutPage(pages: EditorPage[], id: string): EditorPage[] {
  if (pages.length < 2) {
    return pages;
  }
  return pages.filter((page) => page.id !== id);
}

/** Turns one page a quarter further round, coming back upright after four. */
export function turnPage(pages: EditorPage[], id: string): EditorPage[] {
  return pages.map((page) =>
    page.id === id
      ? {
          ...page,
          rotation: (page.rotation + PAGE_QUARTER_TURN) % PAGE_FULL_TURN,
        }
      : page
  );
}

/** Takes the page at one place in the list and puts it back in at another. */
export function movePage(
  pages: EditorPage[],
  from: number,
  to: number
): EditorPage[] {
  const page = pages[from];
  // A page carried past either end of the document stops at that end.
  const target = Math.min(Math.max(to, 0), pages.length - 1);
  if (!page || from === target) {
    return pages;
  }
  const rest = pages.filter((_, position) => position !== from);
  return [...rest.slice(0, target), page, ...rest.slice(target)];
}

/** Pages the file no longer has, from markup saved against a file since replaced. */
export function withKnownPages(
  pages: EditorPage[],
  pageCount: number
): EditorPage[] {
  const known = pages.filter((page) => page.sourceIndex < pageCount);
  return known.length > 0 ? known : buildPages(pageCount);
}
