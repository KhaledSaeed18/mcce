import type { RefObject } from "react";
import type { HighlightBox } from "@/hooks/use-search-highlights";
import { cn } from "@/lib/utils";

interface PdfSearchHighlightsProps {
  boxes: readonly HighlightBox[];
  currentRef: RefObject<HTMLDivElement | null>;
}

/** Tints the matches under the page's own ink, so the text stays readable. */
export function PdfSearchHighlights({
  boxes,
  currentRef,
}: PdfSearchHighlightsProps) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {boxes.map((box) => (
        <div
          className={cn(
            "absolute rounded-sm mix-blend-multiply",
            box.isCurrent
              ? "bg-primary/70 outline-2 outline-primary"
              : "bg-primary/30"
          )}
          key={box.key}
          ref={box.isCurrent ? currentRef : undefined}
          style={{
            height: box.height,
            left: box.x,
            top: box.y,
            width: box.width,
          }}
        />
      ))}
    </div>
  );
}
