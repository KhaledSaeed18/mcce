import { type PointerEvent, useCallback, useRef } from "react";
import { buildNote } from "@/lib/pdf-editor/build-note";
import { findAnnotationAt } from "@/lib/pdf-editor/move";
import { toPagePoint } from "@/lib/pdf-editor/pointer";
import type { Annotation, PageSize, Point } from "@/lib/pdf-editor/types";

interface NoteToolOptions {
  annotations: Annotation[];
  onAdd: (annotation: Annotation) => void;
  onSelect: (id: string | null) => void;
  pageId: string;
  rotation: number;
  size: PageSize;
  zoom: number;
}

const IGNORE = () => undefined;

/**
 * A press pins a new note there and opens it for writing. A press on a note
 * already there opens that one instead. The note opens on the release, as a
 * text field does, since the click that follows a press would take focus from
 * a card that opened on the press.
 */
export function useNoteTool({
  annotations,
  onAdd,
  onSelect,
  pageId,
  rotation,
  size,
  zoom,
}: NoteToolOptions) {
  const pressRef = useRef<Point | null>(null);

  const handleDown = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      pressRef.current = toPagePoint(event, zoom, size, rotation);
    },
    [rotation, size, zoom]
  );

  const handleUp = useCallback(() => {
    const point = pressRef.current;
    pressRef.current = null;
    if (!point) {
      return;
    }
    const existing = findAnnotationAt(annotations, pageId, point);
    if (existing?.type === "note") {
      onSelect(existing.id);
      return;
    }
    const note = buildNote(point, pageId, size);
    onAdd(note);
    onSelect(note.id);
  }, [annotations, onAdd, onSelect, pageId, size]);

  return { handleDown, handleMove: IGNORE, handleUp };
}
