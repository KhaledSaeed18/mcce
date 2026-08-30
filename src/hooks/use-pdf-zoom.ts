import { useCallback, useState } from "react";
import { DEFAULT_ZOOM, ZOOM_STEP } from "@/config/pdf-editor";
import { clampZoom, getFitZoom } from "@/lib/pdf-editor/fit-zoom";
import type { PageSize, ZoomControl, ZoomMode } from "@/lib/pdf-editor/types";

interface PdfZoomOptions {
  /** The page being read, which is the one a fit is measured against. */
  pageSize: PageSize | null;
  viewport: PageSize | null;
}

/** A zoom the reader set, or one kept fitted to the window as it changes. */
export function usePdfZoom({
  pageSize,
  viewport,
}: PdfZoomOptions): ZoomControl {
  const [mode, setMode] = useState<ZoomMode>("custom");
  const [customZoom, setCustomZoom] = useState(DEFAULT_ZOOM);

  const isFitted = mode !== "custom" && Boolean(pageSize && viewport);
  const value =
    isFitted && pageSize && viewport
      ? getFitZoom(mode as Exclude<ZoomMode, "custom">, pageSize, viewport)
      : customZoom;

  const setZoom = useCallback((next: number) => {
    setMode("custom");
    setCustomZoom(clampZoom(next));
  }, []);

  const zoomIn = useCallback(
    () => setZoom(value + ZOOM_STEP),
    [setZoom, value]
  );

  const zoomOut = useCallback(
    () => setZoom(value - ZOOM_STEP),
    [setZoom, value]
  );

  const fitWidth = useCallback(() => setMode("fit-width"), []);
  const fitPage = useCallback(() => setMode("fit-page"), []);

  return { fitPage, fitWidth, mode, value, zoomIn, zoomOut };
}
