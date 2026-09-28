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
  "Every file you open gets a tab in the top bar, so a lecture, its exercises, and a past exam stay one click apart. Tabs come back after a reload. The button at the end of the tabs lists them all, and the files closed recently.",
  "Two files can sit side by side: right-click a tab and pick Open beside, or drag a tab onto the right half of the pages. The toolbar and keys act on the pane with the orange frame. The lock on the divider scrolls both together, keeping them as many pages apart as they were.",
  "The study sets button beside the tabs saves the open tabs as a set, with the split and the lock, and opens a saved set again in one step. The empty editor lists your sets to rename, delete, or copy a link that opens the same files in another browser.",
  "A paper with a solution in the index shows a dashed Solution beside tab, which opens the solution on the same page with the two scrolling together. Hold M to peek at it without opening it.",
  "Download copy saves a new PDF with your markup and page changes. The file in Google Drive never changes.",
  "The page rail turns, copies, removes, and reorders pages, and adds a blank or squared page after any page to work a problem on. Drag a thumbnail to move it.",
  "The select tool picks text to copy, highlight, underline, or strike through, and picks up markup to move it. Delete removes what is selected.",
  "The contents panel, opened from the top right, lists the PDF's own table of contents when it has one, the pages you bookmarked, and every note and highlight by page, which download as a revision summary.",
  "The note tool (N) pins a sticky note to a place on the page. Downloaded copies keep notes as PDF notes that other readers open.",
  "The answer cover draws a box over an answer to quiz yourself. With the select tool, click a cover to see what it hides and again to hide it. The eye button shows or hides every answer at once. Covers stay out of downloads.",
  "Exam mode, the timer button, counts down a sample exam. Every answer cover stays hidden until time is up, then drawing stops and your answers are kept in this browser. A solution open beside the exam stays covered until then, and uncovers on the page you are on, scrolling with it.",
  "Clips keep part of any page in view while another file is on screen, like a formula sheet or a table. Draw a box with the clip tool (S), pick Clip on selected text, or Clip this page from a thumbnail's menu. Cards float over the pages: drag one by its title, resize it from its corner, double click to fold it into the row along the bottom, and click its picture to open the page beside. The clips button in the toolbar lists them and the ones closed recently. Clips stay out of downloads.",
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
  {
    items: [
      { keys: SHORTCUT_HINTS.quickOpen, label: "Open a file from the index" },
      { keys: SHORTCUT_HINTS.searchFiles, label: "Search every open file" },
      { keys: SHORTCUT_HINTS.toggleClips, label: "Hide or show clips" },
      { keys: SHORTCUT_HINTS.goToTab, label: "Go to a tab, 9 for the last" },
      { keys: SHORTCUT_HINTS.previousTab, label: "Previous tab" },
      { keys: SHORTCUT_HINTS.nextTab, label: "Next tab" },
      { keys: SHORTCUT_HINTS.moveTabLeft, label: "Move the tab left" },
      { keys: SHORTCUT_HINTS.moveTabRight, label: "Move the tab right" },
      { keys: SHORTCUT_HINTS.lastFile, label: "Back to the last file" },
      { keys: SHORTCUT_HINTS.closeTab, label: "Close the tab" },
      { keys: SHORTCUT_HINTS.reopenTab, label: "Reopen a closed tab" },
    ],
    title: "Tabs",
  },
  {
    items: [
      { keys: SHORTCUT_HINTS.split, label: "Split, or back to one pane" },
      { keys: SHORTCUT_HINTS.otherPane, label: "Focus the other pane" },
      { keys: SHORTCUT_HINTS.scrollLock, label: "Scroll both panes together" },
      {
        keys: SHORTCUT_HINTS.peekMatch,
        label: "Peek at the solution while held",
      },
    ],
    title: "Side by side",
  },
];
