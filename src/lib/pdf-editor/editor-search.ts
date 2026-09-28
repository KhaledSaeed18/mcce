import { LOCAL_PDF_ID_PREFIX } from "@/config/pdf-editor";
import type { EditorSearch, OpenFile } from "./types";

/** The editor URL's search for a file, which names where its bytes live. */
export function buildEditorSearch(
  file: Pick<OpenFile, "id" | "source">
): EditorSearch {
  return file.source === "local" ? { local: file.id } : { file: file.id };
}

export function isLocalFileId(id: string): boolean {
  return id.startsWith(LOCAL_PDF_ID_PREFIX);
}

/** For an id alone, like the second pane's, which says where it lives. */
export function buildSearchForId(id: string): EditorSearch {
  return buildEditorSearch({
    id,
    source: isLocalFileId(id) ? "local" : "drive",
  });
}

export function readPrimaryId(search: EditorSearch): string | undefined {
  return search.file ?? search.local;
}

/** The first pane's part of the search, without the second pane's. */
export function readPrimarySearch(search: EditorSearch): EditorSearch {
  const id = readPrimaryId(search);
  return id ? buildSearchForId(id) : {};
}
