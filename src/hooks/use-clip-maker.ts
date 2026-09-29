import type { PDFDocumentProxy } from "pdfjs-dist";
import { useCallback, useMemo } from "react";
import type { EditorMarkup } from "@/hooks/use-editor-markup";
import type { EditorTools } from "@/hooks/use-editor-tools";
import {
  type ClipSource,
  createClip,
  redrawClip,
} from "@/lib/pdf-editor/clips/create-clip";
import type { EditorClip } from "@/lib/pdf-editor/clips/types";
import type {
  AnnotationActions,
  Box,
  EditorFile,
  PageActions,
  PageSize,
} from "@/lib/pdf-editor/types";

interface ClipMakerOptions {
  doc: PDFDocumentProxy | null;
  markup: EditorMarkup;
  node: EditorFile | null;
  sizes: PageSize[];
  tools: EditorTools;
}

/** Takes clips from the file in a session: a box drawn with the clip tool,
 * the lines selected, or a whole page, and draws a clip again from it. */
export function useClipMaker({
  doc,
  markup,
  node,
  sizes,
  tools,
}: ClipMakerOptions) {
  const { annotations, pages } = markup;
  const { restoreTool, tool } = tools;

  const findSource = useCallback(
    (pageId: string): ClipSource | null => {
      const position = pages.findIndex((page) => page.id === pageId);
      if (!(doc && node) || position < 0) {
        return null;
      }
      const file = { id: node.id, name: node.name, source: node.source };
      return { annotations, doc, file, page: pages[position], position };
    },
    [annotations, doc, node, pages]
  );

  const clipBox = useCallback(
    (pageId: string, box: Box) => {
      if (tool === "clip") {
        restoreTool();
      }
      const source = findSource(pageId);
      if (source) {
        createClip(source, box).catch(() => undefined);
      }
    },
    [findSource, restoreTool, tool]
  );

  const clipPage = useCallback(
    (pageId: string) => {
      const page = pages.find((item) => item.id === pageId);
      const size = page ? sizes[page.sourceIndex] : undefined;
      if (size) {
        clipBox(pageId, { height: size.height, width: size.width, x: 0, y: 0 });
      }
    },
    [clipBox, pages, sizes]
  );

  const redraw = useCallback(
    (clip: EditorClip) => {
      const source = node?.id === clip.file.id ? findSource(clip.pageId) : null;
      if (source) {
        redrawClip(clip, source).catch(() => undefined);
      }
    },
    [findSource, node]
  );

  const actions = useMemo<AnnotationActions>(
    () => ({ ...markup.actions, clip: clipBox }),
    [clipBox, markup.actions]
  );
  const pageActions = useMemo<PageActions>(
    () => ({ ...markup.pageActions, clip: clipPage }),
    [clipPage, markup.pageActions]
  );

  return {
    clips: { clipBox, redraw },
    // The file's markup with taking a clip added to its actions, which
    // travel down to the pages and the rail together.
    markup: { ...markup, actions, pageActions },
  };
}
