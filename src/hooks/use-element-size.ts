import { type RefObject, useEffect, useState } from "react";
import type { PageSize } from "@/lib/pdf-editor/types";

/** The room an element currently has, tracked so a fitted page can keep fitting. */
export function useElementSize(
  ref: RefObject<HTMLElement | null>
): PageSize | null {
  const [size, setSize] = useState<PageSize | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      const { height, width } = entry.contentRect;
      setSize({ height, width });
    });
    observer.observe(element);

    return () => observer.disconnect();
  }, [ref]);

  return size;
}
