import { Fragment, useCallback, useRef } from "react";
import { EditorPane } from "@/components/pdf-editor/editor-pane";
import { EditorPaneDivider } from "@/components/pdf-editor/editor-pane-divider";
import { EditorPaneHeader } from "@/components/pdf-editor/editor-pane-header";
import { EditorPaneSlot } from "@/components/pdf-editor/editor-pane-slot";
import { MatchPeekOverlay } from "@/components/pdf-editor/match-peek-overlay";
import { PaneDropOverlay } from "@/components/pdf-editor/pane-drop-overlay";
import { ScrollLockButton } from "@/components/pdf-editor/scroll-lock-button";
import type { EditorPaneView } from "@/hooks/use-editor-panes";
import type { EditorTools } from "@/hooks/use-editor-tools";
import { usePaneChips } from "@/hooks/use-pane-chips";
import { usePaneDrop } from "@/hooks/use-pane-drop";
import { usePaneFocusHotkey } from "@/hooks/use-pane-focus-hotkey";
import { usePaneMatches } from "@/hooks/use-pane-matches";
import type { ScrollLock } from "@/hooks/use-scroll-lock";
import { useSplitResize } from "@/hooks/use-split-resize";
import type {
  EditorPaneSide,
  EditorTreeNode,
  OpenFile,
} from "@/lib/pdf-editor/types";

interface EditorPanesProps {
  focusedSide: EditorPaneSide;
  isBrowserOpen: boolean;
  isPanelAnimated: boolean;
  isRailOpen: boolean;
  lock: ScrollLock;
  nodes: EditorTreeNode[];
  onClosePane: (side: EditorPaneSide) => void;
  onFocus: (side: EditorPaneSide) => void;
  onOpenMatch: (pane: EditorPaneView, match: EditorTreeNode) => void;
  /** Puts a file on one side, for a tab dropped on the pages. */
  onPlace: (
    file: Pick<OpenFile, "id" | "source">,
    side: EditorPaneSide
  ) => void;
  onShowFiles: () => void;
  onSwap: () => void;
  panes: EditorPaneView[];
  /** The match of the pane with focus, shown over it while M is held. */
  peek: EditorPaneView | null;
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
  lock,
  nodes,
  onClosePane,
  onFocus,
  onOpenMatch,
  onPlace,
  onShowFiles,
  onSwap,
  panes,
  peek,
  tools,
}: EditorPanesProps) {
  const isSplit = panes.length > 1;
  const chips = usePaneChips(panes, nodes);
  const containerRef = useRef<HTMLDivElement>(null);
  const { handlers, ratio } = useSplitResize(containerRef);
  const matches = usePaneMatches(panes, nodes);
  const drop = usePaneDrop(containerRef, onPlace);
  const focusOther = useCallback(
    () => onFocus(focusedSide === "primary" ? "beside" : "primary"),
    [focusedSide, onFocus]
  );
  usePaneFocusHotkey(focusOther, isSplit);

  return (
    <div
      {...drop.handlers}
      className="relative flex min-h-0 min-w-0 flex-1"
      ref={containerRef}
    >
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
                match={matches[index]}
                onClose={onClosePane}
                onOpenMatch={onOpenMatch}
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
            {peek && pane.side === focusedSide ? (
              <MatchPeekOverlay nodes={nodes} peek={peek} tools={tools} />
            ) : null}
          </EditorPaneSlot>
        </Fragment>
      ))}
      {drop.target ? (
        <PaneDropOverlay isSplit={isSplit} target={drop.target} />
      ) : null}
    </div>
  );
}
