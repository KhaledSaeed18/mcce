import { type RefObject, useEffect, useState } from "react";
import { PAGE_NEAR_VIEW_MARGIN } from "@/config/pdf-editor";
import { usePageScroller } from "@/hooks/use-page-scroller";

/** True while the page is within a screen of what its scroller shows, and
 * false again once it is scrolled well away, so it can let its layers go. */
export function usePageNearView(ref: RefObject<HTMLElement | null>): boolean {
  const scrollerRef = usePageScroller();
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIsNear(entry.isIntersecting),
      { root: scrollerRef.current, rootMargin: PAGE_NEAR_VIEW_MARGIN }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, scrollerRef]);

  return isNear;
}
