import { EDITOR_DESK_STORAGE_KEY } from "@/config/pdf-editor";
import { readJson, writeJson } from "@/lib/storage";
import { EMPTY_DESK } from "./desk";
import { isOpenFile } from "./open-file-parse";
import type { EditorDesk, OpenFile } from "./types";

function readFiles(value: unknown): OpenFile[] {
  return Array.isArray(value) ? value.filter(isOpenFile) : [];
}

/** Whatever was stored, hand-edited or half-written, comes back as a desk the
 * editor can trust, dropping what does not fit. */
export function parseDesk(value: unknown): EditorDesk {
  if (typeof value !== "object" || value === null) {
    return EMPTY_DESK;
  }
  const stored = value as Record<string, unknown>;
  const files = readFiles(stored.files);
  const ids = new Set(files.map((file) => file.id));
  const recent = Array.isArray(stored.recent)
    ? stored.recent.filter(
        (id): id is string => typeof id === "string" && ids.has(id)
      )
    : [];
  return { closed: readFiles(stored.closed), files, recent };
}

export function readDesk(): EditorDesk {
  return parseDesk(readJson<unknown>(EDITOR_DESK_STORAGE_KEY, null));
}

export function writeDesk(desk: EditorDesk): void {
  writeJson(EDITOR_DESK_STORAGE_KEY, desk);
}
