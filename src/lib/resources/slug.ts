const RESOURCE_ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Ids name icon files and appear in URLs, so they are kebab-case ASCII only. */
export function isValidResourceId(id: string): boolean {
  return RESOURCE_ID_PATTERN.test(id);
}

export function toResourceId(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
