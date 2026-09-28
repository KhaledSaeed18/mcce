import { useEffect } from "react";
import { PANE_FOCUS_HOTKEY_CODE } from "@/config/pdf-editor";
import { isDialogTarget } from "@/lib/is-dialog-target";
import { isEditableTarget } from "@/lib/is-editable-target";

/** The backquote key, on its own, moves focus to the other pane of a split.
 * Read by position, since the key types different marks on some layouts. */
export function usePaneFocusHotkey(onPress: () => void, isEnabled: boolean) {
  useEffect(() => {
    if (!isEnabled) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      const hasModifier = event.metaKey || event.ctrlKey || event.altKey;
      if (
        hasModifier ||
        event.code !== PANE_FOCUS_HOTKEY_CODE ||
        isEditableTarget(event.target) ||
        isDialogTarget(event.target)
      ) {
        return;
      }
      event.preventDefault();
      onPress();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isEnabled, onPress]);
}
