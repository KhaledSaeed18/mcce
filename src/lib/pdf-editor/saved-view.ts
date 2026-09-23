import { clampZoom } from "./fit-zoom";
import type { SavedView, ZoomMode } from "./types";

const ZOOM_MODES: readonly ZoomMode[] = ["custom", "fit-page", "fit-width"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/** What comes off disk is untyped and may be from an older file, so every
 * field is checked and the page kept inside the document it now belongs to. */
export function resolveSavedView(
  stored: unknown,
  pageCount: number
): SavedView | null {
  if (!(isRecord(stored) && pageCount > 0)) {
    return null;
  }
  const { page, zoom, zoomMode } = stored;
  if (
    typeof page !== "number" ||
    typeof zoom !== "number" ||
    !ZOOM_MODES.includes(zoomMode as ZoomMode)
  ) {
    return null;
  }
  return {
    page: Math.min(Math.max(Math.trunc(page), 0), pageCount - 1),
    zoom: clampZoom(zoom),
    zoomMode: zoomMode as ZoomMode,
  };
}
