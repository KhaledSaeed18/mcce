import type { OpenFile } from "./types";

type FileRef = Pick<OpenFile, "id" | "source">;

/** What a dragged tab carries: enough to open its file anywhere it lands. */
export function writeTabDragData(file: FileRef): string {
  return JSON.stringify({ id: file.id, source: file.source });
}

/** Anything else dropped with the tab's type, from another page say, is
 * turned away. */
export function readTabDragData(raw: string): FileRef | null {
  try {
    const value: unknown = JSON.parse(raw);
    if (typeof value !== "object" || value === null) {
      return null;
    }
    const { id, source } = value as Record<string, unknown>;
    const isFile =
      typeof id === "string" && (source === "drive" || source === "local");
    return isFile ? { id, source } : null;
  } catch {
    return null;
  }
}
