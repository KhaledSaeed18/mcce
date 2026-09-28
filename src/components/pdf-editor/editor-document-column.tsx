import type { ReactNode } from "react";
import { EditorToolbar } from "@/components/pdf-editor/editor-toolbar";
import type { EditorSession } from "@/hooks/use-editor-session";
import type { EditorTools } from "@/hooks/use-editor-tools";

interface EditorDocumentColumnProps {
  /** The panes, one per file on screen. */
  children: ReactNode;
  /** The session with focus, which the toolbar acts on. */
  session: EditorSession;
  tools: EditorTools;
}

/** Everything between the side panels: one toolbar over the panes it serves. */
export function EditorDocumentColumn({
  children,
  session,
  tools,
}: EditorDocumentColumnProps) {
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
        />
      ) : null}
      <div className="flex min-h-0 flex-1">{children}</div>
    </div>
  );
}
