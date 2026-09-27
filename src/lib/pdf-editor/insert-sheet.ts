import { createPageId } from "./pages";
import type { EditorPage, PageSheet } from "./types";

/**
 * A sheet put in directly after a page, the same size and turned the same way,
 * so it sits in the document like the page it follows.
 */
export function insertSheet(
  pages: EditorPage[],
  afterId: string,
  sheet: PageSheet
): EditorPage[] {
  const position = pages.findIndex((page) => page.id === afterId);
  const source = pages[position];
  if (!source) {
    return pages;
  }
  const inserted: EditorPage = {
    id: createPageId(),
    rotation: source.rotation,
    sheet,
    sourceIndex: source.sourceIndex,
  };
  return [
    ...pages.slice(0, position + 1),
    inserted,
    ...pages.slice(position + 1),
  ];
}
