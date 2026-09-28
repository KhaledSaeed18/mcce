import { useEffect } from "react";
import { isDialogTarget } from "@/lib/is-dialog-target";
import { isEditableTarget } from "@/lib/is-editable-target";

/** A single letter pressed on its own, anywhere but a field or a dialog. It
 * steps aside when a modifier is held, so it never shadows Cmd or Ctrl keys. */
export function useKeyHotkey(
  key: string,
  onPress: () => void,
  isEnabled = true
) {
  useEffect(() => {
    if (!isEnabled) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      const hasModifier = event.metaKey || event.ctrlKey || event.altKey;
      if (
        hasModifier ||
        event.key.toLowerCase() !== key ||
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
  }, [isEnabled, key, onPress]);
}
