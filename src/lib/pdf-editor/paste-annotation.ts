import { PASTE_OFFSET } from "@/config/pdf-editor";
import { shiftAnnotation } from "./move";
import { createAnnotationId } from "./pointer";
import type { Annotation } from "./types";

/** A copy of markup for pasting onto a page: its own identity, on that page,
 * set down `step` offsets from where the original sits. */
export function pasteAnnotation(
  original: Annotation,
  pageId: string,
  step: number
): Annotation {
  const offset = PASTE_OFFSET * step;
  return {
    ...shiftAnnotation(original, offset, offset),
    id: createAnnotationId(),
    pageId,
  };
}
