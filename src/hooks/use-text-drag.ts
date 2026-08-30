import { useCallback, useRef, useState } from "react";
import { clampTextAnchor } from "@/lib/pdf-editor/bounds";
import { type AnnotationDrag, findTextAt } from "@/lib/pdf-editor/move";
import { getTextBox } from "@/lib/pdf-editor/text-metrics";
import type {
  Annotation,
  PageSize,
  Point,
  TextAnnotation,
} from "@/lib/pdf-editor/types";

interface TextDragOptions {
  annotations: Annotation[];
  onMove: (id: string, dx: number, dy: number) => void;
  pageIndex: number;
  size: PageSize;
}

/** How far the text can follow the pointer before its box would leave the page. */
function toBoundedDelta(
  target: TextAnnotation,
  point: Point,
  origin: Point,
  size: PageSize
): Pick<AnnotationDrag, "dx" | "dy"> {
  const moved = {
    x: target.x + point.x - origin.x,
    y: target.y + point.y - origin.y,
  };
  const anchor = clampTextAnchor(
    moved,
    getTextBox({ ...target, ...moved }),
    size
  );
  return { dx: anchor.x - target.x, dy: anchor.y - target.y };
}

/** Repositioning text already on the page: press it, drag, and the move lands as one undo step. */
export function useTextDrag({
  annotations,
  onMove,
  pageIndex,
  size,
}: TextDragOptions) {
  const [drag, setDrag] = useState<AnnotationDrag | null>(null);
  const dragRef = useRef<AnnotationDrag | null>(null);
  const originRef = useRef<Point | null>(null);
  const targetRef = useRef<TextAnnotation | null>(null);

  const update = useCallback((next: AnnotationDrag | null) => {
    dragRef.current = next;
    setDrag(next);
  }, []);

  /** True when the press landed on text, which means it starts a move rather than a new field. */
  const start = useCallback(
    (point: Point) => {
      const target = findTextAt(annotations, pageIndex, point);
      if (!target) {
        return false;
      }
      originRef.current = point;
      targetRef.current = target;
      update({ dx: 0, dy: 0, id: target.id });
      return true;
    },
    [annotations, pageIndex, update]
  );

  const move = useCallback(
    (point: Point) => {
      const { current: origin } = originRef;
      const { current: target } = targetRef;
      // biome-ignore lint/suspicious/noUnnecessaryConditions: both refs are filled by start(), a sibling callback the analyzer cannot see across
      if (!(origin && target)) {
        return;
      }
      update({
        ...toBoundedDelta(target, point, origin, size),
        id: target.id,
      });
    },
    [size, update]
  );

  /** True when a move was in progress, so the release must not open a new field. */
  const end = useCallback(() => {
    const { current } = dragRef;
    // biome-ignore lint/suspicious/noUnnecessaryConditions: the ref holds a drag only between start() and this release
    if (!current) {
      return false;
    }
    originRef.current = null;
    targetRef.current = null;
    update(null);
    if (current.dx !== 0 || current.dy !== 0) {
      onMove(current.id, current.dx, current.dy);
    }
    return true;
  }, [onMove, update]);

  return { drag, end, move, start };
}
