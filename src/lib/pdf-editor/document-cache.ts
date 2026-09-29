import { LOADED_DOCUMENT_LIMIT } from "@/config/pdf-editor";
import { type OpenedDocument, openDocument } from "./open-document";
import type { EditorFileRef } from "./types";

interface CachedDocument {
  lastUsed: number;
  opening: Promise<OpenedDocument>;
  users: number;
}

/** A hold on an opened file. The file stays loaded at least until it is released. */
export interface DocumentLease {
  opening: Promise<OpenedDocument>;
  release: () => void;
}

/** Opened files stay loaded after the reader moves on, so going back to one
 * does not fetch and parse it again. */
const documents = new Map<string, CachedDocument>();
let useCount = 0;

function close(entry: CachedDocument): void {
  entry.opening.then(
    ({ task }) => task.destroy(),
    () => undefined
  );
}

/** Only files nothing is showing are closed, the longest unused first. */
function closeUnused(): void {
  const excess = documents.size - LOADED_DOCUMENT_LIMIT;
  if (excess <= 0) {
    return;
  }
  const unused = [...documents]
    .filter(([, entry]) => entry.users === 0)
    .sort(([, a], [, b]) => a.lastUsed - b.lastUsed)
    .slice(0, excess);
  for (const [id, entry] of unused) {
    documents.delete(id);
    close(entry);
  }
}

function openEntry(file: EditorFileRef): CachedDocument {
  const entry: CachedDocument = {
    lastUsed: 0,
    opening: openDocument(file),
    users: 0,
  };
  documents.set(file.id, entry);
  // A file that failed to open is dropped, so trying again starts afresh.
  entry.opening.catch(() => {
    if (documents.get(file.id) === entry) {
      documents.delete(file.id);
    }
  });
  return entry;
}

/** Opens the file, or hands back the copy already open. */
export function acquireDocument(file: EditorFileRef): DocumentLease {
  const entry = documents.get(file.id) ?? openEntry(file);
  entry.users += 1;
  useCount += 1;
  entry.lastUsed = useCount;

  let isReleased = false;
  return {
    opening: entry.opening,
    release: () => {
      if (isReleased) {
        return;
      }
      isReleased = true;
      entry.users -= 1;
      // A file forgotten while in use closes once its last user lets go.
      if (documents.get(file.id) !== entry) {
        if (entry.users === 0) {
          close(entry);
        }
        return;
      }
      closeUnused();
    },
  };
}

export function hasLoadedDocument(fileId: string): boolean {
  return documents.has(fileId);
}

/** For a file taken off this device, which should not open again from memory. */
export function forgetDocument(fileId: string): void {
  const entry = documents.get(fileId);
  if (!entry) {
    return;
  }
  documents.delete(fileId);
  if (entry.users === 0) {
    close(entry);
  }
}
