import { type RefObject, useCallback, useEffect, useState } from "react";
import {
  PAGE_INDEX_ATTRIBUTE,
  VISIBLE_PAGE_ROOT_MARGIN,
} from "@/config/pdf-editor";

function findPage(root: HTMLElement, index: number): Element | null {
  return root.querySelector(`[${PAGE_INDEX_ATTRIBUTE}="${index}"]`);
}

/**
 * Which page is being read, and how to go to another one. It takes the count of
 * pages actually on screen rather than the document's own, so that it observes
 * them once they exist: the list waits for more than the document to render.
 */
export function useVisiblePage(
  rootRef: RefObject<HTMLElement | null>,
  pageCount: number
) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!(root && pageCount)) {
      return;
    }
    setActiveIndex(0);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveIndex(
              Number(entry.target.getAttribute(PAGE_INDEX_ATTRIBUTE))
            );
          }
        }
      },
      { root, rootMargin: VISIBLE_PAGE_ROOT_MARGIN }
    );
    for (const page of root.querySelectorAll(`[${PAGE_INDEX_ATTRIBUTE}]`)) {
      observer.observe(page);
    }

    return () => observer.disconnect();
  }, [pageCount, rootRef]);

  const goToPage = useCallback(
    (index: number) => {
      const root = rootRef.current;
      if (root) {
        findPage(root, index)?.scrollIntoView({ block: "start" });
      }
    },
    [rootRef]
  );

  return { activeIndex, goToPage };
}
