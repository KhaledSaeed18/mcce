import { CLOSED_TAB_LIMIT } from "@/config/pdf-editor";
import type { EditorDesk } from "./types";

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

/** For a file that is gone, like one taken off this device: its tab closes
 * and it is not offered for reopening. */
export function forgetFile(desk: EditorDesk, id: string): EditorDesk {
  const closed = closeFile(desk, id);
  return {
    ...closed,
    closed: closed.closed.filter((item) => item.id !== id),
  };
}
