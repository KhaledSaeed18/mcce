import { NOTE_COLOR } from "@/config/pdf-editor";
import { clampBox } from "./bounds";
import { getNoteBox } from "./note-box";
import { createAnnotationId } from "./pointer";
import type { NoteAnnotation, PageSize, Point } from "./types";

/** A note pinned where the page was pressed, pulled in so its icon stays on
 * the page. It starts out empty, open for writing. */
export function buildNote(
  point: Point,
  pageId: string,
  size: PageSize
): NoteAnnotation {
  const { x, y } = clampBox(getNoteBox(point), size);
  return {
    color: NOTE_COLOR,
    id: createAnnotationId(),
    pageId,
    text: "",
    type: "note",
    x,
    y,
  };
}
