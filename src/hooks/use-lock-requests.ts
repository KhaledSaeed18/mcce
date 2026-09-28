import { useEffect, useState } from "react";
import type { EditorPaneView } from "@/hooks/use-editor-panes";
import type { MatchArrival } from "@/hooks/use-match-arrival";
import { measureScrollerGap } from "@/lib/pdf-editor/scroller-gap";
import type { PaneLock } from "@/lib/pdf-editor/types";

interface LockRequestOptions {
  arrival: MatchArrival | null;
  /** The files on screen, as a lock names them. */
  files: string;
  onArrived: () => void;
  onLock: (lock: PaneLock) => void;
  panes: EditorPaneView[];
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

/** Locks that wait for their files: a match opened beside its paper locks
 * once it reaches the page it was opened on, and a study set's lock comes
 * back once both its files have their pages. Returns the way to ask for
 * the second. */
export function useLockRequests({
  arrival,
  files,
  onArrived,
  onLock,
  panes,
}: LockRequestOptions) {
  const [pending, setPending] = useState<PaneLock | null>(null);
  const isSplit = panes.length > 1;

  const isArrived = arrival !== null && isSplit && hasArrived(panes, arrival);
  useEffect(() => {
    if (!isArrived) {
      return;
    }
    const [a, b] = panes.map((pane) => pane.session.scrollRef.current);
    const gap = measureScrollerGap(a, b);
    if (gap !== null) {
      onLock({ files, gap });
      onArrived();
    }
  }, [files, isArrived, onArrived, onLock, panes]);

  const isPendingReady =
    pending?.files === files &&
    panes.every((pane) => pane.session.navigation.pageCount > 0);
  useEffect(() => {
    if (isPendingReady && pending) {
      onLock(pending);
      setPending(null);
    }
  }, [isPendingReady, onLock, pending]);

  return setPending;
}
