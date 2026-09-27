import type { EditorPage } from "./types";

/** Where a page of the file sits in the document now, or -1 once it has been
 * taken out. A page shown more than once is found at its first place. */
export function findSourcePosition(
  pages: readonly EditorPage[],
  sourceIndex: number
): number {
  return pages.findIndex(
    (page) => page.sourceIndex === sourceIndex && !page.sheet
  );
}
