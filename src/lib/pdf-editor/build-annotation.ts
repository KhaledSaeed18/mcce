import { MIN_SHAPE_SIZE } from "@/config/pdf-editor";
import { normalizeRect } from "./geometry";
import { createAnnotationId } from "./pointer";
import type {
  Annotation,
  EditorTool,
  Point,
  TextAnnotation,
  TextDraft,
  ToolSettings,
} from "./types";

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

/** Keeps the draft's id when there is one, so editing replaces rather than duplicates. */
export function buildText(draft: TextDraft, text: string): TextAnnotation {
  return {
    color: draft.color,
    fontSize: draft.fontSize,
    id: draft.id ?? createAnnotationId(),
    pageIndex: draft.pageIndex,
    text,
    type: "text",
    width: draft.width,
    x: draft.x,
    y: draft.y,
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
