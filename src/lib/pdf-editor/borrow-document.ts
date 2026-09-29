import {
  acquireDocument,
  type DocumentLease,
  hasLoadedDocument,
} from "./document-cache";
import { openDocument } from "./open-document";
import type { EditorFileRef } from "./types";

/** A hold on a file for a moment's reading. A file already loaded is shared;
 * any other opens outside the cache and closes on release, so reading it
 * never pushes out a file the reader had open. */
export function borrowDocument(file: EditorFileRef): DocumentLease {
  if (hasLoadedDocument(file.id)) {
    return acquireDocument(file);
  }
  const opening = openDocument(file);
  let isReleased = false;
  return {
    opening,
    release: () => {
      if (isReleased) {
        return;
      }
      isReleased = true;
      opening.then(
        ({ task }) => task.destroy(),
        () => undefined
      );
    },
  };
}
