import type { EditorDesk, OpenFile } from "./types";

export function moveFile(
  desk: EditorDesk,
  from: number,
  to: number
): EditorDesk {
  const file = desk.files[from];
  if (!file || from === to || to < 0 || to >= desk.files.length) {
    return desk;
  }
  const rest = desk.files.filter((_, index) => index !== from);
  return {
    ...desk,
    files: [...rest.slice(0, to), file, ...rest.slice(to)],
  };
}

/** The tab to show once `id` closes: the one seen most recently before it,
 * which is usually the file the reader came from. */
export function findNextFile(desk: EditorDesk, id: string): OpenFile | null {
  const nextId = desk.recent.find((item) => item !== id);
  const others = desk.files.filter((item) => item.id !== id);
  return others.find((item) => item.id === nextId) ?? others[0] ?? null;
}

/** The tab `step` places along from `id`, coming round at either end. */
export function findSiblingFile(
  desk: EditorDesk,
  id: string | undefined,
  step: number
): OpenFile | null {
  const count = desk.files.length;
  if (count === 0) {
    return null;
  }
  const index = desk.files.findIndex((item) => item.id === id);
  const from = index < 0 ? 0 : index;
  return desk.files[(from + step + count) % count];
}
