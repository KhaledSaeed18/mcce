import type { RefObject } from "react";
import { DEFAULT_EXPORT_NAME } from "@/config/pdf-editor";
import { useDocumentScroller } from "@/hooks/use-document-scroller";
import { useEditorMarkup } from "@/hooks/use-editor-markup";
import { useEditorPages } from "@/hooks/use-editor-pages";
import { useEditorShortcuts } from "@/hooks/use-editor-shortcuts";
import { useEditorTools } from "@/hooks/use-editor-tools";
import { useElementSize } from "@/hooks/use-element-size";
import { usePdfDocument } from "@/hooks/use-pdf-document";
import { usePdfExport } from "@/hooks/use-pdf-export";
import { usePdfZoom } from "@/hooks/use-pdf-zoom";
import { useRecordRecentFile } from "@/hooks/use-record-recent-file";
import type { EditorFile } from "@/lib/pdf-editor/types";

/** Everything about the open file: its pages, its markup, the tools drawing
 * it, and the zoom and keys it answers to. */
export function useEditorSession(
  node: EditorFile | null,
  scrollRef: RefObject<HTMLDivElement | null>
) {
  const { bytes, doc, status } = usePdfDocument(node?.id);
  useRecordRecentFile(node?.id);
  const viewport = useElementSize(scrollRef);
  const tools = useEditorTools();
  const markup = useEditorMarkup({
    fileId: node?.id,
    pageCount: doc?.numPages ?? 0,
    setColor: tools.setColor,
    setFontSize: tools.setFontSize,
  });
  const { activeSize, isDocumentShown, navigation, sizes } = useEditorPages(
    scrollRef,
    doc,
    markup.pages
  );
  const zoom = usePdfZoom({ pageSize: activeSize, viewport });
  useDocumentScroller(scrollRef, node?.id, zoom);
  const { exportPdf, status: exportStatus } = usePdfExport({
    annotations: markup.annotations,
    bytes,
    fileName: node ? node.name : DEFAULT_EXPORT_NAME,
    layout: markup.pages,
  });

  useEditorShortcuts({
    markup,
    navigation,
    onExport: exportPdf,
    onToolChange: tools.setTool,
    zoom,
  });

  return {
    doc,
    exportPdf,
    exportStatus,
    isDocumentShown,
    markup,
    navigation,
    sizes,
    status,
    tools,
    zoom,
  };
}
