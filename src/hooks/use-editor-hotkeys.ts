import { useEffect } from "react";
import {
  DELETE_HOTKEY_KEYS,
  DESELECT_HOTKEY_KEY,
  REDO_HOTKEY_KEY,
  UNDO_HOTKEY_KEY,
} from "@/config/pdf-editor";
import { isEditableTarget } from "@/lib/is-editable-target";

interface EditorHotkeyOptions {
  onDeselect: () => void;
  onRedo: () => void;
  onRemove: () => void;
  onUndo: () => void;
}

type HistoryAction = "redo" | "undo";
type SelectionAction = "deselect" | "remove";

/** Which way through the history the event asks to go, if either. */
function readHistoryAction(event: KeyboardEvent): HistoryAction | null {
  if (!(event.metaKey || event.ctrlKey)) {
    return null;
  }
  const key = event.key.toLowerCase();
  if (key === REDO_HOTKEY_KEY) {
    return "redo";
  }
  if (key !== UNDO_HOTKEY_KEY) {
    return null;
  }
  return event.shiftKey ? "redo" : "undo";
}

/** What a bare key asks of the selection, if anything. */
function readSelectionAction(event: KeyboardEvent): SelectionAction | null {
  if (event.metaKey || event.ctrlKey || event.altKey) {
    return null;
  }
  if (DELETE_HOTKEY_KEYS.includes(event.key)) {
    return "remove";
  }
  return event.key === DESELECT_HOTKEY_KEY ? "deselect" : null;
}

/**
 * Cmd/Ctrl+Z steps back and Cmd/Ctrl+Shift+Z or Cmd/Ctrl+Y steps forward;
 * Delete takes the selected text off the page and Escape lets go of it.
 */
export function useEditorHotkeys({
  onDeselect,
  onRedo,
  onRemove,
  onUndo,
}: EditorHotkeyOptions) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // A field being typed into owns its own keys, undo stack included.
      if (isEditableTarget(event.target)) {
        return;
      }

      const history = readHistoryAction(event);
      if (history) {
        event.preventDefault();
        (history === "redo" ? onRedo : onUndo)();
        return;
      }

      const selection = readSelectionAction(event);
      if (selection === "remove") {
        event.preventDefault();
        onRemove();
        return;
      }
      if (selection === "deselect") {
        onDeselect();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onDeselect, onRedo, onRemove, onUndo]);
}
