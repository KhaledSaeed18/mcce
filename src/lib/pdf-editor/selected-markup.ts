import { type AnnotationDrag, shiftAnnotation } from "./move";
import type { Annotation } from "./types";

/** The selected markup as it should be framed right now: moved along with a
 * drag that is carrying it, or where it is. */
export function findShownSelection(
  annotations: readonly Annotation[],
  selectedId: string | null,
  drag: AnnotationDrag | null
): Annotation | null {
  const selected = annotations.find(
    (annotation) => annotation.id === selectedId
  );
  if (!selected) {
    return null;
  }
  return drag?.id === selected.id
    ? shiftAnnotation(selected, drag.dx, drag.dy)
    : selected;
}
