/**
 * Lists of ids read as `badge=free,student` rather than a JSON array, so a
 * filtered URL stays legible when shared. Everything else keeps the default
 * JSON form, which round-trips through the default parser.
 */
export function stringifySearchValue(value: unknown): string {
  if (Array.isArray(value) && value.every((item) => typeof item === "string")) {
    return value.join(",");
  }
  return JSON.stringify(value);
}
