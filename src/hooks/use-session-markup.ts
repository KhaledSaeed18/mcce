import type { PDFDocumentProxy } from "pdfjs-dist";
import type { RefObject } from "react";
import { useClipMaker } from "@/hooks/use-clip-maker";
import { useEditorMarkup } from "@/hooks/use-editor-markup";
import { useEditorPages } from "@/hooks/use-editor-pages";
import type { EditorTools } from "@/hooks/use-editor-tools";
import type { EditorFile } from "@/lib/pdf-editor/types";

interface SessionMarkupOptions {
  doc: PDFDocumentProxy | null;
  node: EditorFile | null;
  scrollRef: RefObject<HTMLDivElement | null>;
  tools: EditorTools;
}

/** A file's pages and markup, where its pages sit in the scroller, and the
 * clips taken from it. */
export function useSessionMarkup({
  doc,
  node,
  scrollRef,
  tools,
}: SessionMarkupOptions) {
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
  return { activeSize, clips, isDocumentShown, markup, navigation, sizes };
}
