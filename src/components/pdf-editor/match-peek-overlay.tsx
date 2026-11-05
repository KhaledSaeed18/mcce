import { EditorPane } from "@/components/pdf-editor/editor-pane";
import { MATCH_PEEK_NOTES } from "@/config/pdf-editor";
import type { EditorPaneView } from "@/hooks/use-editor-panes";
import type { EditorTools } from "@/hooks/use-editor-tools";
import { isSolutionName } from "@/lib/pdf-editor/file-chip";
import type { EditorTreeNode } from "@/lib/pdf-editor/types";

interface MatchPeekOverlayProps {
  nodes: EditorTreeNode[];
  peek: EditorPaneView;
  tools: EditorTools;
}

const NOOP = () => undefined;

/** The match laid over the pane with focus while M is held, saying how to
 * get back. */
export function MatchPeekOverlay({
  nodes,
  peek,
  tools,
}: MatchPeekOverlayProps) {
  const isSolution = isSolutionName(peek.node?.name ?? "");

  return (
    <div className="border-primary bg-muted absolute inset-0 z-30 flex flex-col border-2">
      <p className="bg-primary font-head text-primary-foreground shrink-0 border-b-2 px-2 py-1 text-xs">
        {MATCH_PEEK_NOTES[isSolution ? "solution" : "paper"]}
      </p>
      <EditorPane
        isBrowserOpen={false}
        isPanelAnimated={false}
        isRailOpen={false}
        node={peek.node}
        nodes={nodes}
        onShowFiles={NOOP}
        session={peek.session}
        tools={tools}
      />
    </div>
  );
}
