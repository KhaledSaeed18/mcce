import { useEffect, useRef } from "react";
import { MAX_RENDER_DPR } from "@/config/pdf-editor";
import { useAnnotationDrawing } from "@/hooks/use-annotation-drawing";
import { drawAnnotation, drawTextHighlight } from "@/lib/pdf-editor/draw";
import { withDrag } from "@/lib/pdf-editor/move";
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
  pageIndex: number;
  /** A box mid-resize, drawn at the width the pointer is holding it at. */
  preview: TextAnnotation | null;
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
  pageIndex,
  preview,
  selectedId,
  settings,
  size,
  zoom,
}: AnnotationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
    pageIndex,
    settings,
    size,
    zoom,
  });
  const hoverId = hoveredTextId === selectedId ? null : hoveredTextId;
  const highlightId = drag?.id ?? hoverId;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    // biome-ignore lint/suspicious/noUnnecessaryConditions: a ref is empty until the canvas mounts, which the analyzer cannot see
    if (!(canvas && ctx)) {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_RENDER_DPR);
    canvas.width = size.width * zoom * dpr;
    canvas.height = size.height * zoom * dpr;
    ctx.setTransform(zoom * dpr, 0, 0, zoom * dpr, 0, 0);
    ctx.clearRect(0, 0, size.width, size.height);

    for (const stored of withDrag(annotations, drag)) {
      if (stored.id === editingId) {
        continue;
      }
      const annotation = preview?.id === stored.id ? preview : stored;
      drawAnnotation(ctx, annotation);
      if (annotation.type === "text" && annotation.id === highlightId) {
        drawTextHighlight(ctx, annotation);
      }
    }
    if (draft) {
      drawAnnotation(ctx, draft);
    }
  }, [annotations, draft, drag, editingId, highlightId, preview, size, zoom]);

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
      style={{ height: size.height * zoom, width: size.width * zoom }}
    />
  );
}
