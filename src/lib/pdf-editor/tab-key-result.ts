import { findSiblingFile } from "./desk-order";
import type { EditorDesk, OpenFile, TabKey, TabKeyResult } from "./types";

function shown(file: OpenFile | null | undefined): TabKeyResult | null {
  return file ? { file, type: "show" } : null;
}

/** Moving stops at either end rather than coming round, so the tab never
 * jumps across the strip. */
function findMove(
  desk: EditorDesk,
  activeId: string | undefined,
  step: number
): TabKeyResult | null {
  const from = desk.files.findIndex((file) => file.id === activeId);
  const to = from + step;
  if (from < 0 || to < 0 || to >= desk.files.length) {
    return null;
  }
  return { from, to, type: "move" };
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
    case "move":
      return findMove(desk, activeId, key.step);
    default:
      return shown(desk.closed[0]);
  }
}
