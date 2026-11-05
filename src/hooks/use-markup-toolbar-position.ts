import { type RefObject, useEffect } from "react";
import {
  MARKUP_FRAME_ATTRIBUTE,
  MARKUP_TOOLBAR_GAP,
  MARKUP_TOOLBAR_MARGIN,
} from "@/config/pdf-editor";

/** Above the frame, or under it when there is no room, and always inside the scroller. */
function placeBar(bar: HTMLElement, scroller: HTMLElement): void {
  const frame = scroller.querySelector(`[${MARKUP_FRAME_ATTRIBUTE}]`);
  if (!frame) {
    bar.style.visibility = "hidden";
    return;
  }
  const { bottom, left, top, width } = frame.getBoundingClientRect();
  const area = scroller.getBoundingClientRect();
  const size = bar.getBoundingClientRect();
  const isInView = bottom > area.top && top < area.bottom;
  bar.style.visibility = isInView ? "visible" : "hidden";

  const above = top - size.height - MARKUP_TOOLBAR_GAP;
  const below = bottom + MARKUP_TOOLBAR_GAP;
  const y = above < area.top + MARKUP_TOOLBAR_MARGIN ? below : above;
  const lowest = area.bottom - size.height - MARKUP_TOOLBAR_MARGIN;
  const x = Math.max(
    Math.min(
      left + width / 2 - size.width / 2,
      area.right - size.width - MARKUP_TOOLBAR_MARGIN
    ),
    area.left + MARKUP_TOOLBAR_MARGIN
  );
  bar.style.transform = `translate(${x}px, ${Math.min(y, lowest)}px)`;
}

/**
 * Keeps a floating toolbar beside its frame. The frame moves with scrolling, zoom,
 * drags, and every keystroke, so reading it once a frame while the toolbar is up
 * is simpler than hearing about all of those. It writes styles directly, which
 * keeps the page from rendering again for it.
 */
export function useMarkupToolbarPosition(
  barRef: RefObject<HTMLElement | null>,
  scrollRef: RefObject<HTMLElement | null>
): void {
  useEffect(() => {
    let frameId = 0;
    const tick = () => {
      if (barRef.current && scrollRef.current) {
        placeBar(barRef.current, scrollRef.current);
      }
      frameId = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(frameId);
  }, [barRef, scrollRef]);
}
