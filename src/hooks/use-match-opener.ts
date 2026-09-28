import { useCallback } from "react";
import type { EditorPaneView } from "@/hooks/use-editor-panes";
import type {
  EditorPaneSide,
  EditorTreeNode,
  OpenFile,
} from "@/lib/pdf-editor/types";

interface MatchOpenerOptions {
  onArrive: (fileId: string, page: number) => void;
  onPlace: (
    file: Pick<OpenFile, "id" | "source">,
    side: EditorPaneSide
  ) => void;
}

const OTHER_SIDE: Record<EditorPaneSide, EditorPaneSide> = {
  beside: "primary",
  primary: "beside",
};

/** Opens a pane's match in the other pane, on the page that pane is on, so
 * the lock can take the two from there. */
export function useMatchOpener({ onArrive, onPlace }: MatchOpenerOptions) {
  return useCallback(
    (pane: EditorPaneView, match: EditorTreeNode) => {
      onArrive(match.id, pane.session.navigation.activeIndex);
      onPlace({ id: match.id, source: "drive" }, OTHER_SIDE[pane.side]);
    },
    [onArrive, onPlace]
  );
}
