import { useEffect } from "react";
import { isEditableTarget } from "@/lib/is-editable-target";
import { isPopupTarget } from "@/lib/is-popup-target";

/** Shift+S hides or shows every clip. Read by key position, as the letter
 * Shift types differs between layouts. */
export function useClipsHotkey(onToggle: () => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isToggleKey =
        event.shiftKey &&
        !(event.metaKey || event.ctrlKey || event.altKey) &&
        event.code === "KeyS";
      if (
        !isToggleKey ||
        isEditableTarget(event.target) ||
        isPopupTarget(event.target)
      ) {
        return;
      }
      event.preventDefault();
      onToggle();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onToggle]);
}
