import { useEffect, useRef } from "react";
import { SPLIT_SAVED_PANELS_KEY } from "@/config/pdf-editor";
import type { EditorPaneView } from "@/hooks/use-editor-panes";
import type { EditorPanels, EditorPaneSide } from "@/lib/pdf-editor/types";
import { readJson, removeStored, writeJson } from "@/lib/storage";

type LeftPanels = Pick<EditorPanels, "isBrowserOpen" | "isRailOpen">;

interface SplitRoomOptions {
  isBrowserOpen: boolean;
  isPanelsHydrated: boolean;
  isRailOpen: boolean;
  onPanelsChange: (changes: LeftPanels) => void;
  panes: EditorPaneView[];
}

function readSavedPanels(): LeftPanels | null {
  return readJson<LeftPanels | null>(SPLIT_SAVED_PANELS_KEY, null);
}

/** Two pages need the width the left panels take. Opening a split closes
 * the file panel and page rail and fits each pane's pages to its width once
 * its file is ready; going back to one pane opens the panels that were open
 * before, even across a reload. */
export function useSplitRoom({
  isBrowserOpen,
  isPanelsHydrated,
  isRailOpen,
  onPanelsChange,
  panes,
}: SplitRoomOptions) {
  const isSplit = panes.length > 1;
  const fittedRef = useRef(new Set<EditorPaneSide>());

  // Kept in storage rather than memory: a split open when the page reloads
  // still knows what to give back, and one left by a reload gives it back.
  // Nothing happens until the stored layout is read, which would undo it,
  // and the saved panels stay until the panels are seen to match them.
  useEffect(() => {
    if (!isPanelsHydrated) {
      return;
    }
    const saved = readSavedPanels();
    if (isSplit && !saved) {
      writeJson(SPLIT_SAVED_PANELS_KEY, { isBrowserOpen, isRailOpen });
      onPanelsChange({ isBrowserOpen: false, isRailOpen: false });
      return;
    }
    if (isSplit || !saved) {
      return;
    }
    const isRestored =
      saved.isBrowserOpen === isBrowserOpen && saved.isRailOpen === isRailOpen;
    if (isRestored) {
      removeStored(SPLIT_SAVED_PANELS_KEY);
    } else {
      onPanelsChange(saved);
    }
  }, [isBrowserOpen, isPanelsHydrated, isRailOpen, isSplit, onPanelsChange]);

  useEffect(() => {
    if (!isSplit) {
      fittedRef.current.clear();
    }
  }, [isSplit]);

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
