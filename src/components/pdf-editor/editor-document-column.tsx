import type { ReactNode } from "react";
import { ClipsButton } from "@/components/pdf-editor/clips-button";
import { EditorClipLayer } from "@/components/pdf-editor/editor-clip-layer";
import { EditorToolbar } from "@/components/pdf-editor/editor-toolbar";
import { useClipView } from "@/hooks/use-clip-view";
import type { EditorPaneView } from "@/hooks/use-editor-panes";
import type { EditorSession } from "@/hooks/use-editor-session";
import type { EditorTools } from "@/hooks/use-editor-tools";
import type { EditorTreeNode, OpenFile } from "@/lib/pdf-editor/types";

interface EditorDocumentColumnProps {
  /** The panes, one per file on screen. */
  children: ReactNode;
  isRailOpen: boolean;
  nodes: EditorTreeNode[];
  onOpenBeside: (file: OpenFile) => void;
  panes: EditorPaneView[];
  /** The session with focus, which the toolbar acts on. */
  session: EditorSession;
  tools: EditorTools;
}

/** Everything between the side panels: one toolbar over the panes it
 * serves, and the clips floating over them. */
export function EditorDocumentColumn({
  children,
  isRailOpen,
  nodes,
  onOpenBeside,
  panes,
  session,
  tools,
}: EditorDocumentColumnProps) {
  const clipView = useClipView({ nodes, onOpenBeside, panes });
  const {
    bookmarks,
    covers,
    doc,
    exam,
    exportPdf,
    exportStatus,
    ink,
    markup,
    navigation,
    search,
    zoom,
  } = session;

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      {doc ? (
        <EditorToolbar
          bookmarks={bookmarks}
          canClear={markup.annotations.length > 0}
          canRedo={markup.canRedo}
          canRestore={!markup.isOriginal}
          canUndo={markup.canUndo}
          color={ink.color}
          covers={covers}
          exam={exam}
          exportStatus={exportStatus}
          fontSize={tools.fontSize}
          navigation={navigation}
          onClear={markup.clear}
          onColorChange={ink.changeColor}
          onExport={exportPdf}
          onFontSizeChange={markup.changeFontSize}
          onOpenSearch={search.open}
          onRedo={markup.redo}
          onRestore={markup.restore}
          onStrokeWidthChange={ink.changeStrokeWidth}
          onToolChange={tools.setTool}
          onUndo={markup.undo}
          strokeWidth={ink.strokeWidth}
          tool={tools.tool}
          zoom={zoom}
        >
          <ClipsButton view={clipView} />
        </EditorToolbar>
      ) : null}
      <div className="relative flex min-h-0 flex-1">
        {children}
        <EditorClipLayer
          isRailOpen={isRailOpen && session.doc !== null}
          isSplit={panes.length > 1}
          view={clipView}
        />
      </div>
    </div>
  );
}
