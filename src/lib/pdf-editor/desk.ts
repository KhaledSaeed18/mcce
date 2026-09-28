import { CLOSED_TAB_LIMIT, EDITOR_TAB_LIMIT } from "@/config/pdf-editor";
import type { EditorDesk, OpenFile } from "./types";

export const EMPTY_DESK: EditorDesk = { closed: [], files: [], recent: [] };

function insertAt<T>(items: T[], index: number, item: T): T[] {
  return [...items.slice(0, index), item, ...items.slice(index)];
}

/** Past the limit, the tab gone longest unseen closes. The file just shown
 * is first in the recent list, so it is never the one. */
function closeOverflow(desk: EditorDesk): EditorDesk {
  if (desk.files.length <= EDITOR_TAB_LIMIT) {
    return desk;
  }
  const rank = (file: OpenFile) => {
    const index = desk.recent.indexOf(file.id);
    return index < 0 ? Number.POSITIVE_INFINITY : index;
  };
  const stalest = desk.files.reduce((a, b) => (rank(b) > rank(a) ? b : a));
  return closeOverflow(closeFile(desk, stalest.id));
}

/** Brings a file to the front. A file not open yet gets a tab right after the
 * one shown before it, so files opened together sit together. */
export function showFile(desk: EditorDesk, file: OpenFile): EditorDesk {
  const index = desk.files.findIndex((item) => item.id === file.id);
  const current = desk.files[index];
  const isRenamed = file.name !== "" && current?.name !== file.name;
  if (current && desk.recent[0] === file.id && !isRenamed) {
    return desk;
  }
  const recent = [file.id, ...desk.recent.filter((id) => id !== file.id)];
  const closed = desk.closed.filter((item) => item.id !== file.id);
  if (current) {
    const files = isRenamed
      ? desk.files.map((item) => (item.id === file.id ? file : item))
      : desk.files;
    return { closed, files, recent };
  }
  const after = desk.files.findIndex((item) => item.id === desk.recent[0]);
  const files = insertAt(desk.files, after + 1, file);
  return closeOverflow({ closed, files, recent });
}

export function closeFile(desk: EditorDesk, id: string): EditorDesk {
  const file = desk.files.find((item) => item.id === id);
  if (!file) {
    return desk;
  }
  return {
    closed: [file, ...desk.closed].slice(0, CLOSED_TAB_LIMIT),
    files: desk.files.filter((item) => item.id !== id),
    recent: desk.recent.filter((item) => item !== id),
  };
}
