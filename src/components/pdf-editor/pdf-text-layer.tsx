import type { RefObject } from "react";
import { cn } from "@/lib/utils";

interface PdfTextLayerProps {
  /** Only the select tool reaches the text; every other tool draws over it. */
  isSelectable: boolean;
  layerRef: RefObject<HTMLDivElement | null>;
}

export function PdfTextLayer({ isSelectable, layerRef }: PdfTextLayerProps) {
  return (
    <div
      className={cn("textLayer", !isSelectable && "pointer-events-none")}
      ref={layerRef}
    />
  );
}
