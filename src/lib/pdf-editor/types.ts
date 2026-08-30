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

/** What it takes to measure text, which a committed annotation and a draft both have. */
export interface TextGeometry {
  fontSize: number;
  text: string;
  x: number;
  y: number;
}

export type Annotation = PenAnnotation | ShapeAnnotation | TextAnnotation;

export interface PageSize {
  height: number;
  width: number;
}

/** A rectangle in page space, used for hit tests and for keeping markup on the page. */
export interface Box {
  height: number;
  width: number;
  x: number;
  y: number;
}

/** Where a text annotation is being typed, before it is committed. */
export interface TextDraft extends TextGeometry {
  color: string;
  /** Set while existing text is being edited, and empty while new text is written. */
  id?: string;
  pageIndex: number;
}

/** Every way the page list can change the markup, kept together as they travel down. */
export interface AnnotationActions {
  add: (annotation: Annotation) => void;
  erase: (pageIndex: number, point: Point) => void;
  moveText: (id: string, dx: number, dy: number) => void;
  remove: (id: string) => void;
  replace: (annotation: Annotation) => void;
}

export interface ToolSettings {
  color: string;
  fontSize: number;
  strokeWidth: number;
  tool: EditorTool;
}
