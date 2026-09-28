import { type RefObject, useEffect, useState } from "react";

/** How many tabs the strip has scrolled even partly out of sight, kept up to
 * date as it scrolls and as it or any tab changes size. */
export function useHiddenTabCount(
  stripRef: RefObject<HTMLElement | null>,
  tabCount: number
): number {
  const [hiddenCount, setHiddenCount] = useState(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: tabCount only triggers a fresh measure of the tabs now in the strip
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) {
      return;
    }
    const measure = () => {
      const bounds = strip.getBoundingClientRect();
      const tabs = [...strip.children].map((tab) =>
        tab.getBoundingClientRect()
      );
      setHiddenCount(
        tabs.filter(
          (tab) => tab.left < bounds.left - 1 || tab.right > bounds.right + 1
        ).length
      );
    };
    const observer = new ResizeObserver(measure);
    observer.observe(strip);
    for (const tab of strip.children) {
      observer.observe(tab);
    }
    strip.addEventListener("scroll", measure, { passive: true });
    return () => {
      observer.disconnect();
      strip.removeEventListener("scroll", measure);
    };
  }, [stripRef, tabCount]);

  return hiddenCount;
}
