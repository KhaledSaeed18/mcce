import type { ReactNode } from "react";
import { MARKUP_FRAME_ATTRIBUTE } from "@/config/pdf-editor";
import type { Box } from "@/lib/pdf-editor/types";

interface MarkupSelectionFrameProps {
  box: Box;
  /** The frame's handles, when the markup can be resized. */
  children?: ReactNode;
  zoom: number;
}

const FRAME_MARKER = { [MARKUP_FRAME_ATTRIBUTE]: "" };

/** The frame around selected markup. It lets the pointer through, so
 * the markup underneath can still be picked up and moved. */
export function MarkupSelectionFrame({
  box,
  children,
  zoom,
}: MarkupSelectionFrameProps) {
  return (
    <div
      {...FRAME_MARKER}
      className="pointer-events-none absolute z-10"
      style={{
        height: box.height * zoom,
        left: box.x * zoom,
        top: box.y * zoom,
        width: box.width * zoom,
      }}
    >
      <span className="border-primary absolute -inset-1 rounded-[2px] border-2" />
      {children}
    </div>
  );
}
