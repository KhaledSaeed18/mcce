import {
  EDITOR_MIN_WIDTH_PX,
  EXPORT_LABEL,
  SHORTCUT_HINTS,
} from "@/config/pdf-editor";
import type { ShortcutGroup } from "@/lib/pdf-editor/types";

export const EDITOR_HELP_LABEL = "Help and shortcuts";

export const EDITOR_HELP_TITLE = "Using the editor";

export const EDITOR_HELP_DESCRIPTION =
  "Mark up PDFs from the MCCE index or your computer, then download a copy.";

export const EDITOR_HELP_FACTS: readonly string[] = [
  "Only PDF files open here. Other files in the index stay in Google Drive.",
  "PDFs you open from your computer are kept in this browser, so they open again later without choosing them.",
  "Changes save on their own in this browser, one file at a time. They do not sync to other devices, and clearing site data removes them.",
  "Download copy saves a new PDF with your markup and page changes. The file in Google Drive never changes.",
  "The page rail turns, copies, removes, and reorders pages, and adds a blank or squared page after any page to work a problem on. Drag a thumbnail to move it.",
  "The select tool picks text to copy, highlight, underline, or strike through, and picks up markup to move it. Delete removes what is selected.",
  "The contents panel, opened from the top right, lists the PDF's own table of contents when it has one, and the pages you bookmarked.",
  "The answer cover draws a box over an answer to quiz yourself. With the select tool, click a cover to see what it hides and again to hide it. The eye button shows or hides every answer at once. Covers stay out of downloads.",
  "Exam mode, the timer button, counts down a sample exam. Every answer cover stays hidden until time is up, then drawing stops and your answers are kept in this browser.",
  "Restore the original file drops every change at once. Undo brings them back.",
  `The editor needs a screen at least ${EDITOR_MIN_WIDTH_PX}px wide.`,
];

export const EDITOR_HELP_TOOLS_TITLE = "Tools";

export const EDITOR_HELP_SHORTCUT_GROUPS: readonly ShortcutGroup[] = [
  {
    items: [
      { keys: SHORTCUT_HINTS.undo, label: "Undo" },
      { keys: SHORTCUT_HINTS.redo, label: "Redo" },
      { keys: SHORTCUT_HINTS.deleteText, label: "Delete what is selected" },
      { keys: SHORTCUT_HINTS.copyMarkup, label: "Copy selected markup" },
      { keys: SHORTCUT_HINTS.pasteMarkup, label: "Paste markup" },
      { keys: SHORTCUT_HINTS.deselect, label: "Let go of the selection" },
      { keys: SHORTCUT_HINTS.export, label: EXPORT_LABEL },
    ],
    title: "Edit",
  },
  {
    items: [
      { keys: SHORTCUT_HINTS.zoomIn, label: "Zoom in" },
      { keys: SHORTCUT_HINTS.zoomOut, label: "Zoom out" },
      { keys: SHORTCUT_HINTS.scrollZoom, label: "Zoom, or pinch" },
      { keys: SHORTCUT_HINTS.fitWidth, label: "Fit the width" },
      { keys: SHORTCUT_HINTS.pan, label: "Pan while held" },
      { keys: SHORTCUT_HINTS.fullscreen, label: "Full screen" },
    ],
    title: "View",
  },
  {
    items: [
      { keys: SHORTCUT_HINTS.previousPage, label: "Previous page" },
      { keys: SHORTCUT_HINTS.nextPage, label: "Next page" },
      { keys: SHORTCUT_HINTS.bookmark, label: "Bookmark this page" },
      { keys: SHORTCUT_HINTS.search, label: "Search this file" },
      { keys: SHORTCUT_HINTS.searchNext, label: "Next match" },
      { keys: SHORTCUT_HINTS.searchPrevious, label: "Previous match" },
      { keys: SHORTCUT_HINTS.help, label: "Open this panel" },
    ],
    title: "Move around",
  },
];
