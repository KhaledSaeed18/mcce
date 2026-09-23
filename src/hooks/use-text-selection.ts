import { type RefObject, useEffect, useState } from "react";

export interface TextSelection {
  range: Range;
  /** Where the selection sits on screen, for placing the menu beside it. */
  rect: DOMRect;
  text: string;
}

function readSelection(root: HTMLElement): TextSelection | null {
  const selection = document.getSelection();
  if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
    return null;
  }
  const range = selection.getRangeAt(0);
  if (!root.contains(range.commonAncestorContainer)) {
    return null;
  }
  const text = selection.toString().trim();
  return text ? { range, rect: range.getBoundingClientRect(), text } : null;
}

/** The text picked on the pages, kept in step as the selection changes and as
 * the pages scroll under it. */
export function useTextSelection(
  scrollRef: RefObject<HTMLElement | null>,
  isEnabled: boolean
): TextSelection | null {
  const [current, setCurrent] = useState<TextSelection | null>(null);

  useEffect(() => {
    const root = scrollRef.current;
    if (!(root && isEnabled)) {
      setCurrent(null);
      return;
    }
    const update = () => setCurrent(readSelection(root));
    document.addEventListener("selectionchange", update);
    root.addEventListener("scroll", update, { passive: true });
    return () => {
      document.removeEventListener("selectionchange", update);
      root.removeEventListener("scroll", update);
    };
  }, [isEnabled, scrollRef]);

  return current;
}
