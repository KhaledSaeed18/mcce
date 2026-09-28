import { useCallback, useEffect, useState } from "react";
import { SCROLL_LOCK_HOTKEY_KEY } from "@/config/pdf-editor";
import type { EditorPaneView } from "@/hooks/use-editor-panes";
import { useKeyHotkey } from "@/hooks/use-key-hotkey";
import { linkScrollers } from "@/lib/pdf-editor/link-scrollers";
import { toPagePosition } from "@/lib/pdf-editor/page-position";
import { readScrollAnchor } from "@/lib/pdf-editor/scroll-anchor";

interface StoredLock {
  /** The files it was made on; either changing lets it go. */
  files: string;
  gap: number;
}

/** Scrolls the two panes of a split together, keeping the distance in pages
 * they were apart when it was turned on: an exam on page 3 and its solution
 * on page 5 stay two pages apart, and at the same spot on the page. Zoom is
 * left to each pane. L turns it on and off. */
export function useScrollLock(panes: EditorPaneView[]) {
  const [lock, setLock] = useState<StoredLock | null>(null);
  const [first, second] = panes;
  const files = panes.map((pane) => pane.node?.id ?? "").join("|");
  const gap = second && lock?.files === files ? lock.gap : null;
  const firstScroller = first.session.scrollRef;
  const secondScroller = second?.session.scrollRef;

  const toggle = useCallback(() => {
    if (gap !== null) {
      setLock(null);
      return;
    }
    const a = firstScroller.current;
    const b = secondScroller?.current;
    const anchorA = a ? readScrollAnchor(a) : null;
    const anchorB = b ? readScrollAnchor(b) : null;
    if (anchorA && anchorB) {
      setLock({
        files,
        gap: toPagePosition(anchorB) - toPagePosition(anchorA),
      });
    }
  }, [files, firstScroller, gap, secondScroller]);

  useKeyHotkey(SCROLL_LOCK_HOTKEY_KEY, toggle, second !== undefined);

  useEffect(() => {
    const a = firstScroller.current;
    const b = secondScroller?.current;
    if (gap === null || !(a && b)) {
      return;
    }
    return linkScrollers(a, b, gap);
  }, [firstScroller, gap, secondScroller]);

  return { gap, toggle };
}
