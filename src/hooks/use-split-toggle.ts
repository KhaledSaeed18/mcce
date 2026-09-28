import { useCallback } from "react";
import { useSplitHotkey } from "@/hooks/use-split-hotkey";
import { findNextFile } from "@/lib/pdf-editor/desk-order";
import type {
  EditorDesk,
  EditorPaneSide,
  OpenFile,
} from "@/lib/pdf-editor/types";

interface SplitToggleOptions {
  activeId: string | undefined;
  desk: EditorDesk;
  onClosePane: (side: EditorPaneSide) => void;
  onOpenBeside: (file: OpenFile) => void;
  /** The pane without focus, while the view is split. */
  otherSide: EditorPaneSide | null;
}

/** Cmd/Ctrl+\ puts the file seen before this one beside it, or, in a split,
 * closes the pane without focus. */
export function useSplitToggle({
  activeId,
  desk,
  onClosePane,
  onOpenBeside,
  otherSide,
}: SplitToggleOptions) {
  const toggle = useCallback(() => {
    if (otherSide) {
      onClosePane(otherSide);
      return;
    }
    const last = activeId ? findNextFile(desk, activeId) : null;
    if (last) {
      onOpenBeside(last);
    }
  }, [activeId, desk, onClosePane, onOpenBeside, otherSide]);

  useSplitHotkey(toggle);
}
