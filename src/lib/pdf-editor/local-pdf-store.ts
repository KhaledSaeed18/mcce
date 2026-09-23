import {
  LOCAL_PDF_BYTES_STORE,
  LOCAL_PDF_DB_NAME,
  LOCAL_PDF_DB_VERSION,
  LOCAL_PDF_META_STORE,
} from "@/config/pdf-editor";
import { openDatabase, requestResult, transactionDone } from "@/lib/indexed-db";
import type { LocalPdfMeta } from "./types";

const STORES = [LOCAL_PDF_META_STORE, LOCAL_PDF_BYTES_STORE] as const;

function openStore(): Promise<IDBDatabase> {
  return openDatabase(LOCAL_PDF_DB_NAME, LOCAL_PDF_DB_VERSION, STORES);
}

export async function saveLocalPdf(
  meta: LocalPdfMeta,
  bytes: ArrayBuffer
): Promise<void> {
  const db = await openStore();
  const transaction = db.transaction(STORES, "readwrite");
  transaction.objectStore(LOCAL_PDF_META_STORE).put(meta, meta.id);
  transaction.objectStore(LOCAL_PDF_BYTES_STORE).put(bytes, meta.id);
  await transactionDone(transaction);
}

export async function readLocalPdfMeta(
  id: string
): Promise<LocalPdfMeta | null> {
  const db = await openStore();
  const store = db
    .transaction(LOCAL_PDF_META_STORE)
    .objectStore(LOCAL_PDF_META_STORE);
  return (await requestResult<LocalPdfMeta | undefined>(store.get(id))) ?? null;
}

export async function readLocalPdfBytes(
  id: string
): Promise<ArrayBuffer | null> {
  const db = await openStore();
  const store = db
    .transaction(LOCAL_PDF_BYTES_STORE)
    .objectStore(LOCAL_PDF_BYTES_STORE);
  return (await requestResult<ArrayBuffer | undefined>(store.get(id))) ?? null;
}
