import { HIGHLIGHT_OPACITY } from "@/config/pdf-editor";
import { getArrowHead } from "../arrow-head";
import { getMarkLine } from "../text-mark-lines";
import type {
  ArrowAnnotation,
  HighlightAnnotation,
  PenAnnotation,
  ShapeAnnotation,
  TextMarkAnnotation,
} from "../types";

export function drawPen(
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

/** One path, stroked once, so the see-through ink does not darken where the
 * stroke crosses itself. */
export function drawHighlight(
  ctx: CanvasRenderingContext2D,
  annotation: HighlightAnnotation
): void {
  ctx.save();
  ctx.globalAlpha = HIGHLIGHT_OPACITY;
  drawPen(ctx, { ...annotation, type: "pen" });
  ctx.restore();
}

export function drawTextMark(
  ctx: CanvasRenderingContext2D,
  annotation: TextMarkAnnotation
): void {
  const { style } = annotation;
  ctx.save();
  if (style === "highlight") {
    ctx.globalAlpha = HIGHLIGHT_OPACITY;
    ctx.fillStyle = annotation.color;
    for (const box of annotation.boxes) {
      ctx.fillRect(box.x, box.y, box.width, box.height);
    }
  } else {
    ctx.strokeStyle = annotation.color;
    ctx.lineCap = "butt";
    for (const box of annotation.boxes) {
      const line = getMarkLine(box, style);
      ctx.lineWidth = line.thickness;
      ctx.beginPath();
      ctx.moveTo(line.start.x, line.start.y);
      ctx.lineTo(line.end.x, line.end.y);
      ctx.stroke();
    }
  }
  ctx.restore();
}

export function drawArrow(
  ctx: CanvasRenderingContext2D,
  annotation: ArrowAnnotation
): void {
  const { from, to } = annotation;
  const [left, right] = getArrowHead(annotation);
  ctx.strokeStyle = annotation.color;
  ctx.lineWidth = annotation.strokeWidth;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.moveTo(left.x, left.y);
  ctx.lineTo(to.x, to.y);
  ctx.lineTo(right.x, right.y);
  ctx.stroke();
}

export function drawShape(
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
