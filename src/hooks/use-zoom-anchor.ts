import { type RefObject, useEffect, useLayoutEffect, useRef } from "react";
import {
  readScrollAnchor,
  restoreScrollAnchor,
} from "@/lib/pdf-editor/scroll-anchor";
import type { ScrollAnchor } from "@/lib/pdf-editor/types";

/** Keeps the spot being read in the middle of the scroller when the zoom
 * changes. The anchor is taken on scroll because by the time the new zoom
 * reaches the page, the old layout it was measured against is gone. */
export function useZoomAnchor(
  scrollRef: RefObject<HTMLElement | null>,
  zoom: number
) {
  const anchorRef = useRef<ScrollAnchor | null>(null);
  const zoomRef = useRef(zoom);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) {
      return;
    }
    const handleScroll = () => {
      anchorRef.current = readScrollAnchor(scroller);
    };
    scroller.addEventListener("scroll", handleScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", handleScroll);
  }, [scrollRef]);

  useLayoutEffect(() => {
    if (zoomRef.current === zoom) {
      return;
    }
    zoomRef.current = zoom;
    const scroller = scrollRef.current;
    const anchor = anchorRef.current;
    if (scroller && anchor) {
      restoreScrollAnchor(scroller, anchor);
    }
  }, [scrollRef, zoom]);
}
