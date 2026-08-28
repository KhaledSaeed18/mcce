import { useEffect, useRef } from "react";
import { MAX_RENDER_DPR } from "@/config/pdf-editor";
import { useAnnotationDrawing } from "@/hooks/use-annotation-drawing";
import { drawAnnotation } from "@/lib/pdf-editor/draw";
import { withDrag } from "@/lib/pdf-editor/move";
import type {
  Annotation,
  PageSize,
  Point,
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

interface AnnotationCanvasProps {
  annotations: Annotation[];
  onAdd: (annotation: Annotation) => void;
  onErase: (pageIndex: number, point: Point) => void;
  onMoveText: (id: string, dx: number, dy: number) => void;
  onTextRequest: (draft: TextDraft) => void;
  pageIndex: number;
  settings: ToolSettings;
  size: PageSize;
  zoom: number;
}

export function AnnotationCanvas({
  annotations,
  onAdd,
  onErase,
  onMoveText,
  onTextRequest,
  pageIndex,
  settings,
  size,
  zoom,
}: AnnotationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { draft, drag, handlePointerDown, handlePointerMove, handlePointerUp } =
    useAnnotationDrawing({
      annotations,
      onAdd,
      onErase,
      onMoveText,
      onTextRequest,
      pageIndex,
      settings,
      zoom,
    });

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

    for (const annotation of withDrag(annotations, drag)) {
      drawAnnotation(ctx, annotation);
    }
    if (draft) {
      drawAnnotation(ctx, draft);
    }
  }, [annotations, draft, drag, size, zoom]);

  return (
    <canvas
      className={cn(
        "absolute inset-0 touch-none",
        CURSOR_BY_TOOL[settings.tool]
      )}
      onPointerCancel={handlePointerUp}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      ref={canvasRef}
      style={{ height: size.height * zoom, width: size.width * zoom }}
    />
  );
}
