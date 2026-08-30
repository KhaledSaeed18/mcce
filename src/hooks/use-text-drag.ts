import { useCallback, useRef, useState } from "react";
import { TEXT_MOVE_TOLERANCE } from "@/config/pdf-editor";
import { type AnnotationDrag, findTextAt } from "@/lib/pdf-editor/move";
import { boundedTextDelta } from "@/lib/pdf-editor/text-move";
import type {
  Annotation,
  PageSize,
  Point,
  TextAnnotation,
} from "@/lib/pdf-editor/types";

interface TextDragOptions {
  annotations: Annotation[];
  onMove: (id: string, dx: number, dy: number) => void;
  pageId: string;
  size: PageSize;
}

/** What the release found: which text was pressed, and whether the press moved it. */
export interface TextDragResult {
  moved: boolean;
  target: TextAnnotation;
}

/** Repositioning text already on the page: press it, drag, and the move lands as one undo step. */
export function useTextDrag({
  annotations,
  onMove,
  pageId,
  size,
}: TextDragOptions) {
  const [drag, setDrag] = useState<AnnotationDrag | null>(null);
  const dragRef = useRef<AnnotationDrag | null>(null);
  const originRef = useRef<Point | null>(null);
  const targetRef = useRef<TextAnnotation | null>(null);
  // Measured from the pointer, not from the text, which stops at the page edge.
  const hasTravelledRef = useRef(false);

  const update = useCallback((next: AnnotationDrag | null) => {
    dragRef.current = next;
    setDrag(next);
  }, []);

  /** True when the press landed on text, which means it starts a move rather than a new field. */
  const start = useCallback(
    (point: Point) => {
      const target = findTextAt(annotations, pageId, point);
      if (!target) {
        return false;
      }
      originRef.current = point;
      targetRef.current = target;
      hasTravelledRef.current = false;
      update({ dx: 0, dy: 0, id: target.id });
      return true;
    },
    [annotations, pageId, update]
  );

  const move = useCallback(
    (point: Point) => {
      const { current: origin } = originRef;
      const { current: target } = targetRef;
      // biome-ignore lint/suspicious/noUnnecessaryConditions: both refs are filled by start(), a sibling callback the analyzer cannot see across
      if (!(origin && target)) {
        return;
      }
      if (
        Math.hypot(point.x - origin.x, point.y - origin.y) > TEXT_MOVE_TOLERANCE
      ) {
        hasTravelledRef.current = true;
      }
      const delta = boundedTextDelta(target, origin, point, size);
      update({ dx: delta.x, dy: delta.y, id: target.id });
    },
    [size, update]
  );

  /** Non-null when a press was in progress, so the release must not open a new field. */
  const end = useCallback((): TextDragResult | null => {
    const { current } = dragRef;
    const { current: target } = targetRef;
    // biome-ignore lint/suspicious/noUnnecessaryConditions: the refs hold a press only between start() and this release
    if (!(current && target)) {
      return null;
    }
    const moved = hasTravelledRef.current;
    originRef.current = null;
    targetRef.current = null;
    update(null);
    if (current.dx !== 0 || current.dy !== 0) {
      onMove(current.id, current.dx, current.dy);
    }
    return { moved, target };
  }, [onMove, update]);

  return { drag, end, move, start };
}
