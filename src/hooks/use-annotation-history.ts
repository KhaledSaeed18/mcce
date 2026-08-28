import { useCallback, useState } from "react";
import type { Annotation } from "@/lib/pdf-editor/types";

interface HistoryState {
  future: Annotation[][];
  past: Annotation[][];
  present: Annotation[];
}

const EMPTY: HistoryState = { future: [], past: [], present: [] };

/** Undo steps are whole snapshots: annotation lists are small, diffing them is not worth it. */
export function useAnnotationHistory() {
  const [history, setHistory] = useState<HistoryState>(EMPTY);

  const commit = useCallback(
    (next: (current: Annotation[]) => Annotation[]) =>
      setHistory((state) => ({
        future: [],
        past: [...state.past, state.present],
        present: next(state.present),
      })),
    []
  );

  /** Replaces the list without a history entry, for hydrating a stored file. */
  const reset = useCallback(
    (annotations: Annotation[]) =>
      setHistory({ future: [], past: [], present: annotations }),
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
    annotations: history.present,
    canRedo: history.future.length > 0,
    canUndo: history.past.length > 0,
    commit,
    redo,
    reset,
    undo,
  };
}
