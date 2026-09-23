import type { EditorPanels, EditorTool } from "@/lib/pdf-editor/types";

export const EDITOR_PATH = "/editor";

export const EDITOR_MIN_WIDTH_PX = 1225;
export const EDITOR_VIEWPORT_QUERY = `(min-width: ${EDITOR_MIN_WIDTH_PX}px)`;

/** The server cannot measure the screen, so until hydration the narrow-screen
 * notice hides itself by CSS on wide ones. Tailwind reads class names from the
 * source, which is why this repeats EDITOR_MIN_WIDTH_PX instead of using it. */
export const EDITOR_NARROW_ONLY_CLASS = "min-[1225px]:hidden";

/** The Drive endpoint that serves raw file bytes, read server-side only. */
export const DRIVE_DOWNLOAD_ENDPOINT =
  "https://drive.usercontent.google.com/download";

/** The index is rebuilt by a sync, not by edits to a file already published. */
export const PDF_PROXY_CACHE_CONTROL = "public, max-age=3600";

/** Where the copied pdf.js font files are served from, also used by the copy step. */
export const PDF_STANDARD_FONTS_PATH = "/pdfjs/standard_fonts/";

/** Markup only, from before pages could be edited. Still read, never written. */
export const PDF_ANNOTATIONS_KEY_PREFIX = "mcce.pdf-annotations.v1";

export const PDF_DOCUMENT_KEY_PREFIX = "mcce.pdf-document.v1";

export const EDITOR_PANELS_STORAGE_KEY = "mcce.editor-panels.v1";

/** One key per file: the page and zoom it was left at. */
export const PDF_VIEW_KEY_PREFIX = "mcce.pdf-view.v1";

export const DEFAULT_EDITOR_PANELS: EditorPanels = {
  isBrowserOpen: true,
  isRailOpen: false,
};

/** The page list's padding and borders, which a fitted page has to leave room for. */
export const PAGE_FIT_PADDING = 56;

export const MIN_ZOOM = 0.5;
export const MAX_ZOOM = 4;
export const ZOOM_STEP = 0.25;
export const DEFAULT_ZOOM = 1.25;

/** Wheel travel that makes one zoom step: about one mouse notch, or a short
 * trackpad pinch, which arrives as many small ctrl+wheel deltas. */
export const WHEEL_ZOOM_STEP_DELTA = 60;

/** How far a Safari pinch has to scale before it counts as one zoom step. */
export const GESTURE_ZOOM_STEP_SCALE = 1.15;

/** Letter size in points, held before a page reports its own dimensions so the
 * list has something to scroll and observe. */
export const PLACEHOLDER_PAGE_SIZE = { height: 792, width: 612 };

/** How wide a page is drawn in the thumbnail rail, in screen pixels. */
export const THUMBNAIL_WIDTH = 116;

/** Shared by the rail and its loading stand-in, so switching files does not move the pages. */
export const RAIL_WIDTH_CLASS = "w-40";

/** Enough stand-in thumbnails to fill the rail on most screens while a file loads. */
export const RAIL_PLACEHOLDER_COUNT = 5;

/** Pages turn in quarter turns, clockwise, and come back round after four. */
export const PAGE_QUARTER_TURN = 90;
export const PAGE_HALF_TURN = 180;
export const PAGE_THREE_QUARTER_TURN = 270;
export const PAGE_FULL_TURN = 360;

/** Marks each thumbnail so a drag can work out which page it is over. */
export const RAIL_POSITION_ATTRIBUTE = "data-rail-position";

/** Below this a press on a thumbnail is a click that goes to the page, not a drag. */
export const PAGE_DRAG_TOLERANCE = 4;

/** Marks each page in the scroller so the one on screen can be found and scrolled to. */
export const PAGE_INDEX_ATTRIBUTE = "data-page-index";

/** Collapses the observed area to a line across the middle of the scroller, so
 * exactly one page counts as the one being read. */
export const VISIBLE_PAGE_ROOT_MARGIN = "-50% 0px -50% 0px";

/** Above this the canvas costs more memory than the sharpness is worth. */
export const MAX_RENDER_DPR = 2;

export const ANNOTATION_COLORS = [
  "#e63946",
  "#1a1815",
  "#ff9f1c",
  "#2a9d8f",
  "#3a6ea5",
] as const;

export const DEFAULT_COLOR: string = ANNOTATION_COLORS[0];

export const STROKE_WIDTHS = [1, 2, 4, 8] as const;
export const DEFAULT_STROKE_WIDTH = 2;

/** The highlighter keeps its own colors and widths: marker shades read through
 * over text, and a highlight is far wider than a pen line. */
export const HIGHLIGHT_COLORS = [
  "#ffd60a",
  "#80ed99",
  "#ff8fab",
  "#8ecae6",
  "#ffb703",
] as const;
export const DEFAULT_HIGHLIGHT_COLOR: string = HIGHLIGHT_COLORS[0];

export const HIGHLIGHT_WIDTHS = [8, 12, 16, 24] as const;
export const DEFAULT_HIGHLIGHT_WIDTH = 12;

/** Light enough that black text under a highlight stays easy to read. */
export const HIGHLIGHT_OPACITY = 0.4;

/** Matches the Helvetica the export embeds, so the canvas previews what is saved. */
export const ANNOTATION_FONT_FAMILY = "Helvetica, Arial, sans-serif";

export const FONT_SIZES = [12, 16, 24, 32] as const;
export const DEFAULT_FONT_SIZE = 16;

/**
 * How far back the reader can step. Each step holds the whole file's markup and
 * pages, so an uncapped history would grow without limit over a long sitting.
 */
export const MAX_HISTORY_STEPS = 100;

/** Page-space radius around the pointer that counts as touching a stroke. */
export const ERASER_TOLERANCE = 6;

/** Helvetica sits roughly this far above and below its baseline, as a share of the font size. */
export const TEXT_ASCENT_RATIO = 0.8;
export const TEXT_DESCENT_RATIO = 0.2;

/** Line spacing as a share of the font size. */
export const TEXT_LINE_HEIGHT_RATIO = 1.25;

/** Used only where no canvas exists to measure with, which is server-side rendering. */
export const TEXT_WIDTH_FALLBACK_RATIO = 0.5;

/** Keeps clamped markup off the very edge of the page. */
export const PAGE_INSET = 2;

/** The outline that marks the text under the pointer as movable. */
export const TEXT_HIGHLIGHT_PADDING = 3;
export const TEXT_HIGHLIGHT_ALPHA = 0.7;
export const TEXT_HIGHLIGHT_WIDTH = 1;
export const TEXT_HIGHLIGHT_DASH = [4, 3];

/** Narrower than this and a wrapped box has nowhere left to put a word. */
export const MIN_TEXT_BOX_WIDTH = 32;

/** An empty field still needs somewhere to put the caret and the placeholder. */
export const EMPTY_TEXT_BOX_WIDTH = 140;

/** A drag shorter than this is a click, not a shape. */
export const MIN_SHAPE_SIZE = 4;

/** An arrow's head grows with its line so a thick arrow keeps its shape,
 * but never shrinks below what reads as a head on a thin one. */
export const ARROW_HEAD_LENGTH_RATIO = 4;
export const ARROW_HEAD_MIN_LENGTH = 10;

/** How far each side of the head opens from the line, in radians. */
export const ARROW_HEAD_ANGLE = Math.PI / 7;

/** A stroke needs two points to be a line; one is a press that never moved. */
export const MIN_STROKE_POINTS = 2;

/** Below this a press on text is a click that opens it for editing, not a move. */
export const TEXT_MOVE_TOLERANCE = 3;

export const DEFAULT_TOOL: EditorTool = "pen";

/** Every toolbar control is pinned to the icon buttons' height so the row reads as one strip. */
export const EDITOR_CONTROL_HEIGHT_CLASS = "h-9";

/** The select primitive sets its height from a data attribute, which a plain h-9 cannot outweigh. */
export const EDITOR_SELECT_HEIGHT_CLASS = "data-[size=default]:h-9";

/** All header icon controls share the same height, shadow, and hover states as the brand and drive buttons. */
export const EDITOR_HEADER_ICON_BUTTON_CLASS =
  "size-8 p-0 bg-card shadow-sm hover:bg-primary hover:text-primary-foreground hover:shadow-md";

/** Matches the shortcut video players use, so it needs no explaining. */
export const FULLSCREEN_HOTKEY_KEY = "f";

/** Opens the help panel, the key most editors use for their shortcut list. */
export const HELP_HOTKEY_KEY = "?";

/** Held to pan with the hand, as in most drawing and design tools. */
export const PAN_HOTKEY_KEY = " ";

export const UNDO_HOTKEY_KEY = "z";
export const REDO_HOTKEY_KEY = "y";

/** Both keys remove on a Mac keyboard, where only one of them is printed. */
export const DELETE_HOTKEY_KEYS: readonly string[] = ["Delete", "Backspace"];
export const DESELECT_HOTKEY_KEY = "Escape";

/** Shown in each control's tooltip. "Mod" becomes Cmd on a Mac and Ctrl elsewhere. */
export const SHORTCUT_HINTS = {
  deleteText: "Delete",
  deselect: "Esc",
  export: "Mod+S",
  fitWidth: "Mod+0",
  fullscreen: "F",
  help: "?",
  nextPage: "Right arrow",
  pan: "Space",
  previousPage: "Left arrow",
  redo: "Mod+Shift+Z",
  scrollZoom: "Mod+Scroll",
  undo: "Mod+Z",
  zoomIn: "Mod+=",
  zoomOut: "Mod+-",
} as const;

export const SAVE_STATUS_COPY = {
  failed: {
    detail:
      "This browser would not store your changes, most likely because its storage is full. Download a copy to keep them.",
    label: "Not saved",
  },
  saved: {
    detail:
      "Your markup and page changes are kept in this browser. Clearing its site data removes them.",
    label: "Saved on this device",
  },
} as const;

export const EDITOR_BRAND_LABEL = "Editor";

/** Shown in the file bar before a file is picked. */
export const EDITOR_EMPTY_TITLE = "PDF editor";

/** The editor route drops the site chrome, so it owns the whole viewport. */
export const EDITOR_HEIGHT_CLASS = "h-dvh";

export const EDITOR_EXPORT_SUFFIX = "-annotated.pdf";

/** Only reached if an export is somehow triggered with no file open. */
export const DEFAULT_EXPORT_NAME = "document.pdf";

export const TOOL_LABELS: Record<EditorTool, string> = {
  arrow: "Arrow",
  ellipse: "Circle",
  eraser: "Eraser",
  hand: "Hand",
  highlight: "Highlighter",
  pen: "Pen",
  rect: "Square",
  text: "Text",
};

export const TOOL_HOTKEYS: Record<EditorTool, string> = {
  arrow: "a",
  ellipse: "c",
  eraser: "e",
  hand: "h",
  /** The key Acrobat uses for highlighting. */
  highlight: "u",
  pen: "p",
  rect: "r",
  text: "t",
};

export const EDITOR_IDLE_TITLE = "No file open";
export const EDITOR_IDLE_NOTE = "pick a PDF from the sidebar";
export const EDITOR_IDLE_NOTE_HIDDEN = "the sidebar is tucked away";
export const EDITOR_IDLE_SHOW_FILES = "Show files";
export const EDITOR_RECENT_TITLE = "Recently opened";
export const EDITOR_SHORTCUTS_TITLE = "Once a file is open";

/** Enough to resume the last few files without the list outgrowing the blank page above it. */
export const EDITOR_RECENT_LIMIT = 4;

/** The order the shortcuts are listed on the blank page, most used first. */
export const EDITOR_SHORTCUT_TOOLS: readonly EditorTool[] = [
  "pen",
  "highlight",
  "text",
  "rect",
  "ellipse",
  "arrow",
  "eraser",
  "hand",
];

/** Degrees each sheet behind the blank page settles at, with a small overshoot on the way. */
export const EDITOR_PAPER_FAN = {
  back: -5,
  middle: 3,
  transition: { damping: 12, stiffness: 140, type: "spring" },
} as const;
