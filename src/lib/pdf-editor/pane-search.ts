import {
  buildEditorSearch,
  readPrimaryId,
  readPrimarySearch,
} from "./editor-search";
import { focusPane, swapPanes } from "./pane-layout";
import type { EditorPaneSide, EditorSearch, OpenFile } from "./types";

type FileRef = Pick<OpenFile, "id" | "source">;

/** Where a file opened from a tab, the file panel, or a link lands: in the
 * pane with focus. A file already on screen does not open twice; its pane
 * takes focus instead. */
export function placeFile(search: EditorSearch, file: FileRef): EditorSearch {
  const { beside } = search;
  if (!beside) {
    return buildEditorSearch(file);
  }
  const primary = readPrimarySearch(search);
  if (file.id === readPrimaryId(search)) {
    return { ...primary, beside };
  }
  if (file.id === beside || search.focus === "beside") {
    return { ...primary, beside: file.id, focus: "beside" };
  }
  return { ...buildEditorSearch(file), beside };
}

/** Opens a file in the pane without focus, splitting the view if it is not
 * split yet, and gives that pane focus. */
export function openInOtherPane(
  search: EditorSearch,
  file: FileRef
): EditorSearch {
  const primaryId = readPrimaryId(search);
  if (!primaryId) {
    return buildEditorSearch(file);
  }
  if (file.id === primaryId || file.id === search.beside) {
    return search;
  }
  if (search.beside && search.focus === "beside") {
    return { ...buildEditorSearch(file), beside: search.beside };
  }
  return { ...readPrimarySearch(search), beside: file.id, focus: "beside" };
}

/** Puts a file on one side, as dropping its tab on that half of the pages
 * does, and focuses it. A file already on the other side trades places with
 * the file there. */
export function placeFileOnSide(
  search: EditorSearch,
  file: FileRef,
  side: EditorPaneSide
): EditorSearch {
  const primaryId = readPrimaryId(search);
  const isOnOtherSide =
    side === "primary" ? file.id === search.beside : file.id === primaryId;
  if (isOnOtherSide && search.beside) {
    return focusPane(swapPanes(search), side);
  }
  if (side === "primary" || !primaryId) {
    return search.beside && file.id !== search.beside
      ? { ...buildEditorSearch(file), beside: search.beside }
      : buildEditorSearch(file);
  }
  return { ...readPrimarySearch(search), beside: file.id, focus: "beside" };
}
