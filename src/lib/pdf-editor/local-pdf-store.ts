import {
  LOCAL_PDF_BYTES_STORE,
  LOCAL_PDF_DB_NAME,
  LOCAL_PDF_DB_VERSION,
  LOCAL_PDF_META_STORE,
} from "@/config/pdf-editor";
import { openDatabase, requestResult, transactionDone } from "@/lib/indexed-db";
import type { LocalPdfMeta } from "./types";

const STORES = [LOCAL_PDF_META_STORE, LOCAL_PDF_BYTES_STORE] as const;

/** Every call opens and closes its own connection. One left open blocks a
 * later version of this database from upgrading, and deleting it, until the
 * tab is closed. */
async function withStore<T>(work: (db: IDBDatabase) => Promise<T>): Promise<T> {
  const db = await openDatabase(
    LOCAL_PDF_DB_NAME,
    LOCAL_PDF_DB_VERSION,
    STORES
  );
  try {
    return await work(db);
  } finally {
    db.close();
  }
}

export function saveLocalPdf(
  meta: LocalPdfMeta,
  bytes: ArrayBuffer
): Promise<void> {
  return withStore((db) => {
    const transaction = db.transaction(STORES, "readwrite");
    transaction.objectStore(LOCAL_PDF_META_STORE).put(meta, meta.id);
    transaction.objectStore(LOCAL_PDF_BYTES_STORE).put(bytes, meta.id);
    return transactionDone(transaction);
  });
}

export function readLocalPdfMeta(id: string): Promise<LocalPdfMeta | null> {
  return withStore(async (db) => {
    const store = db
      .transaction(LOCAL_PDF_META_STORE)
      .objectStore(LOCAL_PDF_META_STORE);
    const meta = await requestResult<LocalPdfMeta | undefined>(store.get(id));
    return meta ?? null;
  });
}

export function readLocalPdfBytes(id: string): Promise<ArrayBuffer | null> {
  return withStore(async (db) => {
    const store = db
      .transaction(LOCAL_PDF_BYTES_STORE)
      .objectStore(LOCAL_PDF_BYTES_STORE);
    const bytes = await requestResult<ArrayBuffer | undefined>(store.get(id));
    return bytes ?? null;
  });
}

/** Newest first, which is the order the reader is most likely to want them in. */
export function listLocalPdfs(): Promise<LocalPdfMeta[]> {
  return withStore(async (db) => {
    const store = db
      .transaction(LOCAL_PDF_META_STORE)
      .objectStore(LOCAL_PDF_META_STORE);
    const all = await requestResult<LocalPdfMeta[]>(store.getAll());
    return all.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
  });
}

export function removeLocalPdf(id: string): Promise<void> {
  return withStore((db) => {
    const transaction = db.transaction(STORES, "readwrite");
    transaction.objectStore(LOCAL_PDF_META_STORE).delete(id);
    transaction.objectStore(LOCAL_PDF_BYTES_STORE).delete(id);
    return transactionDone(transaction);
  });
}
