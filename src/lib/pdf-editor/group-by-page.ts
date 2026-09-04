import type { Annotation } from "./types";

/**
 * The markup each page carries. Grouping once and holding on to the result keeps
 * every page's list the same list between renders, which is what stops each of
 * them redrawing its canvas whenever anything else in the editor changes.
 */
export function groupAnnotationsByPage(
  annotations: Annotation[]
): Map<string, Annotation[]> {
  const groups = new Map<string, Annotation[]>();

  for (const annotation of annotations) {
    const group = groups.get(annotation.pageId);
    if (group) {
      group.push(annotation);
      continue;
    }
    groups.set(annotation.pageId, [annotation]);
  }

  return groups;
}
