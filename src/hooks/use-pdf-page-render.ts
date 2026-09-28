import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist";
import { useEffect, useRef, useState } from "react";
import { MAX_RENDER_DPR } from "@/config/pdf-editor";
import { drawSheet } from "@/lib/pdf-editor/draw/sheet";
import { getRenderedSize } from "@/lib/pdf-editor/rotation";
import type { EditorPage, PageSize } from "@/lib/pdf-editor/types";

/** A canvas with no pixels holds no memory. Its box keeps the size it was
 * given, so the page does not jump. */
function releaseCanvas(canvas: HTMLCanvasElement | null): void {
  if (canvas) {
    canvas.width = 0;
    canvas.height = 0;
  }
}

/** Renders one page into its own canvas, re-running when the zoom or the turn
 * changes, and lets the picture go while the page is inactive. A sheet the
 * reader put in is painted rather than rendered, at the size of the page of
 * the file it follows. */
export function usePdfPageRender(
  doc: PDFDocumentProxy,
  page: EditorPage,
  zoom: number,
  isActive: boolean
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState<PageSize | null>(null);
  const { rotation, sheet, sourceIndex } = page;

  useEffect(() => {
    if (!isActive) {
      releaseCanvas(canvasRef.current);
      return;
    }

    let cancelled = false;
    let task: RenderTask | null = null;

    doc
      .getPage(sourceIndex + 1)
      .then((source) => {
        const base = source.getViewport({ scale: 1 });
        setSize({ height: base.height, width: base.width });

        const canvas = canvasRef.current;
        if (cancelled || !canvas) {
          return;
        }

        const dpr = Math.min(window.devicePixelRatio || 1, MAX_RENDER_DPR);
        // The page's own orientation is what the base size already accounts for,
        // so the editor's turn is added to it rather than replacing it.
        const viewport = source.getViewport({
          rotation: source.rotate + rotation,
          scale: zoom * dpr,
        });
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = `${viewport.width / dpr}px`;
        canvas.style.height = `${viewport.height / dpr}px`;

        if (sheet) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.setTransform(zoom * dpr, 0, 0, zoom * dpr, 0, 0);
            drawSheet(ctx, sheet, getRenderedSize(base, rotation));
          }
          return;
        }
        task = source.render({ canvas, viewport });
        return task.promise;
      })
      .catch(() => {
        // A cancelled render rejects; nothing here needs to report that.
      });

    return () => {
      cancelled = true;
      task?.cancel();
    };
  }, [doc, isActive, rotation, sheet, sourceIndex, zoom]);

  return { canvasRef, size };
}
