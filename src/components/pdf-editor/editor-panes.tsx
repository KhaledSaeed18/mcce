import { Fragment, useRef } from "react";
import { EditorPane } from "@/components/pdf-editor/editor-pane";
import { EditorPaneDivider } from "@/components/pdf-editor/editor-pane-divider";
import { EditorPaneHeader } from "@/components/pdf-editor/editor-pane-header";
import { EditorPaneSlot } from "@/components/pdf-editor/editor-pane-slot";
import { ScrollLockButton } from "@/components/pdf-editor/scroll-lock-button";
import type { EditorPaneView } from "@/hooks/use-editor-panes";
import type { EditorTools } from "@/hooks/use-editor-tools";
import { usePaneChips } from "@/hooks/use-pane-chips";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { useSplitResize } from "@/hooks/use-split-resize";
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

function shareOf(side: EditorPaneSide, ratio: number): number {
  return side === "primary" ? ratio : 1 - ratio;
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { handlers, ratio } = useSplitResize(containerRef);
  const lock = useScrollLock(panes);

  return (
    <div className="flex min-h-0 min-w-0 flex-1" ref={containerRef}>
      {panes.map((pane, index) => (
        <Fragment key={pane.side}>
          {index > 0 ? (
            <EditorPaneDivider handlers={handlers} ratio={ratio}>
              <ScrollLockButton gap={lock.gap} onToggle={lock.toggle} />
            </EditorPaneDivider>
          ) : null}
          <EditorPaneSlot
            isFocused={pane.side === focusedSide}
            isSplit={isSplit}
            onFocus={onFocus}
            share={isSplit ? shareOf(pane.side, ratio) : 1}
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
