export function readOptionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

/** A comma list from the URL, with anything outside the allowed set dropped. */
export function readOptionalList<T extends string>(
  value: unknown,
  allowed: readonly T[]
): T[] | undefined {
  if (typeof value !== "string" || value.length === 0) {
    return;
  }
  const allowedSet = new Set<string>(allowed);
  const items = value
    .split(",")
    .filter((item): item is T => allowedSet.has(item));
  return items.length > 0 ? [...new Set(items)] : undefined;
}

/** An indexable page must not redirect to "?q=", so an empty query is omitted. */
export function readOptionalQuery(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0
    ? value
    : undefined;
}

/** Keeps a value only when it is one of the allowed ids. */
export function readOptionalOneOf<T extends string>(
  value: unknown,
  allowed: readonly T[]
): T | undefined {
  return typeof value === "string" &&
    (allowed as readonly string[]).includes(value)
    ? (value as T)
    : undefined;
}
