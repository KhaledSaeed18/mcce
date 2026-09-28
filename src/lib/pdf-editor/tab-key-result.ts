import { findSiblingFile } from "./desk-order";
import type { EditorDesk, OpenFile, TabKey, TabKeyResult } from "./types";

function shown(file: OpenFile | null | undefined): TabKeyResult | null {
  return file ? { file, type: "show" } : null;
}

/** What a tab key does with the tabs open now, or nothing when there is
 * nowhere for it to go. */
export function resolveTabKey(
  desk: EditorDesk,
  activeId: string | undefined,
  key: TabKey
): TabKeyResult | null {
  switch (key.type) {
    case "go":
      return shown(
        key.index === "last" ? desk.files.at(-1) : desk.files[key.index]
      );
    case "step":
      return shown(findSiblingFile(desk, activeId, key.step));
    case "back": {
      const id = desk.recent.find((item) => item !== activeId);
      return shown(desk.files.find((file) => file.id === id));
    }
    case "close":
      return activeId ? { id: activeId, type: "close" } : null;
    default:
      return shown(desk.closed[0]);
  }
}
