import { useLayoutEffect } from "react";
import { getAnnotationBox } from "@/lib/pdf-editor/annotation-box";
import { clampDelta } from "@/lib/pdf-editor/bounds";
import { shiftAnnotation } from "@/lib/pdf-editor/move";
import type { Annotation, PageSize } from "@/lib/pdf-editor/types";

/**
 * Brings back selected markup that has landed off the page, which is where a
 * paste or a copy can put it. Only what is truly over the edge moves: a stroke
 * drawn up to the edge sits inside the small margin dragging keeps to, and
 * selecting it must not nudge it.
 */
export function useKeepSelectedOnPage(
  selected: Annotation | null,
  isMeasured: boolean,
  size: PageSize,
  onReplace: (annotation: Annotation) => void
): void {
  useLayoutEffect(() => {
    if (!(selected && isMeasured)) {
      return;
    }
    const box = getAnnotationBox(selected);
    const isOver =
      box.x < 0 ||
      box.y < 0 ||
      box.x + box.width > size.width ||
      box.y + box.height > size.height;
    if (isOver) {
      const { x, y } = clampDelta(box, { x: 0, y: 0 }, size);
      onReplace(shiftAnnotation(selected, x, y));
    }
  }, [isMeasured, onReplace, selected, size]);
}
