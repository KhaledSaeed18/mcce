import {
  FILE_TEXT_DB_NAME,
  FILE_TEXT_DB_VERSION,
  FILE_TEXT_STORE,
  FILE_TEXT_USE_STORE,
} from "@/config/pdf-editor";
import { openDatabase } from "@/lib/indexed-db";

export const FILE_TEXT_STORES = [FILE_TEXT_STORE, FILE_TEXT_USE_STORE] as const;

/** One connection per call, as the local PDF store does, so a later version
 * of this database is never blocked from upgrading by one left open. */
export async function withTextStore<T>(
  work: (db: IDBDatabase) => Promise<T>
): Promise<T> {
  const db = await openDatabase(
    FILE_TEXT_DB_NAME,
    FILE_TEXT_DB_VERSION,
    FILE_TEXT_STORES
  );
  try {
    return await work(db);
  } finally {
    db.close();
  }
}
