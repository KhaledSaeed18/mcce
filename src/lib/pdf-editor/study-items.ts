import { getAnnotationBox } from "./annotation-box";
import type { Annotation, EditorPage, StudyItem } from "./types";

/** A note or a highlight as the list shows it, or null for other markup. */
function toStudyItem(
  annotation: Annotation,
  position: number
): StudyItem | null {
  if (annotation.type === "note") {
    return { annotation, position, text: annotation.text };
  }
  if (annotation.type === "highlight") {
    return { annotation, position, text: "" };
  }
  if (annotation.type === "mark" && annotation.style === "highlight") {
    return { annotation, position, text: annotation.text ?? "" };
  }
  return null;
}

/** Every note and highlight on pages still in the document, in the order they
 * are read: page by page, then down each page, then across. */
export function collectStudyItems(
  annotations: readonly Annotation[],
  pages: readonly EditorPage[]
): StudyItem[] {
  const positions = new Map(pages.map((page, position) => [page.id, position]));
  const items = annotations.flatMap((annotation) => {
    const position = positions.get(annotation.pageId);
    const item =
      position === undefined ? null : toStudyItem(annotation, position);
    return item ? [item] : [];
  });
  return items
    .map((item) => ({ box: getAnnotationBox(item.annotation), item }))
    .sort(
      (a, b) =>
        a.item.position - b.item.position ||
        a.box.y - b.box.y ||
        a.box.x - b.box.x
    )
    .map(({ item }) => item);
}

export interface StudyPageGroup {
  items: StudyItem[];
  position: number;
}

/** The items as they fall on each page, for listing under the page's number. */
export function groupStudyItems(items: readonly StudyItem[]): StudyPageGroup[] {
  const groups: StudyPageGroup[] = [];
  for (const item of items) {
    const last = groups.at(-1);
    if (last?.position === item.position) {
      last.items.push(item);
    } else {
      groups.push({ items: [item], position: item.position });
    }
  }
  return groups;
}
