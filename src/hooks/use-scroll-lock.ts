import { useCallback, useEffect, useState } from "react";
import { SCROLL_LOCK_HOTKEY_KEY } from "@/config/pdf-editor";
import type { EditorPaneView } from "@/hooks/use-editor-panes";
import { useKeyHotkey } from "@/hooks/use-key-hotkey";
import { useLockRequests } from "@/hooks/use-lock-requests";
import type { MatchArrival } from "@/hooks/use-match-arrival";
import { linkScrollers } from "@/lib/pdf-editor/link-scrollers";
import {
  alignScroller,
  measureScrollerGap,
} from "@/lib/pdf-editor/scroller-gap";
import type { EditorPaneSide, PaneLock } from "@/lib/pdf-editor/types";

/** Scrolls the two panes of a split together, keeping the distance in pages
 * they were apart when it was turned on: an exam on page 3 and its solution
 * on page 5 stay two pages apart, and at the same spot on the page. Zoom is
 * left to each pane. L turns it on and off, and it also turns on for a
 * match opened beside its paper and for a study set saved with it. */
export function useScrollLock(
  panes: EditorPaneView[],
  arrival: MatchArrival | null,
  onArrived: () => void
) {
  const [lock, setLock] = useState<PaneLock | null>(null);
  const [first, second] = panes;
  const files = panes.map((pane) => pane.node?.id ?? "").join("|");
  const gap = second && lock?.files === files ? lock.gap : null;
  const firstScroller = first.session.scrollRef;
  const secondScroller = second?.session.scrollRef;
  const restore = useLockRequests({
    arrival,
    files,
    onArrived,
    onLock: setLock,
    panes,
  });

  const toggle = useCallback(() => {
    if (gap !== null) {
      setLock(null);
      return;
    }
    const measured = measureScrollerGap(
      firstScroller.current,
      secondScroller?.current ?? null
    );
    if (measured !== null) {
      setLock({ files, gap: measured });
    }
  }, [files, firstScroller, gap, secondScroller]);

  useKeyHotkey(SCROLL_LOCK_HOTKEY_KEY, toggle, second !== undefined);

  /** Brings the other pane to the spot one pane is at, then locks the two
   * there, as the end of an exam does for its solution. */
  const alignAndLock = useCallback(
    (from: EditorPaneSide) => {
      const source = panes.find((pane) => pane.side === from);
      const target = panes.find((pane) => pane.side !== from);
      const isAligned = alignScroller(
        source?.session.scrollRef.current ?? null,
        target?.session.scrollRef.current ?? null
      );
      if (isAligned) {
        setLock({ files, gap: 0 });
      }
    },
    [files, panes]
  );

  useEffect(() => {
    const a = firstScroller.current;
    const b = secondScroller?.current;
    if (gap === null || !(a && b)) {
      return;
    }
    return linkScrollers(a, b, gap);
  }, [firstScroller, gap, secondScroller]);

  return { alignAndLock, gap, restore, toggle };
}

export type ScrollLock = ReturnType<typeof useScrollLock>;
