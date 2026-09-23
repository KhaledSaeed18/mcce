/** Parsing can fail on hand-edited or half-written values, and reading throws outright in some private modes. */
export function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

/** A full quota or a blocked store costs a local convenience, which is not
 * worth throwing over. The result says whether it was kept, for callers that
 * tell the user. */
export function writeJson(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
