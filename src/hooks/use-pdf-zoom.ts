import { useCallback, useState } from "react";
import {
  DEFAULT_ZOOM,
  MAX_ZOOM,
  MIN_ZOOM,
  ZOOM_STEP,
} from "@/config/pdf-editor";

export function usePdfZoom() {
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);

  const zoomIn = useCallback(
    () => setZoom((current) => Math.min(current + ZOOM_STEP, MAX_ZOOM)),
    []
  );

  const zoomOut = useCallback(
    () => setZoom((current) => Math.max(current - ZOOM_STEP, MIN_ZOOM)),
    []
  );

  const resetZoom = useCallback(() => setZoom(DEFAULT_ZOOM), []);

  return { resetZoom, zoom, zoomIn, zoomOut };
}
