export function readOptionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function toStringList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }
  return typeof value === "string" ? value.split(",") : [];
}

/**
 * A comma list from the URL, with anything outside the allowed set dropped.
 * The router re-validates its own output, so an already parsed array is
 * accepted as well as the raw string.
 */
export function readOptionalList<T extends string>(
  value: unknown,
  allowed: readonly T[]
): T[] | undefined {
  const raw = toStringList(value);
  const allowedSet = new Set<string>(allowed);
  const items = raw.filter((item): item is T => allowedSet.has(item));
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
