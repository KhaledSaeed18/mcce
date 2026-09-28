import {
  CLIP_DB_NAME,
  CLIP_DB_VERSION,
  CLIP_PICTURE_STORE,
} from "@/config/pdf-editor";
import { openDatabase, requestResult, transactionDone } from "@/lib/indexed-db";

const STORES = [CLIP_PICTURE_STORE] as const;

/** One connection per call, as the other stores here do, so a later version
 * is never blocked from upgrading by one left open. */
async function withStore<T>(work: (db: IDBDatabase) => Promise<T>): Promise<T> {
  const db = await openDatabase(CLIP_DB_NAME, CLIP_DB_VERSION, STORES);
  try {
    return await work(db);
  } finally {
    db.close();
  }
}

export function saveClipPicture(id: string, picture: Blob): Promise<void> {
  return withStore((db) => {
    const transaction = db.transaction(STORES, "readwrite");
    transaction.objectStore(CLIP_PICTURE_STORE).put(picture, id);
    return transactionDone(transaction);
  });
}

export function readClipPicture(id: string): Promise<Blob | null> {
  return withStore(async (db) => {
    const store = db.transaction(STORES).objectStore(CLIP_PICTURE_STORE);
    const picture = await requestResult<Blob | undefined>(store.get(id));
    return picture ?? null;
  });
}

export function removeClipPictures(ids: readonly string[]): Promise<void> {
  return withStore((db) => {
    const transaction = db.transaction(STORES, "readwrite");
    for (const id of ids) {
      transaction.objectStore(CLIP_PICTURE_STORE).delete(id);
    }
    return transactionDone(transaction);
  });
}
