export type EditorTool = "pen" | "eraser" | "rect" | "ellipse" | "text";

/** Page space: PDF points, top-left origin, independent of the zoom it was drawn at. */
export interface Point {
  x: number;
  y: number;
}

interface AnnotationBase {
  color: string;
  id: string;
  pageIndex: number;
}

export interface PenAnnotation extends AnnotationBase {
  points: Point[];
  type: "pen";
  width: number;
}

export interface ShapeAnnotation extends AnnotationBase {
  height: number;
  strokeWidth: number;
  type: "rect" | "ellipse";
  width: number;
  x: number;
  y: number;
}

export interface TextAnnotation extends AnnotationBase {
  fontSize: number;
  text: string;
  type: "text";
  x: number;
  /** Baseline of the first line. */
  y: number;
}

export type Annotation = PenAnnotation | ShapeAnnotation | TextAnnotation;

export interface PageSize {
  height: number;
  width: number;
}

/** Where a text annotation is being typed, before it is committed. */
export interface TextDraft {
  pageIndex: number;
  x: number;
  y: number;
}

export interface ToolSettings {
  color: string;
  fontSize: number;
  strokeWidth: number;
  tool: EditorTool;
}
