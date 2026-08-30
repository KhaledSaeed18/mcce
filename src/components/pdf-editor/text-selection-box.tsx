import { TextBoxResizer } from "@/components/pdf-editor/text-box-resizer";
import { getTextBox } from "@/lib/pdf-editor/text-layout";
import type { TextAnnotation, TextBoxEdge } from "@/lib/pdf-editor/types";

interface TextSelectionBoxProps {
  annotation: TextAnnotation;
  onResize: (edge: TextBoxEdge, dx: number) => void;
  onResizeEnd: () => void;
  zoom: number;
}

/**
 * The frame around selected text. It lets the pointer through to the canvas so
 * the text underneath can still be dragged and opened, and catches only its
 * own side handles.
 */
export function TextSelectionBox({
  annotation,
  onResize,
  onResizeEnd,
  zoom,
}: TextSelectionBoxProps) {
  const box = getTextBox(annotation);

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
      <span className="absolute inset-0 border-2 border-primary border-dashed" />
      <TextBoxResizer
        edge="left"
        onEnd={onResizeEnd}
        onResize={onResize}
        zoom={zoom}
      />
      <TextBoxResizer
        edge="right"
        onEnd={onResizeEnd}
        onResize={onResize}
        zoom={zoom}
      />
    </div>
  );
}
