import type { DriveNode } from "@/lib/drive/types";

/** What the editor needs of a node: enough to list, sort, and walk up the
 * tree, to label a file by what it is for, and to find its course. */
export type EditorTreeNode = Pick<
  DriveNode,
  | "courseCode"
  | "id"
  | "kind"
  | "materialType"
  | "modifiedTime"
  | "name"
  | "parentId"
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

/** Enough of a file to fetch its bytes. */
export type EditorFileRef = Pick<EditorFile, "id" | "source">;

/** A file kept open as a tab: enough to name it and open it again. */
export interface OpenFile {
  id: string;
  name: string;
  source: EditorFile["source"];
}

/** The files open as tabs, and what moving between them needs. */
export interface EditorDesk {
  /** Newest first, for bringing back a tab closed by mistake. */
  closed: OpenFile[];
  /** In tab order. */
  files: OpenFile[];
  /** Ids from the file shown most recently back. */
  recent: string[];
}

/** What a tab key asks for, before the tabs it applies to are known. */
export type TabKey =
  | { index: number | "last"; type: "go" }
  | { step: -1 | 1; type: "step" }
  | { type: "back" }
  | { type: "close" }
  | { step: -1 | 1; type: "move" }
  | { type: "reopen" };

/** What a tab key does once the tabs are known. */
export type TabKeyResult =
  | { file: OpenFile; type: "show" }
  | { from: number; to: number; type: "move" }
  | { id: string; type: "close" };

/** A group of files saved to come back to together, like everything open
 * while preparing for one exam, with how they were laid out. */
export interface StudySet {
  /** The file in the second pane, when the set was saved split. */
  besideId: string | null;
  files: OpenFile[];
  id: string;
  /** The scroll lock's gap, when the two panes scrolled together. */
  lockGap: number | null;
  name: string;
  /** The file in the first pane, or on its own. */
  primaryId: string | null;
  savedAt: string;
}

/** Two panes scrolling together: the files it joins, as "first|second",
 * and how many pages the second is ahead of the first. */
export interface PaneLock {
  files: string;
  gap: number;
}

/** The short tag a tab carries for what its file is for. */
export type FileChip =
  | "book"
  | "ex"
  | "exam"
  | "hw"
  | "lab"
  | "lec"
  | "quiz"
  | "sheet"
  | "sol";

/** How a tab names its file: a tag for what it is, and a short name. */
export interface TabLabel {
  chip: FileChip | null;
  text: string;
}

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

/** The two panes files can be shown in, the first always there. */
export type EditorPaneSide = "beside" | "primary";

/** The editor's URL: the file in the first pane, from the index or from this
 * device, and any file shown beside it. */
export interface EditorSearch {
  /** The second pane's file, from either place: ids from this device carry
   * their own prefix. */
  beside?: string;
  file?: string;
  /** Set while the second pane has focus. */
  focus?: "beside";
  local?: string;
  /** Files to open together, by id, from a shared study set link. */
  set?: string;
  /** A study set saved in this browser to open. */
  setId?: string;
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
  | "note"
  | "cover"
  | "clip"
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
  /** The words it marks, kept for the notes list. Absent on marks made before it was. */
  text?: string;
  type: "mark";
}

/** A sticky note pinned to a place on the page, by its top left corner. */
export interface NoteAnnotation extends AnnotationBase, Point {
  text: string;
  type: "note";
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

/** A box laid over an answer, hiding it until the reader looks. It stays in
 * the editor: a download is the file as marked, not a quiz. */
export interface CoverAnnotation extends AnnotationBase, Box {
  type: "cover";
}

export type Annotation =
  | ArrowAnnotation
  | CoverAnnotation
  | HighlightAnnotation
  | NoteAnnotation
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

/** A page the reader put in to work on: plain, or ruled in squares. */
export type PageSheet = "blank" | "grid";

/**
 * A page as the editor holds it, which is not necessarily how the file holds it:
 * which page of the file it shows, and how far it has been turned from upright.
 */
export interface EditorPage {
  id: string;
  /** Quarter turns clockwise, on top of the page's own orientation. */
  rotation: number;
  /** Set on a page the reader put in, which shows a sheet instead of the file's
   * page. Its sourceIndex is then the page it was put in after, whose size it takes. */
  sheet?: PageSheet;
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

/** A file's steps either side of what is on screen, for undo and redo. */
export interface EditorHistory {
  future: EditorSnapshot[];
  past: EditorSnapshot[];
  present: EditorSnapshot;
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

/** Which corner of a selected markup's frame a resize drag has hold of. */
export type FrameCorner =
  | "bottom-left"
  | "bottom-right"
  | "top-left"
  | "top-right";

/** Which side of a text box a resize drag has hold of. */
export type TextBoxEdge = "left" | "right";

/** A timed attempt at the open file, kept so a reload does not stop the clock. */
export interface ExamSession {
  /** When time runs out, in milliseconds since the epoch. */
  endsAt: number;
  minutes: number;
}

/** Which answer covers are showing what they hide, and how a page shows one. */
export interface CoverReveal {
  revealed: ReadonlySet<string>;
  /** Shows a hidden answer, or hides a shown one. Anything but a cover is ignored. */
  toggle: (id: string) => void;
}

/** Every way the rail can change the pages, kept together as they travel down. */
export interface PageActions {
  /** Keeps the whole page in view as a clip. */
  clip: (id: string) => void;
  copy: (id: string) => void;
  /** Puts a sheet to work on directly after a page. */
  insertSheet: (afterId: string, sheet: PageSheet) => void;
  move: (from: number, to: number) => void;
  remove: (id: string) => void;
  rotate: (id: string) => void;
}

/** Every way the page list can change the markup, kept together as they travel down. */
export interface AnnotationActions {
  add: (annotation: Annotation) => void;
  /** Several at once, as a single undo step. */
  addMany: (annotations: Annotation[]) => void;
  batchErase: (pageId: string, points: Point[]) => void;
  /** Keeps a part of the page in view as a clip. */
  clip: (pageId: string, box: Box) => void;
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
  isStudyOpen: boolean;
}

/** The tabs of the panel right of the pages. */
export type StudyPanelTab = "bookmarks" | "contents" | "notes";

/** A note or a highlight as the notes list shows it, in reading order. */
export interface StudyItem {
  annotation: HighlightAnnotation | NoteAnnotation | TextMarkAnnotation;
  /** Where its page sits in the document now. */
  position: number;
  /** What it says or marks, empty when there is nothing to show. */
  text: string;
}

/** One line of a PDF's own table of contents, flattened out of its tree. */
export interface OutlineEntry {
  /** How far down the tree it sits, from 0 at the top. */
  depth: number;
  /** Its path through the tree, which stays the same for as long as the file does. */
  id: string;
  /** The page of the file it points at, or null when that cannot be worked out. */
  sourceIndex: number | null;
  title: string;
}

/** What the contents panel needs of an entry in pdf.js's outline tree. */
export interface OutlineNode {
  dest: unknown;
  items: OutlineNode[];
  title: string;
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
