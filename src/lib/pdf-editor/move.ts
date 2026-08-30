import { isAnnotationHit } from "./geometry";
import type { Annotation, Point, TextAnnotation } from "./types";

/** Topmost first: later annotations are drawn over earlier ones, so they win a shared point. */
export function findTextAt(
  annotations: Annotation[],
  pageIndex: number,
  point: Point
): TextAnnotation | null {
  for (let index = annotations.length - 1; index >= 0; index -= 1) {
    const annotation = annotations[index];
    if (
      annotation.type === "text" &&
      annotation.pageIndex === pageIndex &&
      isAnnotationHit(annotation, point)
    ) {
      return annotation;
    }
  }
  return null;
}

/** The selected text, when it is one of these and it is on this page. */
export function findText(
  annotations: Annotation[],
  id: string | null
): TextAnnotation | null {
  if (!id) {
    return null;
  }
  const target = annotations.find((annotation) => annotation.id === id);
  return target?.type === "text" ? target : null;
}

export function shiftAnnotation(
  annotation: Annotation,
  dx: number,
  dy: number
): Annotation {
  if (annotation.type === "pen") {
    return {
      ...annotation,
      points: annotation.points.map((point) => ({
        x: point.x + dx,
        y: point.y + dy,
      })),
    };
  }
  return { ...annotation, x: annotation.x + dx, y: annotation.y + dy };
}

export interface AnnotationDrag {
  dx: number;
  dy: number;
  id: string;
}

/** The list as it should be drawn mid-drag, with the dragged item under the pointer. */
export function withDrag(
  annotations: Annotation[],
  drag: AnnotationDrag | null
): Annotation[] {
  if (!drag) {
    return annotations;
  }
  return annotations.map((annotation) =>
    annotation.id === drag.id
      ? shiftAnnotation(annotation, drag.dx, drag.dy)
      : annotation
  );
}
