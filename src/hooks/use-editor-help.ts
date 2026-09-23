import { useCallback, useEffect, useState } from "react";
import { HELP_HOTKEY_KEY } from "@/config/pdf-editor";
import { isEditableTarget } from "@/lib/is-editable-target";

/** Dialogs render at the end of the page, outside the full-screen editor, where
 * they could not be seen, so opening help leaves full screen first. */
function leaveFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => undefined);
  }
}

/** The help panel's open state, which the ? key toggles from anywhere in the editor. */
export function useEditorHelp() {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    leaveFullscreen();
    setIsOpen(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== HELP_HOTKEY_KEY || isEditableTarget(event.target)) {
        return;
      }
      event.preventDefault();
      leaveFullscreen();
      setIsOpen((current) => !current);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return { isOpen, open, setIsOpen };
}
