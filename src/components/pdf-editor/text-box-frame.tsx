import type { ReactNode } from "react";
import { MarkupResizeHandle } from "@/components/pdf-editor/markup-resize-handle";
import { TextBoxResizer } from "@/components/pdf-editor/text-box-resizer";
import {
  MARKUP_FRAME_ATTRIBUTE,
  MARKUP_OVERLAY_ATTRIBUTE,
  TEXT_CONTROLS_ATTRIBUTE,
} from "@/config/pdf-editor";
import type { Box, FrameCorner, TextBoxEdge } from "@/lib/pdf-editor/types";

const CORNERS: readonly FrameCorner[] = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];

const EDGES: readonly TextBoxEdge[] = ["left", "right"];

interface TextBoxFrameProps {
  box: Box;
  /** The field being typed in, when the frame is around one. */
  children?: ReactNode;
  isEditing: boolean;
  onFit: () => void;
  onResizeCorner: (corner: FrameCorner, dx: number, dy: number) => void;
  onResizeEnd: () => void;
  onResizeSide: (edge: TextBoxEdge, dx: number) => void;
  rotation: number;
  /** Shown while a corner drag changes the size, in place of looking away to the toolbar. */
  sizeLabel?: string;
  zoom: number;
}

/**
 * The frame around text, the same whether it is selected or being typed in, so
 * its handles stay where they are between the two. The corners scale the text
 * and the sides set where it wraps. Everything else lets the pointer through,
 * so the text underneath can still be pressed.
 */
export function TextBoxFrame({
  box,
  children,
  isEditing,
  onFit,
  onResizeCorner,
  onResizeEnd,
  onResizeSide,
  rotation,
  sizeLabel,
  zoom,
}: TextBoxFrameProps) {
  const markers = {
    [MARKUP_FRAME_ATTRIBUTE]: "",
    ...(isEditing
      ? { [MARKUP_OVERLAY_ATTRIBUTE]: "", [TEXT_CONTROLS_ATTRIBUTE]: "" }
      : {}),
  };

  return (
    <div
      {...markers}
      className="pointer-events-none absolute z-10"
      style={{
        height: box.height * zoom,
        left: box.x * zoom,
        top: box.y * zoom,
        width: box.width * zoom,
      }}
    >
      {children}
      <span className="border-primary absolute -inset-1 rounded-[2px] border-2" />
      {EDGES.map((edge) => (
        <TextBoxResizer
          edge={edge}
          key={edge}
          onEnd={onResizeEnd}
          onFit={onFit}
          onResize={onResizeSide}
          rotation={rotation}
          zoom={zoom}
        />
      ))}
      {CORNERS.map((corner) => (
        <MarkupResizeHandle
          corner={corner}
          key={corner}
          onEnd={onResizeEnd}
          onResize={onResizeCorner}
          rotation={rotation}
          zoom={zoom}
        />
      ))}
      {sizeLabel ? (
        <span className="bg-primary text-primary-foreground absolute -bottom-7 left-1/2 -translate-x-1/2 rounded-sm px-1.5 py-0.5 text-xs font-medium whitespace-nowrap">
          {sizeLabel}
        </span>
      ) : null}
    </div>
  );
}
