import { useCallback, useRef, useState } from "react";
import { type AnnotationDrag, findTextAt } from "@/lib/pdf-editor/move";
import type { Annotation, Point } from "@/lib/pdf-editor/types";

interface TextDragOptions {
  annotations: Annotation[];
  onMove: (id: string, dx: number, dy: number) => void;
  pageIndex: number;
}

/** Repositioning text already on the page: press it, drag, and the move lands as one undo step. */
export function useTextDrag({
  annotations,
  onMove,
  pageIndex,
}: TextDragOptions) {
  const [drag, setDrag] = useState<AnnotationDrag | null>(null);
  const dragRef = useRef<AnnotationDrag | null>(null);
  const originRef = useRef<Point | null>(null);

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
      update({ dx: 0, dy: 0, id: target.id });
      return true;
    },
    [annotations, pageIndex, update]
  );

  const move = useCallback(
    (point: Point) => {
      const { current: origin } = originRef;
      const { current } = dragRef;
      // biome-ignore lint/suspicious/noUnnecessaryConditions: both refs are filled by start(), a sibling callback the analyzer cannot see across
      if (!(origin && current)) {
        return;
      }
      update({ ...current, dx: point.x - origin.x, dy: point.y - origin.y });
    },
    [update]
  );

  /** True when a move was in progress, so the release must not open a new field. */
  const end = useCallback(() => {
    const { current } = dragRef;
    // biome-ignore lint/suspicious/noUnnecessaryConditions: the ref holds a drag only between start() and this release
    if (!current) {
      return false;
    }
    originRef.current = null;
    update(null);
    if (current.dx !== 0 || current.dy !== 0) {
      onMove(current.id, current.dx, current.dy);
    }
    return true;
  }, [onMove, update]);

  return { drag, end, move, start };
}
