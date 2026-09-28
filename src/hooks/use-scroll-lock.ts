import { useCallback, useEffect, useState } from "react";
import { SCROLL_LOCK_HOTKEY_KEY } from "@/config/pdf-editor";
import type { EditorPaneView } from "@/hooks/use-editor-panes";
import { useKeyHotkey } from "@/hooks/use-key-hotkey";
import type { MatchArrival } from "@/hooks/use-match-arrival";
import { linkScrollers } from "@/lib/pdf-editor/link-scrollers";
import { toPagePosition } from "@/lib/pdf-editor/page-position";
import { readScrollAnchor } from "@/lib/pdf-editor/scroll-anchor";

interface StoredLock {
  /** The files it was made on; either changing lets it go. */
  files: string;
  gap: number;
}

function measureGap(panes: EditorPaneView[]): number | null {
  const [a, b] = panes.map((pane) => pane.session.scrollRef.current);
  const anchorA = a ? readScrollAnchor(a) : null;
  const anchorB = b ? readScrollAnchor(b) : null;
  return anchorA && anchorB
    ? toPagePosition(anchorB) - toPagePosition(anchorA)
    : null;
}

/** Whether a file asked to arrive on a page has got there, which is when a
 * lock made on it keeps the two panes where they should be. */
function hasArrived(panes: EditorPaneView[], arrival: MatchArrival): boolean {
  const pane = panes.find((item) => item.node?.id === arrival.fileId);
  const navigation = pane?.session.navigation;
  return (
    navigation !== undefined &&
    navigation.pageCount > 0 &&
    navigation.activeIndex === Math.min(arrival.page, navigation.pageCount - 1)
  );
}

/** Scrolls the two panes of a split together, keeping the distance in pages
 * they were apart when it was turned on: an exam on page 3 and its solution
 * on page 5 stay two pages apart, and at the same spot on the page. Zoom is
 * left to each pane. L turns it on and off, and a file opened beside its
 * match turns it on once it reaches the page it was opened on. */
export function useScrollLock(
  panes: EditorPaneView[],
  arrival: MatchArrival | null,
  onArrived: () => void
) {
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
    const measured = measureGap(panes);
    if (measured !== null) {
      setLock({ files, gap: measured });
    }
  }, [files, gap, panes]);

  useKeyHotkey(SCROLL_LOCK_HOTKEY_KEY, toggle, second !== undefined);

  const isArrived =
    arrival !== null && second !== undefined && hasArrived(panes, arrival);
  useEffect(() => {
    if (!isArrived) {
      return;
    }
    const measured = measureGap(panes);
    if (measured !== null) {
      setLock({ files, gap: measured });
      onArrived();
    }
  }, [files, isArrived, onArrived, panes]);

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

export type ScrollLock = ReturnType<typeof useScrollLock>;
