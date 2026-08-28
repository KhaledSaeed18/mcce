import { MIN_SHAPE_SIZE } from "@/config/pdf-editor";
import { normalizeRect } from "./geometry";
import { createAnnotationId } from "./pointer";
import type { Annotation, EditorTool, Point, ToolSettings } from "./types";

/** The live shape while a drag is in progress, and what gets committed on release. */
export function buildShape(
  tool: Extract<EditorTool, "ellipse" | "rect">,
  start: Point,
  end: Point,
  pageIndex: number,
  settings: ToolSettings
): Annotation {
  return {
    ...normalizeRect(start, end),
    color: settings.color,
    id: createAnnotationId(),
    pageIndex,
    strokeWidth: settings.strokeWidth,
    type: tool,
  };
}

export function buildStroke(
  points: Point[],
  pageIndex: number,
  settings: ToolSettings
): Annotation {
  return {
    color: settings.color,
    id: createAnnotationId(),
    pageIndex,
    points,
    type: "pen",
    width: settings.strokeWidth,
  };
}

export function buildText(
  text: string,
  point: Point,
  pageIndex: number,
  settings: ToolSettings
): Annotation {
  return {
    color: settings.color,
    fontSize: settings.fontSize,
    id: createAnnotationId(),
    pageIndex,
    text,
    type: "text",
    x: point.x,
    y: point.y,
  };
}

/** A stray click should not leave an invisible zero-sized shape behind. */
export function isShapeTooSmall(annotation: Annotation): boolean {
  return (
    annotation.type !== "pen" &&
    annotation.type !== "text" &&
    (annotation.width < MIN_SHAPE_SIZE || annotation.height < MIN_SHAPE_SIZE)
  );
}
