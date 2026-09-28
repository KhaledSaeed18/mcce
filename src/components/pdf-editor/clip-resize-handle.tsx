import type { PointerEventHandler } from "react";
import { CLIP_RESIZE_LABEL } from "@/config/pdf-editor";
import type { ClipCorner } from "@/lib/pdf-editor/clips/types";
import { cn } from "@/lib/utils";

/** The handle sits across from the corner the card keeps to. */
const HANDLE_CLASS: Record<ClipCorner, string> = {
  "bottom-left": "top-0 right-0 cursor-nesw-resize rounded-bl",
  "bottom-right": "top-0 left-0 cursor-nwse-resize rounded-br",
  "top-left": "right-0 bottom-0 cursor-nwse-resize rounded-tl",
  "top-right": "bottom-0 left-0 cursor-nesw-resize rounded-tr",
};

interface ClipResizeHandleProps {
  corner: ClipCorner;
  handlers: {
    onPointerCancel: PointerEventHandler<HTMLElement>;
    onPointerDown: PointerEventHandler<HTMLElement>;
    onPointerMove: PointerEventHandler<HTMLElement>;
    onPointerUp: PointerEventHandler<HTMLElement>;
  };
}

export function ClipResizeHandle({ corner, handlers }: ClipResizeHandleProps) {
  return (
    <button
      {...handlers}
      aria-label={CLIP_RESIZE_LABEL}
      className={cn(
        "absolute z-10 size-3.5 touch-none bg-primary",
        HANDLE_CLASS[corner]
      )}
      tabIndex={-1}
      title={CLIP_RESIZE_LABEL}
      type="button"
    />
  );
}
