import type { RefObject } from "react";
import { DEFAULT_EXPORT_NAME } from "@/config/pdf-editor";
import { useDocumentScroller } from "@/hooks/use-document-scroller";
import { useEditorInk } from "@/hooks/use-editor-ink";
import { useEditorMarkup } from "@/hooks/use-editor-markup";
import { useEditorPages } from "@/hooks/use-editor-pages";
import { useEditorShortcuts } from "@/hooks/use-editor-shortcuts";
import { useEditorStudy } from "@/hooks/use-editor-study";
import type { EditorTools } from "@/hooks/use-editor-tools";
import { useElementSize } from "@/hooks/use-element-size";
import { usePdfDocument } from "@/hooks/use-pdf-document";
import { usePdfExport } from "@/hooks/use-pdf-export";
import { usePdfZoom } from "@/hooks/use-pdf-zoom";
import { useRecordRecentFile } from "@/hooks/use-record-recent-file";
import { useViewResume } from "@/hooks/use-view-resume";
import type { EditorFile, SaveStatus } from "@/lib/pdf-editor/types";

interface EditorSessionOptions {
  /** True while Space is held, which borrows the hand without changing the tool. */
  isSpacePanning: boolean;
  node: EditorFile | null;
  scrollRef: RefObject<HTMLDivElement | null>;
  /** Shared by every open file, so a pen picked up once writes on any of them. */
  tools: EditorTools;
}

/** Everything about the open file: its pages, its markup, how the tools draw
 * on it, and the zoom and keys it answers to. */
export function useEditorSession({
  isSpacePanning,
  node,
  scrollRef,
  tools,
}: EditorSessionOptions) {
  const { bytes, doc, retry, status } = usePdfDocument(node);
  // Recent files are shared with the rest of the site, which only knows Drive files.
  useRecordRecentFile(node?.source === "drive" ? node.id : undefined);
  const viewport = useElementSize(scrollRef);
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
  const { bookmarks, covers, exam } = useEditorStudy({
    activeIndex: navigation.activeIndex,
    annotations: markup.annotations,
    fileId: node?.id,
    onToolChange: tools.setTool,
    pages: markup.pages,
  });
  const zoom = usePdfZoom({ pageSize: activeSize, viewport });
  useDocumentScroller(scrollRef, node?.id, zoom);
  useViewResume(node?.id, navigation, zoom);
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

  const { ink, settings } = useEditorInk({
    changeColor: markup.changeColor,
    isSpacePanning,
    tools,
  });

  let saveStatus: SaveStatus | null = null;
  if (doc) {
    saveStatus = markup.isSaved ? "saved" : "failed";
  }

  return {
    bookmarks,
    covers,
    doc,
    exam,
    exportPdf,
    exportStatus,
    ink,
    isDocumentShown,
    markup,
    navigation,
    retry,
    saveStatus,
    settings,
    sizes,
    status,
    zoom,
  };
}

export type EditorSession = ReturnType<typeof useEditorSession>;
