import { useCallback, useSyncExternalStore } from "react";
import {
  commitStep,
  EMPTY_HISTORY,
  redoStep,
  undoStep,
} from "@/lib/pdf-editor/history";
import {
  openHistory,
  readHistory,
  subscribeHistory,
  updateHistory,
} from "@/lib/pdf-editor/history-store";
import type { EditorSnapshot } from "@/lib/pdf-editor/types";

const readServerHistory = () => EMPTY_HISTORY;

/** The open file's undo steps. They belong to the file rather than to this
 * hook, so they are still there when the reader comes back to it. */
export function useEditorHistory(fileId: string | undefined) {
  const history = useSyncExternalStore(
    subscribeHistory,
    () => readHistory(fileId),
    readServerHistory
  );

  const commit = useCallback(
    (next: (current: EditorSnapshot) => EditorSnapshot) => {
      if (fileId) {
        updateHistory(fileId, (state) => commitStep(state, next));
      }
    },
    [fileId]
  );

  /** Starts the file from a stored snapshot, without a history entry. */
  const open = useCallback(
    (snapshot: EditorSnapshot) => {
      if (fileId) {
        openHistory(fileId, snapshot);
      }
    },
    [fileId]
  );

  const undo = useCallback(() => {
    if (fileId) {
      updateHistory(fileId, undoStep);
    }
  }, [fileId]);

  const redo = useCallback(() => {
    if (fileId) {
      updateHistory(fileId, redoStep);
    }
  }, [fileId]);

  return {
    canRedo: history.future.length > 0,
    canUndo: history.past.length > 0,
    commit,
    /** False until the file has been read from storage this visit. A file
     * not held reads as EMPTY_HISTORY itself, never a copy of it. */
    isOpen: history !== EMPTY_HISTORY,
    open,
    redo,
    snapshot: history.present,
    undo,
  };
}
