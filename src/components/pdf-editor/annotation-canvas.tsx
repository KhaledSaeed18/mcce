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
  clip: "cursor-crosshair",
  cover: "cursor-crosshair",
  ellipse: "cursor-crosshair",
  eraser: "cursor-cell",
  hand: "cursor-grab active:cursor-grabbing",
  highlight: "cursor-crosshair",
  note: "cursor-copy",
  pen: "cursor-crosshair",
  rect: "cursor-crosshair",
  select: "cursor-text",
  text: "cursor-text",
};

function resolveCursor(tool: ToolSettings["tool"], isMoving: boolean): string {
  return isMoving && tool === "text" ? "cursor-grabbing" : CURSOR_BY_TOOL[tool];
}

interface AnnotationCanvasProps {
  actions: AnnotationActions;
  annotations: Annotation[];
  areCoversLocked: boolean;
  /** The text currently open in a field, which that field draws instead. */
  editingId: string | null;
  /** Markup being carried by the select tool, drawn where the pointer has it. */
  markupDrag: AnnotationDrag | null;
  onDraft: (draft: TextDraft) => void;
  pageId: string;
  /** Markup mid-resize, drawn at the size the pointer is holding it at. */
  preview: Annotation | null;
  /** Covers whose answers are showing, drawn as an outline instead of solid. */
  revealed: ReadonlySet<string>;
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
  areCoversLocked,
  editingId,
  markupDrag,
  onDraft,
  pageId,
  preview,
  revealed,
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
    erasedIds,
    handlePointerDown,
    handlePointerLeave,
    handlePointerMove,
    handlePointerUp,
    hoveredTextId,
  } = useAnnotationDrawing({
    actions,
    annotations,
    areCoversLocked,
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
    erasedIds,
    highlightId: drag?.id ?? hoverId,
    preview,
    rendered,
    revealed,
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
          : resolveCursor(settings.tool, drag !== null)
      )}
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
