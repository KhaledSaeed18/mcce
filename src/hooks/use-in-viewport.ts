import { type RefObject, useEffect, useState } from "react";

/** A page a screen away is close enough to be worth rendering before it is reached. */
const ROOT_MARGIN = "800px";

export function useInViewport(ref: RefObject<HTMLElement | null>): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { rootMargin: ROOT_MARGIN }
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, [ref]);

  return isVisible;
}
