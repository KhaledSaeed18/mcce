import { useAnnotationDrawing } from "@/hooks/use-annotation-drawing";
import { useAnnotationPainter } from "@/hooks/use-annotation-painter";
import {
  getRenderedSize,
  getRotationTransform,
} from "@/lib/pdf-editor/rotation";
import type {
  Annotation,
  AnnotationActions,
  PageSize,
  TextAnnotation,
  TextDraft,
  ToolSettings,
} from "@/lib/pdf-editor/types";
import { cn } from "@/lib/utils";

const CURSOR_BY_TOOL: Record<ToolSettings["tool"], string> = {
  ellipse: "cursor-crosshair",
  eraser: "cursor-cell",
  pen: "cursor-crosshair",
  rect: "cursor-crosshair",
  text: "cursor-text",
};

/** Text under the pointer offers a grab, so a move reads as available before it starts. */
function resolveCursor(
  tool: ToolSettings["tool"],
  isOverText: boolean,
  isMoving: boolean
): string {
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
  onDraft: (draft: TextDraft) => void;
  pageId: string;
  /** A box mid-resize, drawn at the width the pointer is holding it at. */
  preview: TextAnnotation | null;
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
    drag,
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
        resolveCursor(settings.tool, hoveredTextId !== null, drag !== null)
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
