import { useRef } from "react";
import { EditorDocumentArea } from "@/components/pdf-editor/editor-document-area";
import { EditorFileBar } from "@/components/pdf-editor/editor-file-bar";
import { EditorStatus } from "@/components/pdf-editor/editor-status";
import { EditorToolbar } from "@/components/pdf-editor/editor-toolbar";
import { FileBrowserPanel } from "@/components/pdf-editor/file-browser-panel";
import { PdfPageList } from "@/components/pdf-editor/pdf-page-list";
import { DEFAULT_EXPORT_NAME, EDITOR_HEIGHT_CLASS } from "@/config/pdf-editor";
import { useEditorMarkup } from "@/hooks/use-editor-markup";
import { useEditorPages } from "@/hooks/use-editor-pages";
import { useEditorPanels } from "@/hooks/use-editor-panels";
import { useEditorTools } from "@/hooks/use-editor-tools";
import { useElementSize } from "@/hooks/use-element-size";
import { useFullscreen } from "@/hooks/use-fullscreen";
import { usePdfDocument } from "@/hooks/use-pdf-document";
import { usePdfExport } from "@/hooks/use-pdf-export";
import { usePdfZoom } from "@/hooks/use-pdf-zoom";
import type { DriveNode } from "@/lib/drive/types";
import { cn } from "@/lib/utils";

interface PdfEditorWorkspaceProps {
  node: DriveNode | null;
  nodes: DriveNode[];
}

export function PdfEditorWorkspace({ node, nodes }: PdfEditorWorkspaceProps) {
  const rootRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const {
    isFullscreen,
    isSupported: isFullscreenSupported,
    toggle: toggleFullscreen,
  } = useFullscreen(rootRef);
  const { isBrowserOpen, isRailOpen, toggleBrowser, toggleRail } =
    useEditorPanels();

  const { bytes, doc, status } = usePdfDocument(node?.id);
  const viewport = useElementSize(scrollRef);
  const {
    color,
    fontSize,
    setColor,
    setFontSize,
    setStrokeWidth,
    setTool,
    strokeWidth,
    tool,
  } = useEditorTools();
  const markup = useEditorMarkup({
    fileId: node?.id,
    pageCount: doc?.numPages ?? 0,
    setColor,
    setFontSize,
  });
  const { activeSize, isDocumentShown, navigation, sizes } = useEditorPages(
    scrollRef,
    doc,
    markup.pages
  );
  const zoom = usePdfZoom({ pageSize: activeSize, viewport });
  const { exportPdf, status: exportStatus } = usePdfExport({
    annotations: markup.annotations,
    bytes,
    fileName: node ? node.name : DEFAULT_EXPORT_NAME,
    layout: markup.pages,
  });

  const settings = { color, fontSize, strokeWidth, tool };

  return (
    /* Fullscreen paints its own backdrop behind the element, so the page needs its own ground. */
    <main
      className={cn("flex flex-col bg-background", EDITOR_HEIGHT_CLASS)}
      ref={rootRef}
    >
      <EditorFileBar
        isBrowserOpen={isBrowserOpen}
        isFullscreen={isFullscreen}
        isFullscreenSupported={isFullscreenSupported}
        isRailOpen={isRailOpen}
        node={node}
        onToggleBrowser={toggleBrowser}
        onToggleFullscreen={toggleFullscreen}
        onToggleRail={toggleRail}
      />
      <div className="flex min-h-0 flex-1">
        {isBrowserOpen ? (
          <FileBrowserPanel activeNode={node} nodes={nodes} />
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col">
          <EditorToolbar
            canRedo={markup.canRedo}
            canUndo={markup.canUndo}
            color={color}
            exportStatus={exportStatus}
            fontSize={fontSize}
            navigation={navigation}
            onClear={markup.clear}
            onColorChange={markup.changeColor}
            onExport={exportPdf}
            onFontSizeChange={markup.changeFontSize}
            onRedo={markup.redo}
            onStrokeWidthChange={setStrokeWidth}
            onToolChange={setTool}
            onUndo={markup.undo}
            strokeWidth={strokeWidth}
            tool={tool}
            zoom={zoom}
          />
          <EditorDocumentArea
            doc={doc}
            isRailOpen={isRailOpen}
            layout={markup.pages}
            navigation={navigation}
            onRemovePage={markup.removePage}
            onReorderPage={markup.reorderPage}
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
              <EditorStatus status={status} />
            )}
          </EditorDocumentArea>
        </div>
      </div>
    </main>
  );
}
