import {
  FILE_TEXT_LIMIT,
  FILE_TEXT_STORE,
  FILE_TEXT_USE_STORE,
} from "@/config/pdf-editor";
import { requestResult, transactionDone } from "@/lib/indexed-db";
import { FILE_TEXT_STORES, withTextStore } from "./file-text-db";
import type { StoredFileText } from "./types";

/** The pages' text kept for this copy of the file, or null for a file never
 * read or since changed in the index. Reading it counts as a use. */
export function readFileText(
  id: string,
  version: string
): Promise<string[] | null> {
  return withTextStore(async (db) => {
    const transaction = db.transaction(FILE_TEXT_STORES, "readwrite");
    const stored = await requestResult<StoredFileText | undefined>(
      transaction.objectStore(FILE_TEXT_STORE).get(id)
    );
    if (stored?.version !== version) {
      return null;
    }
    transaction.objectStore(FILE_TEXT_USE_STORE).put(Date.now(), id);
    return stored.pages;
  });
}

/** Keeps the text, then lets go of the files searched longest ago. */
export function saveFileText(
  id: string,
  version: string,
  pages: string[]
): Promise<void> {
  return withTextStore(async (db) => {
    const transaction = db.transaction(FILE_TEXT_STORES, "readwrite");
    const texts = transaction.objectStore(FILE_TEXT_STORE);
    const uses = transaction.objectStore(FILE_TEXT_USE_STORE);
    texts.put({ pages, version } satisfies StoredFileText, id);
    uses.put(Date.now(), id);
    const [ids, times] = await Promise.all([
      requestResult(uses.getAllKeys()),
      requestResult<number[]>(uses.getAll()),
    ]);
    const oldest = ids
      .map((key, index) => ({ key, time: times[index] }))
      .sort((a, b) => b.time - a.time)
      .slice(FILE_TEXT_LIMIT);
    for (const { key } of oldest) {
      texts.delete(key);
      uses.delete(key);
    }
    return transactionDone(transaction);
  });
}

export function removeFileText(id: string): Promise<void> {
  return withTextStore((db) => {
    const transaction = db.transaction(FILE_TEXT_STORES, "readwrite");
    transaction.objectStore(FILE_TEXT_STORE).delete(id);
    transaction.objectStore(FILE_TEXT_USE_STORE).delete(id);
    return transactionDone(transaction);
  });
}
