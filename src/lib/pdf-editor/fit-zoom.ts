import { MAX_ZOOM, MIN_ZOOM, PAGE_FIT_PADDING } from "@/config/pdf-editor";
import type { PageSize, ZoomMode } from "./types";

export function clampZoom(zoom: number): number {
  return Math.min(Math.max(zoom, MIN_ZOOM), MAX_ZOOM);
}

/**
 * The zoom that sits a page inside the window it is being read in. Fitting the
 * width leaves the length to the scroller; fitting the page takes whichever of
 * the two axes runs out first.
 */
export function getFitZoom(
  mode: Exclude<ZoomMode, "custom">,
  page: PageSize,
  viewport: PageSize
): number {
  const byWidth = (viewport.width - PAGE_FIT_PADDING) / page.width;
  if (mode === "fit-width") {
    return clampZoom(byWidth);
  }
  const byHeight = (viewport.height - PAGE_FIT_PADDING) / page.height;
  return clampZoom(Math.min(byWidth, byHeight));
}
