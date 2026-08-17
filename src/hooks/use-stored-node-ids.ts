import { useCallback, useEffect, useState } from "react";
import { readJson, writeJson } from "@/lib/storage";

/**
 * A list of node ids in localStorage, most recent first. Null until the first
 * effect runs, which keeps the server and client's first render identical and
 * stops the empty initial state being written over real data.
 */
export function useStoredNodeIds(storageKey: string, limit?: number) {
  const [ids, setIds] = useState<string[] | null>(null);

  useEffect(() => setIds(readJson<string[]>(storageKey, [])), [storageKey]);

  useEffect(() => {
    if (ids === null) {
      return;
    }
    writeJson(storageKey, ids);
  }, [ids, storageKey]);

  const add = useCallback(
    (id: string) =>
      setIds((previous) => {
        const withoutId = (previous ?? []).filter((entry) => entry !== id);
        const next = [id, ...withoutId];
        return limit ? next.slice(0, limit) : next;
      }),
    [limit]
  );

  const remove = useCallback(
    (id: string) =>
      setIds((previous) => (previous ?? []).filter((entry) => entry !== id)),
    []
  );

  const clear = useCallback(() => setIds([]), []);

  return { add, clear, ids: ids ?? [], remove };
}
