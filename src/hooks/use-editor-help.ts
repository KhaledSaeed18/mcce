import { useCallback, useEffect, useState } from "react";
import { HELP_HOTKEY_KEY } from "@/config/pdf-editor";
import { isEditableTarget } from "@/lib/is-editable-target";

/** The help panel's open state, which the ? key toggles from anywhere in the editor. */
export function useEditorHelp() {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== HELP_HOTKEY_KEY || isEditableTarget(event.target)) {
        return;
      }
      event.preventDefault();
      setIsOpen((current) => !current);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return { isOpen, open, setIsOpen };
}
