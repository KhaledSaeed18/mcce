import type { DriveNode } from "@/lib/drive/types";

/** What the editor's file sidebar needs of a node: enough to list, sort, and walk up the tree. */
export type EditorTreeNode = Pick<
  DriveNode,
  "id" | "kind" | "name" | "parentId"
>;

/** The open file, trimmed to what the file bar, export, and Drive link read. */
export type EditorFile = Pick<
  DriveNode,
  "id" | "name" | "parentId" | "webViewLink"
>;

export type EditorTool =
  | "pen"
  | "highlight"
  | "eraser"
  | "rect"
  | "ellipse"
  | "arrow"
  | "text"
  | "hand";

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

/** A wide see-through stroke laid over what it marks, so the page shows through. */
export interface HighlightAnnotation extends AnnotationBase {
  points: Point[];
  type: "highlight";
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

/** A straight line with an open head at the end the drag finished on. */
export interface ArrowAnnotation extends AnnotationBase {
  from: Point;
  strokeWidth: number;
  to: Point;
  type: "arrow";
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

export type Annotation =
  | ArrowAnnotation
  | HighlightAnnotation
  | PenAnnotation
  | ShapeAnnotation
  | TextAnnotation;

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
  /** Puts back a zoom saved earlier, fitted or not. */
  restore: (mode: ZoomMode, value: number) => void;
  value: number;
  zoomIn: () => void;
  zoomOut: () => void;
}

/** Where a file was left: the page being read and how it was zoomed. */
export interface SavedView {
  page: number;
  zoom: number;
  zoomMode: ZoomMode;
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
  batchErase: (pageId: string, points: Point[]) => void;
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

/** One line of the help panel's shortcut list. */
export interface ShortcutEntry {
  /** Keys pressed together, joined by "+", with "Mod" for Cmd or Ctrl. */
  keys: string;
  label: string;
}

export interface ShortcutGroup {
  items: readonly ShortcutEntry[];
  title: string;
}

/** Whether the open file's markup made it into this browser's storage. */
export type SaveStatus = "saved" | "failed";

export interface EditorPanels {
  isBrowserOpen: boolean;
  isRailOpen: boolean;
}

/** The spot at the middle of the scroller, held as a place in a page rather
 * than a pixel offset so it survives the pages changing size. */
export interface ScrollAnchor {
  /** How far across the scrolled content the middle sits, from 0 to 1. */
  centerX: number;
  /** How far down its page the middle sits, from 0 to 1. */
  fraction: number;
  index: number;
}
