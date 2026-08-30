import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist";
import { useEffect, useRef, useState } from "react";
import { MAX_RENDER_DPR } from "@/config/pdf-editor";
import type { PageSize } from "@/lib/pdf-editor/types";

/** Renders one page into its own canvas, re-running when the zoom or the turn changes. */
export function usePdfPageRender(
  doc: PDFDocumentProxy,
  pageIndex: number,
  zoom: number,
  isActive: boolean,
  rotation = 0
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState<PageSize | null>(null);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    let cancelled = false;
    let task: RenderTask | null = null;

    doc
      .getPage(pageIndex + 1)
      .then((page) => {
        const base = page.getViewport({ scale: 1 });
        setSize({ height: base.height, width: base.width });

        const canvas = canvasRef.current;
        if (cancelled || !canvas) {
          return;
        }

        const dpr = Math.min(window.devicePixelRatio || 1, MAX_RENDER_DPR);
        // The page's own orientation is what the base size already accounts for,
        // so the editor's turn is added to it rather than replacing it.
        const viewport = page.getViewport({
          rotation: page.rotate + rotation,
          scale: zoom * dpr,
        });
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = `${viewport.width / dpr}px`;
        canvas.style.height = `${viewport.height / dpr}px`;

        task = page.render({ canvas, viewport });
        return task.promise;
      })
      .catch(() => {
        // A cancelled render rejects; nothing here needs to report that.
      });

    return () => {
      cancelled = true;
      task?.cancel();
    };
  }, [doc, isActive, pageIndex, rotation, zoom]);

  return { canvasRef, size };
}
