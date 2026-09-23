import type { RefObject } from "react";
import { usePinchZoom } from "@/hooks/use-pinch-zoom";
import { useScrollReset } from "@/hooks/use-scroll-reset";
import { useZoomAnchor } from "@/hooks/use-zoom-anchor";
import type { ZoomControl } from "@/lib/pdf-editor/types";

/** How the page scroller responds to the file and the zoom changing under it. */
export function useDocumentScroller(
  scrollRef: RefObject<HTMLElement | null>,
  fileId: string | undefined,
  zoom: ZoomControl
) {
  useScrollReset(scrollRef, fileId);
  useZoomAnchor(scrollRef, zoom.value);
  usePinchZoom(scrollRef, { onZoomIn: zoom.zoomIn, onZoomOut: zoom.zoomOut });
}
