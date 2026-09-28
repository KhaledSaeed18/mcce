import { useCallback } from "react";
import { placeFile } from "@/lib/pdf-editor/pane-search";
import type { EditorSearch, OpenFile } from "@/lib/pdf-editor/types";

/** A link's search for opening a file where the editor puts it, kept stable
 * while the file stays the same. */
export function usePlaceFileSearch(id: string, source: OpenFile["source"]) {
  return useCallback(
    (search: EditorSearch) => placeFile(search, { id, source }),
    [id, source]
  );
}
