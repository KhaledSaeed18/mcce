import { useEffect } from "react";
import { SEARCH_HOTKEY_KEY } from "@/config/pdf-editor";
import { isPopupTarget } from "@/lib/is-popup-target";

/** Cmd/Ctrl+F opens the file's own search instead of the browser's, which
 * cannot see text drawn on a canvas. It works from inside the search field
 * too, where it selects the query for replacing. */
export function useSearchHotkey(onOpen: () => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isSearchKey =
        (event.metaKey || event.ctrlKey) &&
        !event.altKey &&
        !event.shiftKey &&
        event.key.toLowerCase() === SEARCH_HOTKEY_KEY;
      if (!isSearchKey || isPopupTarget(event.target)) {
        return;
      }
      event.preventDefault();
      onOpen();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onOpen]);
}
