/** An IndexedDB request as a promise, which is all the callers here need of it. */
export function requestResult<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/** Settles once every write in the transaction is on disk, not just queued. */
export function transactionDone(transaction: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

/** Opens a database, creating any of the named stores it does not have yet. */
export function openDatabase(
  name: string,
  version: number,
  stores: readonly string[]
): Promise<IDBDatabase> {
  const request = indexedDB.open(name, version);
  request.onupgradeneeded = () => {
    for (const store of stores) {
      if (!request.result.objectStoreNames.contains(store)) {
        request.result.createObjectStore(store);
      }
    }
  };
  return requestResult(request);
}
