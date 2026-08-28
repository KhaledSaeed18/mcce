import { ANNOTATION_FONT_FAMILY } from "@/config/pdf-editor";
import type {
  Annotation,
  PenAnnotation,
  ShapeAnnotation,
  TextAnnotation,
} from "./types";

function drawPen(
  ctx: CanvasRenderingContext2D,
  annotation: PenAnnotation
): void {
  const [first, ...rest] = annotation.points;
  if (!first) {
    return;
  }
  ctx.strokeStyle = annotation.color;
  ctx.lineWidth = annotation.width;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(first.x, first.y);
  for (const point of rest) {
    ctx.lineTo(point.x, point.y);
  }
  ctx.stroke();
}

function drawShape(
  ctx: CanvasRenderingContext2D,
  annotation: ShapeAnnotation
): void {
  ctx.strokeStyle = annotation.color;
  ctx.lineWidth = annotation.strokeWidth;
  ctx.beginPath();
  if (annotation.type === "rect") {
    ctx.rect(annotation.x, annotation.y, annotation.width, annotation.height);
  } else {
    ctx.ellipse(
      annotation.x + annotation.width / 2,
      annotation.y + annotation.height / 2,
      annotation.width / 2,
      annotation.height / 2,
      0,
      0,
      Math.PI * 2
    );
  }
  ctx.stroke();
}

function drawText(
  ctx: CanvasRenderingContext2D,
  annotation: TextAnnotation
): void {
  ctx.fillStyle = annotation.color;
  ctx.font = `${annotation.fontSize}px ${ANNOTATION_FONT_FAMILY}`;
  ctx.textBaseline = "alphabetic";
  ctx.fillText(annotation.text, annotation.x, annotation.y);
}

/** Draws in page space; the caller scales the context to the current zoom. */
export function drawAnnotation(
  ctx: CanvasRenderingContext2D,
  annotation: Annotation
): void {
  if (annotation.type === "pen") {
    drawPen(ctx, annotation);
    return;
  }
  if (annotation.type === "text") {
    drawText(ctx, annotation);
    return;
  }
  drawShape(ctx, annotation);
}
