import { useEffect } from "react";
import { REDO_HOTKEY_KEY, UNDO_HOTKEY_KEY } from "@/config/pdf-editor";
import { isEditableTarget } from "@/lib/is-editable-target";

interface EditorHotkeyOptions {
  onRedo: () => void;
  onUndo: () => void;
}

/** Cmd/Ctrl+Z steps back, Cmd/Ctrl+Shift+Z and Cmd/Ctrl+Y step forward again. */
export function useEditorHotkeys({ onRedo, onUndo }: EditorHotkeyOptions) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // A field being typed into owns its own undo stack.
      if (!(event.metaKey || event.ctrlKey) || isEditableTarget(event.target)) {
        return;
      }
      const key = event.key.toLowerCase();
      if (key !== UNDO_HOTKEY_KEY && key !== REDO_HOTKEY_KEY) {
        return;
      }
      event.preventDefault();
      if (key === REDO_HOTKEY_KEY || event.shiftKey) {
        onRedo();
        return;
      }
      onUndo();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onRedo, onUndo]);
}
