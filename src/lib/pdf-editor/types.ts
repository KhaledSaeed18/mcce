export type EditorTool = "pen" | "eraser" | "rect" | "ellipse" | "text";

/** Page space: PDF points, top-left origin, independent of the zoom it was drawn at. */
export interface Point {
  x: number;
  y: number;
}

interface AnnotationBase {
  color: string;
  id: string;
  /** The page this belongs to, by identity, so it survives pages moving. */
  pageId: string;
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

/** What it takes to lay text out, which a committed annotation and a draft both have. */
export interface TextGeometry {
  fontSize: number;
  text: string;
  /** The width text wraps at, absent while the box still grows with its content. */
  width?: number;
  x: number;
  /** Baseline of the first line. */
  y: number;
}

export interface TextAnnotation extends AnnotationBase, TextGeometry {
  type: "text";
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
  pageId: string;
}

/** A page being carried to another place in the document. */
export interface PageDrag {
  from: number;
  /** Which gap between thumbnails the page would drop into. */
  insertAt: number;
}

/**
 * A page as the editor holds it, which is not necessarily how the file holds it:
 * which page of the file it shows, and how far it has been turned from upright.
 */
export interface EditorPage {
  id: string;
  /** Quarter turns clockwise, on top of the page's own orientation. */
  rotation: number;
  sourceIndex: number;
}

/**
 * Everything about a file that the reader can change and take back: the markup
 * and the pages it sits on. They move together because removing a page removes
 * what was written on it.
 */
export interface EditorSnapshot {
  annotations: Annotation[];
  pages: EditorPage[];
}

/** Whether the zoom is a number the reader picked or one fitted to the window. */
export type ZoomMode = "custom" | "fit-page" | "fit-width";

/** How the pages are scaled, and the ways the reader can change that. */
export interface ZoomControl {
  fitPage: () => void;
  fitWidth: () => void;
  mode: ZoomMode;
  value: number;
  zoomIn: () => void;
  zoomOut: () => void;
}

/** Where the reader is in the document, and how to move them somewhere else. */
export interface PageNavigation {
  activeIndex: number;
  goToPage: (index: number) => void;
  pageCount: number;
}

/** Which side of a text box a resize drag has hold of. */
export type TextBoxEdge = "left" | "right";

/** Every way the page list can change the markup, kept together as they travel down. */
export interface AnnotationActions {
  add: (annotation: Annotation) => void;
  erase: (pageId: string, point: Point) => void;
  moveText: (id: string, dx: number, dy: number) => void;
  remove: (id: string) => void;
  replace: (annotation: Annotation) => void;
  select: (id: string | null) => void;
}

export interface ToolSettings {
  color: string;
  fontSize: number;
  strokeWidth: number;
  tool: EditorTool;
}
