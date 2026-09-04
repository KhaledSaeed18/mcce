import { useEffect, useRef } from "react";
import { MAX_RENDER_DPR } from "@/config/pdf-editor";
import { drawAnnotation } from "@/lib/pdf-editor/draw/annotation";
import { drawTextHighlight } from "@/lib/pdf-editor/draw/text";
import { type AnnotationDrag, withDrag } from "@/lib/pdf-editor/move";
import type { RotationTransform } from "@/lib/pdf-editor/rotation";
import type {
  Annotation,
  PageSize,
  TextAnnotation,
} from "@/lib/pdf-editor/types";

interface AnnotationPainterOptions {
  annotations: Annotation[];
  /** The shape being drawn right now, which is not committed markup yet. */
  draft: Annotation | null;
  drag: AnnotationDrag | null;
  /** The text open in a field, which that field draws instead of the canvas. */
  editingId: string | null;
  highlightId: string | null;
  preview: TextAnnotation | null;
  /** The page as it is shown, which a turned page measures differently. */
  rendered: PageSize;
  transform: RotationTransform;
  zoom: number;
}

/** Paints the markup layer for one page, redrawing only when what it holds changes. */
export function useAnnotationPainter({
  annotations,
  draft,
  drag,
  editingId,
  highlightId,
  preview,
  rendered,
  transform,
  zoom,
}: AnnotationPainterOptions) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    // biome-ignore lint/suspicious/noUnnecessaryConditions: a ref is empty until the canvas mounts, which the analyzer cannot see
    if (!(canvas && ctx)) {
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, MAX_RENDER_DPR);
    canvas.width = rendered.width * zoom * dpr;
    canvas.height = rendered.height * zoom * dpr;
    ctx.setTransform(zoom * dpr, 0, 0, zoom * dpr, 0, 0);
    ctx.clearRect(0, 0, rendered.width, rendered.height);
    // Markup is held in the page's upright space, so the context is turned to
    // match the page rather than every coordinate being rewritten.
    ctx.translate(transform.tx, transform.ty);
    ctx.rotate(transform.angle);

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
  }, [
    annotations,
    draft,
    drag,
    editingId,
    highlightId,
    preview,
    rendered.height,
    rendered.width,
    transform.angle,
    transform.tx,
    transform.ty,
    zoom,
  ]);

  return canvasRef;
}
