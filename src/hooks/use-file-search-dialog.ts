import { useCallback, useEffect, useState } from "react";
import { SEARCH_HOTKEY_KEY } from "@/config/pdf-editor";
import { isDialogTarget } from "@/lib/is-dialog-target";
import { readSelectedWords } from "@/lib/pdf-editor/file-search/selected-words";

/** Whether search across files is showing, and its query. Cmd/Ctrl+Shift+F
 * opens it with the words selected on the page, or the last search, and
 * closes it again. */
export function useFileSearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const open = useCallback(() => {
    const words = readSelectedWords();
    if (words) {
      setQuery(words);
    }
    setIsOpen(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isSearchKey =
        (event.metaKey || event.ctrlKey) &&
        event.shiftKey &&
        !event.altKey &&
        event.key.toLowerCase() === SEARCH_HOTKEY_KEY;
      if (!isSearchKey || (!isOpen && isDialogTarget(event.target))) {
        return;
      }
      event.preventDefault();
      if (isOpen) {
        setIsOpen(false);
      } else {
        open();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, open]);

  const close = useCallback(() => setIsOpen(false), []);

  return { close, isOpen, query, setIsOpen, setQuery };
}
