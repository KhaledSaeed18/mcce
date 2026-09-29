import type { OpenFile } from "./types";

/** Whether something read back from storage or a link is an open file. */
export function isOpenFile(value: unknown): value is OpenFile {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const { id, name, source } = value as Record<string, unknown>;
  return (
    typeof id === "string" &&
    typeof name === "string" &&
    (source === "drive" || source === "local")
  );
}
