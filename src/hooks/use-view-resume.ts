import { useEffect, useLayoutEffect, useRef } from "react";
import type { PageNavigation, ZoomControl } from "@/lib/pdf-editor/types";
import { readView, writeView } from "@/lib/pdf-editor/view-storage";

/**
 * Reopens each file at the page and zoom it was left at. The page is only
 * scrolled to once the saved zoom has reached the pages, since scrolling at the
 * old zoom would land short of it.
 */
export function useViewResume(
  fileId: string | undefined,
  navigation: PageNavigation,
  zoom: ZoomControl
) {
  const restoredIdRef = useRef<string | null>(null);
  const pendingPageRef = useRef<number | null>(null);
  const { activeIndex, goToPage, pageCount } = navigation;
  const { mode, restore, value } = zoom;

  // A file left before it finished loading was never restored, so coming back
  // to the one before it has to count as a fresh open.
  useEffect(() => {
    if (restoredIdRef.current !== fileId) {
      restoredIdRef.current = null;
    }
  }, [fileId]);

  useEffect(() => {
    if (!(fileId && pageCount) || restoredIdRef.current === fileId) {
      return;
    }
    restoredIdRef.current = fileId;
    const saved = readView(fileId, pageCount);
    if (!saved) {
      return;
    }
    // An unchanged zoom does not re-render, so the page is gone to at once.
    const isSameZoom =
      saved.zoomMode === mode && (mode !== "custom" || saved.zoom === value);
    if (isSameZoom) {
      goToPage(saved.page);
      return;
    }
    pendingPageRef.current = saved.page;
    restore(saved.zoomMode, saved.zoom);
  }, [fileId, goToPage, mode, pageCount, restore, value]);

  // Runs once the restored zoom has been laid out, before it is painted.
  useLayoutEffect(() => {
    const page = pendingPageRef.current;
    if (page === null) {
      return;
    }
    pendingPageRef.current = null;
    goToPage(page);
  });

  useEffect(() => {
    // Writing before the restore would replace the saved view with page one.
    if (!fileId || restoredIdRef.current !== fileId) {
      return;
    }
    if (pendingPageRef.current !== null) {
      return;
    }
    writeView(fileId, { page: activeIndex, zoom: value, zoomMode: mode });
  }, [activeIndex, fileId, mode, value]);
}
