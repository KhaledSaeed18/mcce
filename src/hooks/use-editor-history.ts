import { useCallback, useState } from "react";
import type { EditorSnapshot } from "@/lib/pdf-editor/types";

interface HistoryState {
  future: EditorSnapshot[];
  past: EditorSnapshot[];
  present: EditorSnapshot;
}

const EMPTY_SNAPSHOT: EditorSnapshot = { annotations: [], pages: [] };

const EMPTY: HistoryState = {
  future: [],
  past: [],
  present: EMPTY_SNAPSHOT,
};

/** Undo steps are whole snapshots: a file's markup and pages are small enough that
 * diffing them is not worth it. */
export function useEditorHistory() {
  const [history, setHistory] = useState<HistoryState>(EMPTY);

  const commit = useCallback(
    (next: (current: EditorSnapshot) => EditorSnapshot) =>
      setHistory((state) => ({
        future: [],
        past: [...state.past, state.present],
        present: next(state.present),
      })),
    []
  );

  /** Replaces the snapshot without a history entry, for hydrating a stored file. */
  const reset = useCallback(
    (snapshot: EditorSnapshot) =>
      setHistory({ future: [], past: [], present: snapshot }),
    []
  );

  const undo = useCallback(
    () =>
      setHistory((state) => {
        const previous = state.past.at(-1);
        if (!previous) {
          return state;
        }
        return {
          future: [state.present, ...state.future],
          past: state.past.slice(0, -1),
          present: previous,
        };
      }),
    []
  );

  const redo = useCallback(
    () =>
      setHistory((state) => {
        const [next, ...rest] = state.future;
        if (!next) {
          return state;
        }
        return {
          future: rest,
          past: [...state.past, state.present],
          present: next,
        };
      }),
    []
  );

  return {
    canRedo: history.future.length > 0,
    canUndo: history.past.length > 0,
    commit,
    redo,
    reset,
    snapshot: history.present,
    undo,
  };
}
