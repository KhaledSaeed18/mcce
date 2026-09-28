import type { EditorPage } from "../types";
import type { FileSearchHit } from "./types";

interface FileHits {
  count: number;
  hits: FileSearchHit[];
}

/** Every match of the query in a file, counted as the pane's own search
 * counts them: page by page as the pages sit now, a sheet the reader put in
 * having no text. Only the first `limit` are listed. */
export function findFileHits(
  lowered: readonly string[],
  layout: readonly EditorPage[],
  query: string,
  limit: number
): FileHits {
  const needle = query.trim().toLowerCase();
  const hits: FileSearchHit[] = [];
  let count = 0;
  if (!needle) {
    return { count, hits };
  }
  for (const [position, page] of layout.entries()) {
    const text = page.sheet ? undefined : lowered[page.sourceIndex];
    let offset = text?.indexOf(needle) ?? -1;
    while (text !== undefined && offset !== -1) {
      if (hits.length < limit) {
        hits.push({
          matchIndex: count,
          offset,
          position,
          sourceIndex: page.sourceIndex,
        });
      }
      count += 1;
      offset = text.indexOf(needle, offset + needle.length);
    }
  }
  return { count, hits };
}
