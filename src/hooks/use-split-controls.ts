import type { EditorPaneView } from "@/hooks/use-editor-panes";
import type { usePaneActions } from "@/hooks/use-pane-actions";
import { useSplitRoom } from "@/hooks/use-split-room";
import { useSplitToggle } from "@/hooks/use-split-toggle";
import type { EditorDesk, EditorPanels } from "@/lib/pdf-editor/types";

interface SplitControlsOptions {
  activeId: string | undefined;
  desk: EditorDesk;
  other: EditorPaneView | null;
  paneActions: ReturnType<typeof usePaneActions>;
  panels: EditorPanels & {
    update: (changes: Partial<EditorPanels>) => void;
  };
  panes: EditorPaneView[];
}

/** What the editor does around a split: its key, and the room it makes. */
export function useSplitControls({
  activeId,
  desk,
  other,
  paneActions,
  panels,
  panes,
}: SplitControlsOptions) {
  useSplitRoom({
    isBrowserOpen: panels.isBrowserOpen,
    isRailOpen: panels.isRailOpen,
    onPanelsChange: panels.update,
    panes,
  });
  useSplitToggle({
    activeId,
    desk,
    onClosePane: paneActions.close,
    onOpenBeside: paneActions.openBeside,
    otherSide: other?.side ?? null,
  });
}
