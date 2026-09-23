import { type RefObject, useLayoutEffect, useRef, useState } from "react";
import { measureSpan } from "@/lib/pdf-editor/span-rects";
import type { Box, SearchHit } from "@/lib/pdf-editor/types";

export interface HighlightBox extends Box {
  isCurrent: boolean;
  key: string;
}

/** The boxes to draw over this page's matches, measured from the text layer
 * each time it is laid out again, and the current match brought into view. */
export function useSearchHighlights(
  pageRef: RefObject<HTMLElement | null>,
  textDivs: readonly HTMLElement[],
  hits: readonly SearchHit[]
) {
  const [boxes, setBoxes] = useState<HighlightBox[]>([]);
  const currentRef = useRef<HTMLDivElement>(null);
  const scrolledKeyRef = useRef<string | null>(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page || textDivs.length === 0) {
      setBoxes([]);
      return;
    }
    const origin = page.getBoundingClientRect();
    setBoxes(
      hits.flatMap((hit) =>
        measureSpan(textDivs, hit.span, origin).map((box, piece) => ({
          ...box,
          isCurrent: hit.isCurrent,
          key: `${hit.span.start.item}:${hit.span.start.offset}:${piece}`,
        }))
      )
    );
  }, [hits, pageRef, textDivs]);

  // Only a newly current match scrolls; a relayout of the same one stays put.
  const currentKey = boxes.find((box) => box.isCurrent)?.key ?? null;
  useLayoutEffect(() => {
    if (!currentKey || scrolledKeyRef.current === currentKey) {
      return;
    }
    scrolledKeyRef.current = currentKey;
    currentRef.current?.scrollIntoView({ block: "center", inline: "nearest" });
  }, [currentKey]);

  return { boxes, currentRef };
}
