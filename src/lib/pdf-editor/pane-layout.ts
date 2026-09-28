import {
  buildSearchForId,
  readPrimaryId,
  readPrimarySearch,
} from "./editor-search";
import type { EditorPaneSide, EditorSearch } from "./types";

/** Closes one pane of a split; the other fills the view and keeps its file. */
export function closePane(
  search: EditorSearch,
  side: EditorPaneSide
): EditorSearch {
  if (!search.beside) {
    return side === "primary" ? {} : search;
  }
  return side === "beside"
    ? readPrimarySearch(search)
    : buildSearchForId(search.beside);
}

/** Closes whichever pane of a split shows the file, as closing its tab does. */
export function closePaneShowing(
  search: EditorSearch,
  id: string
): EditorSearch {
  if (id === search.beside) {
    return closePane(search, "beside");
  }
  return id === readPrimaryId(search) ? closePane(search, "primary") : search;
}

/** Trades the panes' files, so focus stays with the file that had it. */
export function swapPanes(search: EditorSearch): EditorSearch {
  const primary = readPrimarySearch(search);
  const primaryId = primary.file ?? primary.local;
  if (!(search.beside && primaryId)) {
    return search;
  }
  return {
    ...buildSearchForId(search.beside),
    beside: primaryId,
    ...(search.focus === "beside" ? {} : { focus: "beside" }),
  };
}

export function focusPane(
  search: EditorSearch,
  side: EditorPaneSide
): EditorSearch {
  if (!search.beside) {
    return search;
  }
  const primary = { ...readPrimarySearch(search), beside: search.beside };
  return side === "beside" ? { ...primary, focus: "beside" } : primary;
}
