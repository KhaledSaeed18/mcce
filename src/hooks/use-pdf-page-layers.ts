import type { PDFDocumentProxy } from "pdfjs-dist";
import type { RefObject } from "react";
import { useInViewport } from "@/hooks/use-in-viewport";
import { usePdfPageRender } from "@/hooks/use-pdf-page-render";
import { usePdfTextLayer } from "@/hooks/use-pdf-text-layer";
import type { EditorPage } from "@/lib/pdf-editor/types";

/** A page's own layers, drawn once it is near the screen: the picture of the
 * page and the invisible text laid over it. */
export function usePdfPageLayers(
  containerRef: RefObject<HTMLElement | null>,
  doc: PDFDocumentProxy,
  page: EditorPage,
  zoom: number
) {
  const isVisible = useInViewport(containerRef);
  const { canvasRef, size } = usePdfPageRender(
    doc,
    page.sourceIndex,
    zoom,
    isVisible,
    page.rotation
  );
  const { layerRef, textDivs } = usePdfTextLayer(
    doc,
    page.sourceIndex,
    zoom,
    isVisible,
    page.rotation
  );
  return { canvasRef, size, textDivs, textLayerRef: layerRef };
}
