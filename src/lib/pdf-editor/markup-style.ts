import {
  ANNOTATION_COLORS,
  HIGHLIGHT_COLORS,
  HIGHLIGHT_WIDTHS,
  STROKE_WIDTHS,
} from "@/config/pdf-editor";
import type { Annotation } from "./types";

/** What the floating toolbar offers for a piece of markup. A cover brings its
 * own color, so it offers neither. */
export interface MarkupStyleOptions {
  colors: readonly string[];
  /** Absent for markup with no line whose width could change. */
  widths?: readonly number[];
}

function isHighlightInk(annotation: Annotation): boolean {
  return (
    annotation.type === "highlight" ||
    (annotation.type === "mark" && annotation.style === "highlight")
  );
}

export function getMarkupStyleOptions(
  annotation: Annotation
): MarkupStyleOptions | null {
  if (annotation.type === "cover") {
    return null;
  }
  const colors = isHighlightInk(annotation)
    ? HIGHLIGHT_COLORS
    : ANNOTATION_COLORS;
  if (annotation.type === "mark") {
    return { colors };
  }
  return {
    colors,
    widths: annotation.type === "highlight" ? HIGHLIGHT_WIDTHS : STROKE_WIDTHS,
  };
}

/** The width of a line, held under a different name by strokes and shapes. */
export function getMarkupWidth(annotation: Annotation): number | null {
  if (annotation.type === "pen" || annotation.type === "highlight") {
    return annotation.width;
  }
  if (
    annotation.type === "rect" ||
    annotation.type === "ellipse" ||
    annotation.type === "arrow"
  ) {
    return annotation.strokeWidth;
  }
  return null;
}

export function withMarkupWidth(
  annotation: Annotation,
  width: number
): Annotation {
  if (annotation.type === "pen" || annotation.type === "highlight") {
    return { ...annotation, width };
  }
  if (
    annotation.type === "rect" ||
    annotation.type === "ellipse" ||
    annotation.type === "arrow"
  ) {
    return { ...annotation, strokeWidth: width };
  }
  return annotation;
}
