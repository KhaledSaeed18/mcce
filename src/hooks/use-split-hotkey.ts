import { useEffect } from "react";
import { SPLIT_HOTKEY_CODE } from "@/config/pdf-editor";
import { isDialogTarget } from "@/lib/is-dialog-target";
import { isEditableTarget } from "@/lib/is-editable-target";

/** Cmd/Ctrl+\ splits the view, or goes back to one pane. */
export function useSplitHotkey(onToggle: () => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isSplitKey =
        (event.metaKey || event.ctrlKey) &&
        !event.altKey &&
        event.code === SPLIT_HOTKEY_CODE;
      if (
        !isSplitKey ||
        isEditableTarget(event.target) ||
        isDialogTarget(event.target)
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
