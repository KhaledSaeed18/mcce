/** Parsing can fail on hand-edited or half-written values, and reading throws outright in some private modes. */
export function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

/** A full quota or a blocked store costs a local convenience, which is not worth throwing over. */
export function writeJson(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Deliberately silent: see above.
  }
}
