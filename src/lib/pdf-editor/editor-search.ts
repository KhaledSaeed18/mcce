import type { EditorSearch, OpenFile } from "./types";

/** The editor URL's search for a file, which names where its bytes live. */
export function buildEditorSearch(
  file: Pick<OpenFile, "id" | "source">
): EditorSearch {
  return file.source === "local" ? { local: file.id } : { file: file.id };
}
