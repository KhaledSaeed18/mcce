import { type PointerEvent, useCallback, useRef } from "react";
import { toPagePoint } from "@/lib/pdf-editor/pointer";
import type { PageSize, Point } from "@/lib/pdf-editor/types";

interface EraserOptions {
  onBatchErase: (pageId: string, points: Point[]) => void;
  pageId: string;
  rotation: number;
  size: PageSize;
  zoom: number;
}

/** Rubs markup out along the pointer's path for as long as the press lasts.
 *  Accumulates points during a drag and commits them as a single undo step on release. */
export function useEraser({
  onBatchErase,
  pageId,
  rotation,
  size,
  zoom,
}: EraserOptions) {
  const isErasingRef = useRef(false);
  const pointsRef = useRef<Point[]>([]);

  const handleDown = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      event.currentTarget.setPointerCapture(event.pointerId);
      isErasingRef.current = true;
      pointsRef.current = [toPagePoint(event, zoom, size, rotation)];
    },
    [rotation, size, zoom]
  );

  const handleMove = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      // biome-ignore lint/suspicious/noUnnecessaryConditions: set by the press handler, a sibling callback the analyzer cannot see across
      if (!isErasingRef.current) {
        return;
      }
      pointsRef.current.push(toPagePoint(event, zoom, size, rotation));
    },
    [rotation, size, zoom]
  );

  const handleUp = useCallback(() => {
    // biome-ignore lint/suspicious/noUnnecessaryConditions: set by the press handler, a sibling callback the analyzer cannot see across
    if (!isErasingRef.current) {
      return;
    }
    isErasingRef.current = false;
    if (pointsRef.current.length > 0) {
      onBatchErase(pageId, pointsRef.current);
      pointsRef.current = [];
    }
  }, [onBatchErase, pageId]);

  return { handleDown, handleMove, handleUp };
}
