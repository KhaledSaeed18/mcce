import { EditorPaneMenu } from "@/components/pdf-editor/editor-pane-menu";
import { FileTypeChip } from "@/components/pdf-editor/file-type-chip";
import type { EditorPaneView } from "@/hooks/use-editor-panes";
import type { EditorPaneSide, FileChip } from "@/lib/pdf-editor/types";

interface EditorPaneHeaderProps {
  chip: FileChip | null;
  onClose: (side: EditorPaneSide) => void;
  onSwap: () => void;
  pane: EditorPaneView;
}

/** A pane's file in full, and the page it is on, over each pane of a split,
 * where two files with near names need telling apart. */
export function EditorPaneHeader({
  chip,
  onClose,
  onSwap,
  pane,
}: EditorPaneHeaderProps) {
  const { activeIndex, pageCount } = pane.session.navigation;

  return (
    <div className="flex h-7 shrink-0 items-center gap-2 border-b-2 bg-card px-2 text-xs">
      {chip ? <FileTypeChip chip={chip} /> : null}
      <span className="min-w-0 truncate font-medium" title={pane.node?.name}>
        {pane.node?.name}
      </span>
      {pageCount > 0 ? (
        <span className="ml-auto shrink-0 text-muted-foreground tabular-nums">
          {activeIndex + 1} / {pageCount}
        </span>
      ) : null}
      <EditorPaneMenu onClose={onClose} onSwap={onSwap} side={pane.side} />
    </div>
  );
}
