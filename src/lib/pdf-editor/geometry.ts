import { ERASER_TOLERANCE } from "@/config/pdf-editor";
import { distanceToStroke } from "./distance";
import { getTextBox } from "./text-layout";
import type { Annotation, Box, Point } from "./types";

/** A drag can end above or left of where it started; shapes are stored positive. */
export function normalizeRect(start: Point, end: Point) {
  return {
    height: Math.abs(end.y - start.y),
    width: Math.abs(end.x - start.x),
    x: Math.min(start.x, end.x),
    y: Math.min(start.y, end.y),
  };
}

function isInsideBox(box: Box, target: Point): boolean {
  return (
    target.x >= box.x - ERASER_TOLERANCE &&
    target.x <= box.x + box.width + ERASER_TOLERANCE &&
    target.y >= box.y - ERASER_TOLERANCE &&
    target.y <= box.y + box.height + ERASER_TOLERANCE
  );
}

/** What the eraser removes: anything the pointer is close enough to touch. */
export function isAnnotationHit(
  annotation: Annotation,
  target: Point
): boolean {
  if (annotation.type === "pen") {
    return distanceToStroke(annotation.points, target) <= ERASER_TOLERANCE;
  }
  if (annotation.type === "text") {
    return isInsideBox(getTextBox(annotation), target);
  }
  return isInsideBox(annotation, target);
}
