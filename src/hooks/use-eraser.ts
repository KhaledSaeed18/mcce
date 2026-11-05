import { type PointerEvent, useCallback, useRef, useState } from "react";
import { ERASER_TOLERANCE } from "@/config/pdf-editor";
import { isAnnotationHit } from "@/lib/pdf-editor/geometry";
import { toPagePoint } from "@/lib/pdf-editor/pointer";
import { pointsAlong } from "@/lib/pdf-editor/shape-hit";
import type { Annotation, PageSize, Point } from "@/lib/pdf-editor/types";

const NOTHING_ERASED: ReadonlySet<string> = new Set();

interface EraserOptions {
  /** What this page holds that the eraser may take. */
  annotations: Annotation[];
  onBatchErase: (ids: ReadonlySet<string>) => void;
  pageId: string;
  rotation: number;
  size: PageSize;
  zoom: number;
}

/**
 * Rubs markup out along the pointer's path for as long as the press lasts. What
 * it touches leaves the view at once, and the release takes it all as one undo
 * step. The path is walked in small steps, since a quick sweep reports points
 * far enough apart to pass right over a thin line.
 */
export function useEraser({
  annotations,
  onBatchErase,
  pageId,
  rotation,
  size,
  zoom,
}: EraserOptions) {
  const lastRef = useRef<Point | null>(null);
  const [erasedIds, setErasedIds] = useState(NOTHING_ERASED);
  // Mirrors the state so the release reads it outside a state updater.
  const erasedRef = useRef(NOTHING_ERASED);

  const eraseAlong = useCallback(
    (points: readonly Point[]) => {
      const touched = annotations.filter(
        (annotation) =>
          annotation.pageId === pageId &&
          !erasedRef.current.has(annotation.id) &&
          points.some((point) => isAnnotationHit(annotation, point))
      );
      if (touched.length) {
        erasedRef.current = new Set([
          ...erasedRef.current,
          ...touched.map(({ id }) => id),
        ]);
        setErasedIds(erasedRef.current);
      }
    },
    [annotations, pageId]
  );

  const handleDown = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      event.currentTarget.setPointerCapture(event.pointerId);
      const point = toPagePoint(event, zoom, size, rotation);
      lastRef.current = point;
      eraseAlong([point]);
    },
    [eraseAlong, rotation, size, zoom]
  );

  const handleMove = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      const { current: last } = lastRef;
      if (!last) {
        return;
      }
      const point = toPagePoint(event, zoom, size, rotation);
      lastRef.current = point;
      eraseAlong(pointsAlong(last, point, ERASER_TOLERANCE));
    },
    [eraseAlong, rotation, size, zoom]
  );

  const handleUp = useCallback(() => {
    lastRef.current = null;
    const { current } = erasedRef;
    erasedRef.current = NOTHING_ERASED;
    setErasedIds(NOTHING_ERASED);
    if (current.size) {
      onBatchErase(current);
    }
  }, [onBatchErase]);

  return { erasedIds, handleDown, handleMove, handleUp };
}
