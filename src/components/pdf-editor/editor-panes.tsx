import { Fragment } from "react";
import { EditorPane } from "@/components/pdf-editor/editor-pane";
import { EditorPaneHeader } from "@/components/pdf-editor/editor-pane-header";
import { EditorPaneSlot } from "@/components/pdf-editor/editor-pane-slot";
import type { EditorPaneView } from "@/hooks/use-editor-panes";
import type { EditorTools } from "@/hooks/use-editor-tools";
import { usePaneChips } from "@/hooks/use-pane-chips";
import type { EditorPaneSide, EditorTreeNode } from "@/lib/pdf-editor/types";

interface EditorPanesProps {
  focusedSide: EditorPaneSide;
  isBrowserOpen: boolean;
  isPanelAnimated: boolean;
  isRailOpen: boolean;
  nodes: EditorTreeNode[];
  onClosePane: (side: EditorPaneSide) => void;
  onFocus: (side: EditorPaneSide) => void;
  onShowFiles: () => void;
  onSwap: () => void;
  panes: EditorPaneView[];
  tools: EditorTools;
}

/** One file on screen, or two side by side. Panes are keyed by side, so
 * the first keeps its place when the second comes and goes. */
export function EditorPanes({
  focusedSide,
  isBrowserOpen,
  isPanelAnimated,
  isRailOpen,
  nodes,
  onClosePane,
  onFocus,
  onShowFiles,
  onSwap,
  panes,
  tools,
}: EditorPanesProps) {
  const isSplit = panes.length > 1;
  const chips = usePaneChips(panes, nodes);

  return (
    <div className="flex min-h-0 min-w-0 flex-1">
      {panes.map((pane, index) => (
        <Fragment key={pane.side}>
          {index > 0 ? (
            <div
              aria-hidden="true"
              className="w-2 shrink-0 border-x-2 bg-card"
            />
          ) : null}
          <EditorPaneSlot
            isFocused={pane.side === focusedSide}
            isSplit={isSplit}
            onFocus={onFocus}
            side={pane.side}
          >
            {isSplit ? (
              <EditorPaneHeader
                chip={chips[index]}
                onClose={onClosePane}
                onSwap={onSwap}
                pane={pane}
              />
            ) : null}
            <EditorPane
              isBrowserOpen={isBrowserOpen}
              isPanelAnimated={isPanelAnimated}
              isRailOpen={isRailOpen}
              node={pane.node}
              nodes={nodes}
              onShowFiles={onShowFiles}
              session={pane.session}
              tools={tools}
            />
          </EditorPaneSlot>
        </Fragment>
      ))}
    </div>
  );
}
