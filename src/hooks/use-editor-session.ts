import { useRef } from "react";
import { DEFAULT_EXPORT_NAME } from "@/config/pdf-editor";
import { useClipMaker } from "@/hooks/use-clip-maker";
import { useDocumentSearch } from "@/hooks/use-document-search";
import { useEditorInk } from "@/hooks/use-editor-ink";
import { useEditorMarkup } from "@/hooks/use-editor-markup";
import { useEditorPages } from "@/hooks/use-editor-pages";
import { useEditorStudy } from "@/hooks/use-editor-study";
import type { EditorTools } from "@/hooks/use-editor-tools";
import { useEditorZoom } from "@/hooks/use-editor-zoom";
import { usePdfDocument } from "@/hooks/use-pdf-document";
import { usePdfExport } from "@/hooks/use-pdf-export";
import { useRecordRecentFile } from "@/hooks/use-record-recent-file";
import { findSaveStatus } from "@/lib/pdf-editor/save-status";
import type { EditorFile } from "@/lib/pdf-editor/types";

interface EditorSessionOptions {
  /** True while Space is held, which borrows the hand without changing the tool. */
  isSpacePanning: boolean;
  node: EditorFile | null;
  /** A page to open the file on instead of where it was left. */
  startPage?: number;
  /** Shared by every open file, so a pen picked up once writes on any of them. */
  tools: EditorTools;
}

/** Everything about one file on screen: its pages, its markup, how the tools
 * draw on it, and its scroller, zoom, and search. Its keys are bound by useEditorShortcuts,
 * for the session that has focus. */
export function useEditorSession({
  isSpacePanning,
  node,
  startPage,
  tools,
}: EditorSessionOptions) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { bytes, doc, retry, status } = usePdfDocument(node);
  // Recent files are shared with the rest of the site, which only knows Drive files.
  useRecordRecentFile(node?.source === "drive" ? node.id : undefined);
  const fileMarkup = useEditorMarkup({
    fileId: node?.id,
    pageCount: doc?.numPages ?? 0,
    setColor: tools.setColor,
    setFontSize: tools.setFontSize,
  });
  const { activeSize, isDocumentShown, navigation, sizes } = useEditorPages(
    scrollRef,
    doc,
    fileMarkup.pages
  );
  const { clips, markup } = useClipMaker({
    doc,
    markup: fileMarkup,
    node,
    sizes,
    tools,
  });
  const { bookmarks, covers, exam } = useEditorStudy({
    activeIndex: navigation.activeIndex,
    annotations: markup.annotations,
    fileId: node?.id,
    onToolChange: tools.setTool,
    pages: markup.pages,
  });
  const search = useDocumentSearch({
    doc,
    goToPage: navigation.goToPage,
    pages: markup.pages,
  });
  const zoom = useEditorZoom({
    activeSize,
    fileId: node?.id,
    navigation,
    scrollRef,
    startPage,
  });
  const { exportPdf, status: exportStatus } = usePdfExport({
    annotations: markup.annotations,
    bytes,
    fileName: node ? node.name : DEFAULT_EXPORT_NAME,
    layout: markup.pages,
  });

  const { ink, settings } = useEditorInk({
    changeColor: markup.changeColor,
    isSpacePanning,
    tools,
  });

  return {
    bookmarks,
    clips,
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
    saveStatus: findSaveStatus(doc !== null, markup.isSaved),
    scrollRef,
    search,
    settings,
    sizes,
    status,
    zoom,
  };
}

export type EditorSession = ReturnType<typeof useEditorSession>;
