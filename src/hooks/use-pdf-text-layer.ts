import type { PDFDocumentProxy, TextLayer } from "pdfjs-dist";
import { useEffect, useRef } from "react";

/** Lays the page's own text over it, invisibly, at the zoom and turn the page
 * is shown at, so it can be selected and searched. Rebuilt on each change:
 * the text of one page is cheap to lay out again. */
export function usePdfTextLayer(
  doc: PDFDocumentProxy,
  pageIndex: number,
  zoom: number,
  isActive: boolean,
  rotation: number
) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = layerRef.current;
    if (!(isActive && container)) {
      return;
    }

    let isCancelled = false;
    let layer: TextLayer | null = null;

    Promise.all([import("pdfjs-dist"), doc.getPage(pageIndex + 1)])
      .then(([pdfjs, page]) => {
        if (isCancelled) {
          return;
        }
        const viewport = page.getViewport({
          rotation: page.rotate + rotation,
          scale: zoom,
        });
        container.replaceChildren();
        container.style.setProperty("--total-scale-factor", String(zoom));
        layer = new pdfjs.TextLayer({
          container,
          textContentSource: page.streamTextContent(),
          viewport,
        });
        return layer.render();
      })
      .then(() => {
        const end = document.createElement("div");
        end.className = "endOfContent";
        container.append(end);
      })
      .catch(() => {
        // A cancelled layer rejects; nothing here needs to report that.
      });

    return () => {
      isCancelled = true;
      layer?.cancel();
    };
  }, [doc, isActive, pageIndex, rotation, zoom]);

  return layerRef;
}
