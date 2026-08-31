import { createPageId } from "./pages";
import { createAnnotationId } from "./pointer";
import type { EditorSnapshot } from "./types";

/**
 * A page and everything drawn on it, put back in directly after the original.
 * The copy is a page in its own right: it gets its own identity, and so does
 * each piece of markup on it, so editing one copy leaves the other alone.
 */
export function duplicatePage(
  snapshot: EditorSnapshot,
  id: string
): EditorSnapshot {
  const position = snapshot.pages.findIndex((page) => page.id === id);
  const source = snapshot.pages[position];
  if (!source) {
    return snapshot;
  }

  const copy = { ...source, id: createPageId() };
  const copied = snapshot.annotations
    .filter((annotation) => annotation.pageId === id)
    .map((annotation) => ({
      ...annotation,
      id: createAnnotationId(),
      pageId: copy.id,
    }));

  return {
    annotations: [...snapshot.annotations, ...copied],
    pages: [
      ...snapshot.pages.slice(0, position + 1),
      copy,
      ...snapshot.pages.slice(position + 1),
    ],
  };
}
