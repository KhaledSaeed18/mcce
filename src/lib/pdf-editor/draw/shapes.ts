import type { PenAnnotation, ShapeAnnotation } from "../types";

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
