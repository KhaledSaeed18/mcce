import { withKnownPages } from "./pages";
import type { EditorSnapshot } from "./types";

/**
 * A stored file measured against the file it was saved for. Pages the file no
 * longer has are dropped, and so is the markup that was on them: it has nothing
 * left to be drawn on or exported against, and would otherwise sit in storage
 * for as long as the file is kept.
 */
export function reconcileWithFile(
  snapshot: EditorSnapshot,
  pageCount: number
): EditorSnapshot {
  const pages = withKnownPages(snapshot.pages, pageCount);
  const known = new Set(pages.map((page) => page.id));

  return {
    annotations: snapshot.annotations.filter((annotation) =>
      known.has(annotation.pageId)
    ),
    pages,
  };
}
