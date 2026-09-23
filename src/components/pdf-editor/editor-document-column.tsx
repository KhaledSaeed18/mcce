import type { RefObject } from "react";
import { EditorDocumentArea } from "@/components/pdf-editor/editor-document-area";
import { EditorPlaceholder } from "@/components/pdf-editor/editor-placeholder";
import { EditorToolbar } from "@/components/pdf-editor/editor-toolbar";
import { PdfPageList } from "@/components/pdf-editor/pdf-page-list";
import type { EditorSession } from "@/hooks/use-editor-session";
import type { EditorFile, EditorTreeNode } from "@/lib/pdf-editor/types";

interface EditorDocumentColumnProps {
  isBrowserOpen: boolean;
  isPanelAnimated: boolean;
  isRailOpen: boolean;
  node: EditorFile | null;
  nodes: EditorTreeNode[];
  onShowFiles: () => void;
  scrollRef: RefObject<HTMLDivElement | null>;
  session: EditorSession;
}

/** Everything right of the file panel: the tools, the rail, and the pages. */
export function EditorDocumentColumn({
  isBrowserOpen,
  isPanelAnimated,
  isRailOpen,
  node,
  nodes,
  onShowFiles,
  scrollRef,
  session,
}: EditorDocumentColumnProps) {
  const {
    doc,
    exportPdf,
    exportStatus,
    ink,
    isDocumentShown,
    markup,
    navigation,
    retry,
    settings,
    sizes,
    status,
    tools,
    zoom,
  } = session;

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      {doc ? (
        <EditorToolbar
          canClear={markup.annotations.length > 0}
          canRedo={markup.canRedo}
          canRestore={!markup.isOriginal}
          canUndo={markup.canUndo}
          color={ink.color}
          exportStatus={exportStatus}
          fontSize={tools.fontSize}
          navigation={navigation}
          onClear={markup.clear}
          onColorChange={ink.changeColor}
          onExport={exportPdf}
          onFontSizeChange={markup.changeFontSize}
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
      <EditorDocumentArea
        doc={doc}
        isLoading={status === "loading"}
        isPanelAnimated={isPanelAnimated}
        isRailOpen={isRailOpen}
        layout={markup.pages}
        navigation={navigation}
        onCopyPage={markup.copyPage}
        onRemovePage={markup.removePage}
        onReorderPage={markup.reorderPage}
        onRotatePage={markup.rotatePage}
        scrollRef={scrollRef}
        sizes={sizes}
      >
        {doc && isDocumentShown ? (
          <PdfPageList
            actions={markup.actions}
            annotations={markup.annotations}
            doc={doc}
            onTextDraftChange={markup.openDraft}
            pages={markup.pages}
            selectedId={markup.selectedId}
            settings={settings}
            textDraft={markup.draft}
            zoom={zoom.value}
          />
        ) : (
          <EditorPlaceholder
            isBrowserOpen={isBrowserOpen}
            nodes={nodes}
            onRetry={retry}
            onShowFiles={onShowFiles}
            source={node ? node.source : "drive"}
            status={status}
          />
        )}
      </EditorDocumentArea>
    </div>
  );
}
