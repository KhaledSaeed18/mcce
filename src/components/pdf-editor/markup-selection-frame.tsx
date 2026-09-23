import type { ReactNode } from "react";
import type { Box } from "@/lib/pdf-editor/types";

interface MarkupSelectionFrameProps {
  box: Box;
  /** The frame's handles, when the markup can be resized. */
  children?: ReactNode;
  zoom: number;
}

/** The dashed frame around selected markup. It lets the pointer through, so
 * the markup underneath can still be picked up and moved. */
export function MarkupSelectionFrame({
  box,
  children,
  zoom,
}: MarkupSelectionFrameProps) {
  return (
    <div
      className="pointer-events-none absolute z-10"
      style={{
        height: box.height * zoom,
        left: box.x * zoom,
        top: box.y * zoom,
        width: box.width * zoom,
      }}
    >
      <span className="absolute -inset-1 rounded-sm border-2 border-primary border-dashed" />
      {children}
    </div>
  );
}
