import { MAX_HISTORY_STEPS } from "@/config/pdf-editor";
import type { EditorHistory, EditorSnapshot } from "./types";

export const EMPTY_HISTORY: EditorHistory = {
  future: [],
  past: [],
  present: { annotations: [], pages: [] },
};

/** The oldest steps fall off the back once there are more than are worth keeping. */
function pushStep(
  past: EditorSnapshot[],
  present: EditorSnapshot
): EditorSnapshot[] {
  return [...past, present].slice(-MAX_HISTORY_STEPS);
}

/** A file as it was read, with nothing to take back yet. */
export function createHistory(present: EditorSnapshot): EditorHistory {
  return { future: [], past: [], present };
}

/** Undo steps are whole snapshots: a file's markup and pages are small enough
 * that diffing them is not worth it. An edit that changes nothing is not a step. */
export function commitStep(
  history: EditorHistory,
  next: (current: EditorSnapshot) => EditorSnapshot
): EditorHistory {
  const present = next(history.present);
  if (
    present.annotations === history.present.annotations &&
    present.pages === history.present.pages
  ) {
    return history;
  }
  return {
    future: [],
    past: pushStep(history.past, history.present),
    present,
  };
}

export function undoStep(history: EditorHistory): EditorHistory {
  const previous = history.past.at(-1);
  if (!previous) {
    return history;
  }
  return {
    future: [history.present, ...history.future],
    past: history.past.slice(0, -1),
    present: previous,
  };
}

export function redoStep(history: EditorHistory): EditorHistory {
  const [next, ...rest] = history.future;
  if (!next) {
    return history;
  }
  return {
    future: rest,
    past: pushStep(history.past, history.present),
    present: next,
  };
}
