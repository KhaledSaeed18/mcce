import { type RefObject, useEffect, useState } from "react";

/** True while the element is within `margin` of what its scroller shows, and
 * false again once it is further away, so it can let go of what it drew.
 * Measuring against the scroller rather than the window counts its clip, and
 * lets the margin reach past it to draw what is about to arrive. */
export function useNearView(
  ref: RefObject<HTMLElement | null>,
  scrollerRef: RefObject<HTMLElement | null>,
  margin: string
): boolean {
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIsNear(entry.isIntersecting),
      { root: scrollerRef.current, rootMargin: margin }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [margin, ref, scrollerRef]);

  return isNear;
}
