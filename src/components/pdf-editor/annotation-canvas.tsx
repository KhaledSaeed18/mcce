import { useAnnotationDrawing } from "@/hooks/use-annotation-drawing";
import { useAnnotationPainter } from "@/hooks/use-annotation-painter";
import type { AnnotationDrag } from "@/lib/pdf-editor/move";
import {
  getRenderedSize,
  getRotationTransform,
} from "@/lib/pdf-editor/rotation";
import type {
  Annotation,
  AnnotationActions,
  PageSize,
  TextDraft,
  ToolSettings,
} from "@/lib/pdf-editor/types";
import { cn } from "@/lib/utils";

const CURSOR_BY_TOOL: Record<ToolSettings["tool"], string> = {
  arrow: "cursor-crosshair",
  ellipse: "cursor-crosshair",
  eraser: "cursor-cell",
  hand: "cursor-grab",
  highlight: "cursor-crosshair",
  pen: "cursor-crosshair",
  rect: "cursor-crosshair",
  select: "cursor-text",
  text: "cursor-text",
};

/** Text under the pointer offers a grab, so a move reads as available before it starts. */
function resolveCursor(
  tool: ToolSettings["tool"],
  isOverText: boolean,
  isMoving: boolean
): string {
  if (tool === "hand") {
    return isMoving ? "cursor-grabbing" : CURSOR_BY_TOOL.hand;
  }
  if (tool !== "text") {
    return CURSOR_BY_TOOL[tool];
  }
  if (isMoving) {
    return "cursor-grabbing";
  }
  return isOverText ? "cursor-grab" : CURSOR_BY_TOOL.text;
}

interface AnnotationCanvasProps {
  actions: AnnotationActions;
  annotations: Annotation[];
  /** The text currently open in a field, which that field draws instead. */
  editingId: string | null;
  /** Markup being carried by the select tool, drawn where the pointer has it. */
  markupDrag: AnnotationDrag | null;
  onDraft: (draft: TextDraft) => void;
  pageId: string;
  /** Markup mid-resize, drawn at the size the pointer is holding it at. */
  preview: Annotation | null;
  /** Quarter turns the page has been given, which the markup is drawn through. */
  rotation: number;
  /** Framed by its own overlay, so it needs no hover ring of its own. */
  selectedId: string | null;
  settings: ToolSettings;
  size: PageSize;
  zoom: number;
}

export function AnnotationCanvas({
  actions,
  annotations,
  editingId,
  markupDrag,
  onDraft,
  pageId,
  preview,
  rotation,
  selectedId,
  settings,
  size,
  zoom,
}: AnnotationCanvasProps) {
  const rendered = getRenderedSize(size, rotation);
  const transform = getRotationTransform(size, rotation);
  const {
    draft,
    drag,
    handleDoubleClick,
    handlePointerDown,
    handlePointerLeave,
    handlePointerMove,
    handlePointerUp,
    hoveredTextId,
  } = useAnnotationDrawing({
    actions,
    annotations,
    onDraft,
    pageId,
    rotation,
    settings,
    size,
    zoom,
  });
  const hoverId = hoveredTextId === selectedId ? null : hoveredTextId;
  const canvasRef = useAnnotationPainter({
    annotations,
    draft,
    drag: drag ?? markupDrag,
    editingId,
    highlightId: drag?.id ?? hoverId,
    preview,
    rendered,
    transform,
    zoom,
  });

  return (
    <canvas
      className={cn(
        "absolute inset-0 touch-none",
        // The text layer underneath takes the pointer while text is being picked.
        settings.tool === "select"
          ? "pointer-events-none"
          : resolveCursor(settings.tool, hoveredTextId !== null, drag !== null)
      )}
      onDoubleClick={handleDoubleClick}
      onPointerCancel={handlePointerUp}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      ref={canvasRef}
      style={{ height: rendered.height * zoom, width: rendered.width * zoom }}
    />
  );
}
