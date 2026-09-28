import type { PDFDocumentProxy } from "pdfjs-dist";
import type { RefObject } from "react";
import { PAGE_NEAR_VIEW_MARGIN } from "@/config/pdf-editor";
import { useNearView } from "@/hooks/use-near-view";
import { usePageScroller } from "@/hooks/use-page-scroller";
import { usePdfPageRender } from "@/hooks/use-pdf-page-render";
import { usePdfTextLayer } from "@/hooks/use-pdf-text-layer";
import type { EditorPage } from "@/lib/pdf-editor/types";

/** A page's own layers, drawn while it is near the screen: the picture of the
 * page and the invisible text laid over it. */
export function usePdfPageLayers(
  containerRef: RefObject<HTMLElement | null>,
  doc: PDFDocumentProxy,
  page: EditorPage,
  zoom: number
) {
  const isNear = useNearView(
    containerRef,
    usePageScroller(),
    PAGE_NEAR_VIEW_MARGIN
  );
  const { canvasRef, size } = usePdfPageRender(doc, page, zoom, isNear);
  // A sheet the reader put in has no text of its own to lay over it.
  const { layerRef, textDivs } = usePdfTextLayer(
    doc,
    page.sourceIndex,
    zoom,
    isNear && !page.sheet,
    page.rotation
  );
  return { canvasRef, isNear, size, textDivs, textLayerRef: layerRef };
}
