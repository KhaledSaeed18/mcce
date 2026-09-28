import { type RefObject, useEffect } from "react";

/** Keeps the tab on screen in sight: when it changes, and when the strip
 * narrows under it, as it does when the bar's other controls change. */
export function useActiveTabInView(
  stripRef: RefObject<HTMLElement | null>,
  activeIndex: number
) {
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip || activeIndex < 0) {
      return;
    }
    const reveal = () =>
      strip.children[activeIndex]?.scrollIntoView({
        block: "nearest",
        inline: "nearest",
      });
    const observer = new ResizeObserver(reveal);
    observer.observe(strip);
    return () => observer.disconnect();
  }, [activeIndex, stripRef]);
}
