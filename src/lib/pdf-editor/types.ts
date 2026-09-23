import type { DriveNode } from "@/lib/drive/types";

/** What the editor's file sidebar needs of a node: enough to list, sort, and walk up the tree. */
export type EditorTreeNode = Pick<
  DriveNode,
  "id" | "kind" | "name" | "parentId"
>;

/** A file from the index, trimmed to what the file bar, export, and Drive link read. */
export interface DriveEditorFile
  extends Pick<DriveNode, "id" | "name" | "parentId" | "webViewLink"> {
  source: "drive";
}

/** A PDF the reader opened from their own computer, kept in this browser. */
export interface LocalEditorFile {
  id: string;
  name: string;
  source: "local";
}

/** The open file. Where it came from decides how its bytes are fetched. */
export type EditorFile = DriveEditorFile | LocalEditorFile;

/** What is kept about a PDF from the reader's computer, apart from its bytes. */
export interface LocalPdfMeta {
  addedAt: string;
  id: string;
  name: string;
  size: number;
}

/** Why a file from the reader's computer was turned away. */
export type LocalPdfProblem = "empty" | "not-pdf" | "too-large";

export type FilePanelTab = "device" | "index";

/** What search needs of a page's text item, as pdf.js reports it. */
export interface PageTextItem {
  hasEOL?: boolean;
  str: string;
}

/** One page's text run together for searching, lowercased, with where each
 * of its items starts so a match can be traced back to the items it covers. */
export interface PageText {
  itemStarts: number[];
  text: string;
}

/** A place in a page's text: which item, and how far into it. */
export interface TextPoint {
  item: number;
  offset: number;
}

/** A run of text on a page. The end is exclusive, as in a string slice. */
export interface TextSpan {
  end: TextPoint;
  start: TextPoint;
}

/** A match as one page draws it: where it is, and whether it is the one the reader is on. */
export interface SearchHit {
  isCurrent: boolean;
  span: TextSpan;
}

export interface SearchMatch extends TextSpan {
  /** Where the page sits in the document now, not where it sat in the file. */
  position: number;
}

/** The editor's URL: a file from the index, or one from this device. */
export interface EditorSearch {
  file?: string;
  local?: string;
}

export type EditorTool =
  | "select"
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

/** How a text mark sits on the text it covers. */
export type TextMarkStyle = "highlight" | "strike" | "underline";

/** A mark laid over text picked with the select tool, one box per line. */
export interface TextMarkAnnotation extends AnnotationBase {
  boxes: Box[];
  style: TextMarkStyle;
  type: "mark";
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
  | TextAnnotation
  | TextMarkAnnotation;

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
  /** Several at once, as a single undo step. */
  addMany: (annotations: Annotation[]) => void;
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
