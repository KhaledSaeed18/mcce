import { MIN_SHAPE_SIZE, MIN_STROKE_POINTS } from "@/config/pdf-editor";
import { normalizeRect } from "./geometry";
import { createAnnotationId } from "./pointer";
import type {
  Annotation,
  Box,
  EditorTool,
  Point,
  TextAnnotation,
  TextDraft,
  TextMarkStyle,
  ToolSettings,
} from "./types";

/** The live shape while a drag is in progress, and what gets committed on release. */
export function buildShape(
  tool: Extract<EditorTool, "ellipse" | "rect">,
  start: Point,
  end: Point,
  pageId: string,
  settings: ToolSettings
): Annotation {
  return {
    ...normalizeRect(start, end),
    color: settings.color,
    id: createAnnotationId(),
    pageId,
    strokeWidth: settings.strokeWidth,
    type: tool,
  };
}

export function buildArrow(
  from: Point,
  to: Point,
  pageId: string,
  settings: ToolSettings
): Annotation {
  return {
    color: settings.color,
    from,
    id: createAnnotationId(),
    pageId,
    strokeWidth: settings.strokeWidth,
    to,
    type: "arrow",
  };
}

export function buildStroke(
  points: Point[],
  pageId: string,
  settings: ToolSettings
): Annotation {
  return {
    color: settings.color,
    id: createAnnotationId(),
    pageId,
    points,
    type: "pen",
    width: settings.strokeWidth,
  };
}

export function buildHighlight(
  points: Point[],
  pageId: string,
  settings: ToolSettings
): Annotation {
  return {
    color: settings.color,
    id: createAnnotationId(),
    pageId,
    points,
    type: "highlight",
    width: settings.strokeWidth,
  };
}

export function buildTextMark(
  style: TextMarkStyle,
  boxes: Box[],
  pageId: string,
  color: string
): Annotation {
  return {
    boxes,
    color,
    id: createAnnotationId(),
    pageId,
    style,
    type: "mark",
  };
}

/** Keeps the draft's id when there is one, so editing replaces rather than duplicates. */
export function buildText(draft: TextDraft, text: string): TextAnnotation {
  return {
    color: draft.color,
    fontSize: draft.fontSize,
    id: draft.id ?? createAnnotationId(),
    pageId: draft.pageId,
    text,
    type: "text",
    width: draft.width,
    x: draft.x,
    y: draft.y,
  };
}

/**
 * A stray click should not leave markup behind that draws nothing: neither the
 * canvas nor the export puts ink down for a zero-sized shape or a one point
 * stroke, but both would still carry it around and save it to the file.
 */
export function isEmptyAnnotation(annotation: Annotation): boolean {
  if (annotation.type === "pen" || annotation.type === "highlight") {
    return annotation.points.length < MIN_STROKE_POINTS;
  }
  if (annotation.type === "text") {
    return false;
  }
  if (annotation.type === "mark") {
    return annotation.boxes.length === 0;
  }
  if (annotation.type === "arrow") {
    const { from, to } = annotation;
    return Math.hypot(to.x - from.x, to.y - from.y) < MIN_SHAPE_SIZE;
  }
  return (
    annotation.width < MIN_SHAPE_SIZE || annotation.height < MIN_SHAPE_SIZE
  );
}
