import { type RefObject, useEffect, useState } from "react";

/** A page a screen away is close enough to be worth rendering before it is reached. */
const ROOT_MARGIN = "800px";

/** Pass the scroll container as `rootRef` when the element sits in a panel
 * that can be clipped from outside: measuring against the window would count
 * that clip, and the observer is not re-run when only an ancestor's clip changes. */
export function useInViewport(
  ref: RefObject<HTMLElement | null>,
  rootRef?: RefObject<HTMLElement | null>
): boolean {
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
      { root: rootRef?.current ?? null, rootMargin: ROOT_MARGIN }
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, rootRef]);

  return isVisible;
}
