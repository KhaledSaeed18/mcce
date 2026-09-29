import { useCallback } from "react";
import type { EditorPaneView } from "@/hooks/use-editor-panes";
import type { EditorTreeNode } from "@/lib/pdf-editor/types";

/** Opens the match of the pane with focus in the other pane, for the
 * dashed tab beside its tab. */
export function useFocusedMatchOpener(
  focused: EditorPaneView,
  match: EditorTreeNode | null,
  openMatch: (pane: EditorPaneView, match: EditorTreeNode) => void
) {
  return useCallback(() => {
    if (match) {
      openMatch(focused, match);
    }
  }, [focused, match, openMatch]);
}
