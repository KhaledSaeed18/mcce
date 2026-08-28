import type { EditorTool } from "@/lib/pdf-editor/types";

/** The Drive endpoint that serves raw file bytes, read server-side only. */
export const DRIVE_DOWNLOAD_ENDPOINT =
  "https://drive.usercontent.google.com/download";

/** The index is rebuilt by a sync, not by edits to a file already published. */
export const PDF_PROXY_CACHE_CONTROL = "public, max-age=3600";

/** Where the copied pdf.js font files are served from, also used by the copy step. */
export const PDF_STANDARD_FONTS_PATH = "/pdfjs/standard_fonts/";

export const PDF_ANNOTATIONS_KEY_PREFIX = "mcce.pdf-annotations.v1";

export const MIN_ZOOM = 0.5;
export const MAX_ZOOM = 4;
export const ZOOM_STEP = 0.25;
export const DEFAULT_ZOOM = 1.25;

/** Letter size in points, held before a page reports its own dimensions so the
 * list has something to scroll and observe. */
export const PLACEHOLDER_PAGE_SIZE = { height: 792, width: 612 };

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

/** Matches the Helvetica the export embeds, so the canvas previews what is saved. */
export const ANNOTATION_FONT_FAMILY = "Helvetica, Arial, sans-serif";

export const FONT_SIZES = [12, 16, 24, 32] as const;
export const DEFAULT_FONT_SIZE = 16;

/** Page-space radius around the pointer that counts as touching a stroke. */
export const ERASER_TOLERANCE = 6;

/** A drag shorter than this is a click, not a shape. */
export const MIN_SHAPE_SIZE = 4;

export const DEFAULT_TOOL: EditorTool = "pen";

/** Every toolbar control is pinned to the icon buttons' height so the row reads as one strip. */
export const EDITOR_CONTROL_HEIGHT_CLASS = "h-9";

/** The select primitive sets its height from a data attribute, which a plain h-9 cannot outweigh. */
export const EDITOR_SELECT_HEIGHT_CLASS = "data-[size=default]:h-9";

/** Matches the shortcut video players use, so it needs no explaining. */
export const FULLSCREEN_HOTKEY_KEY = "f";

export const EDITOR_BRAND_LABEL = "Editor";

/** Shown in the file bar before a file is picked. */
export const EDITOR_EMPTY_TITLE = "PDF editor";

/** The editor route drops the site chrome, so it owns the whole viewport. */
export const EDITOR_HEIGHT_CLASS = "h-dvh";

export const EDITOR_EXPORT_SUFFIX = "-annotated.pdf";

/** Only reached if an export is somehow triggered with no file open. */
export const DEFAULT_EXPORT_NAME = "document.pdf";

export const TOOL_LABELS: Record<EditorTool, string> = {
  ellipse: "Circle",
  eraser: "Eraser",
  pen: "Pen",
  rect: "Square",
  text: "Text",
};
