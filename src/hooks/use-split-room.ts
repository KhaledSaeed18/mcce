import { useEffect, useRef } from "react";
import type { EditorPaneView } from "@/hooks/use-editor-panes";
import type { EditorPanels, EditorPaneSide } from "@/lib/pdf-editor/types";

type LeftPanels = Pick<EditorPanels, "isBrowserOpen" | "isRailOpen">;

interface SplitRoomOptions {
  isBrowserOpen: boolean;
  isRailOpen: boolean;
  onPanelsChange: (changes: LeftPanels) => void;
  panes: EditorPaneView[];
}

/** Two pages need the width the left panels take. Opening a split closes
 * the file panel and page rail and fits each pane's pages to its width once
 * its file is ready; going back to one pane opens the panels that were open
 * before. */
export function useSplitRoom({
  isBrowserOpen,
  isRailOpen,
  onPanelsChange,
  panes,
}: SplitRoomOptions) {
  const isSplit = panes.length > 1;
  const wasSplitRef = useRef(isSplit);
  const savedRef = useRef<LeftPanels | null>(null);
  const fittedRef = useRef(new Set<EditorPaneSide>());

  useEffect(() => {
    if (isSplit === wasSplitRef.current) {
      return;
    }
    wasSplitRef.current = isSplit;
    if (isSplit) {
      savedRef.current = { isBrowserOpen, isRailOpen };
      onPanelsChange({ isBrowserOpen: false, isRailOpen: false });
      return;
    }
    fittedRef.current.clear();
    if (savedRef.current) {
      onPanelsChange(savedRef.current);
      savedRef.current = null;
    }
  }, [isBrowserOpen, isRailOpen, isSplit, onPanelsChange]);

  // Fitted once its pages are counted, which is when the view it was left
  // at is restored, so the fit comes after and wins. A file swapped into a
  // pane later keeps the view it was left at.
  useEffect(() => {
    if (!isSplit) {
      return;
    }
    for (const { session, side } of panes) {
      if (session.navigation.pageCount > 0 && !fittedRef.current.has(side)) {
        fittedRef.current.add(side);
        session.zoom.fitWidth();
      }
    }
  });
}
