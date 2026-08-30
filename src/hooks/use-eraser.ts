import { type PointerEvent, useCallback, useRef } from "react";
import { toPagePoint } from "@/lib/pdf-editor/pointer";
import type { PageSize, Point } from "@/lib/pdf-editor/types";

interface EraserOptions {
  onErase: (pageId: string, point: Point) => void;
  pageId: string;
  size: PageSize;
  zoom: number;
}

/** Rubs markup out along the pointer's path for as long as the press lasts. */
export function useEraser({ onErase, pageId, size, zoom }: EraserOptions) {
  const isErasingRef = useRef(false);

  const handleDown = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      event.currentTarget.setPointerCapture(event.pointerId);
      isErasingRef.current = true;
      onErase(pageId, toPagePoint(event, zoom, size));
    },
    [onErase, pageId, size, zoom]
  );

  const handleMove = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      // biome-ignore lint/suspicious/noUnnecessaryConditions: set by the press handler, a sibling callback the analyzer cannot see across
      if (!isErasingRef.current) {
        return;
      }
      onErase(pageId, toPagePoint(event, zoom, size));
    },
    [onErase, pageId, size, zoom]
  );

  const handleUp = useCallback(() => {
    isErasingRef.current = false;
  }, []);

  return { handleDown, handleMove, handleUp };
}
