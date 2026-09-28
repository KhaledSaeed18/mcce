import { useCallback, useEffect, useState } from "react";
import { QUICK_OPEN_HOTKEY_KEY } from "@/config/pdf-editor";
import { isDialogTarget } from "@/lib/is-dialog-target";

/** Whether quick open is showing. Cmd/Ctrl+K opens it from anywhere but
 * another dialog, and closes it again. */
export function useQuickOpen() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isQuickOpenKey =
        (event.metaKey || event.ctrlKey) &&
        !event.altKey &&
        event.key.toLowerCase() === QUICK_OPEN_HOTKEY_KEY;
      if (!isQuickOpenKey || (!isOpen && isDialogTarget(event.target))) {
        return;
      }
      event.preventDefault();
      setIsOpen(!isOpen);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const open = useCallback(() => setIsOpen(true), []);

  return { isOpen, open, setIsOpen };
}
