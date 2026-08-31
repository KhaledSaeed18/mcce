import type { PDFDocumentLoadingTask, PDFDocumentProxy } from "pdfjs-dist";
import { useEffect, useState } from "react";
import { PDF_STANDARD_FONTS_PATH } from "@/config/pdf-editor";
import { fetchPdfBytes } from "@/lib/pdf-editor/fetch-pdf";

export type PdfLoadStatus = "idle" | "loading" | "ready" | "error";

interface PdfDocumentState {
  bytes: ArrayBuffer | null;
  doc: PDFDocumentProxy | null;
  status: PdfLoadStatus;
}

/** The state remembers which file it holds, which is how a stale one is spotted. */
interface LoadedDocument extends PdfDocumentState {
  fileId: string | null;
}

interface OpenedDocument extends PdfDocumentState {
  task: PDFDocumentLoadingTask;
}

const IDLE_STATE: PdfDocumentState = {
  bytes: null,
  doc: null,
  status: "idle",
};

const LOADING_STATE: PdfDocumentState = {
  bytes: null,
  doc: null,
  status: "loading",
};

/** Loaded lazily: pdf.js and its worker are far too big to sit in the main bundle. */
async function openDocument(fileId: string): Promise<OpenedDocument> {
  const [{ getDocument, GlobalWorkerOptions }, workerModule] =
    await Promise.all([
      import("pdfjs-dist"),
      import("pdfjs-dist/build/pdf.worker.min.mjs?url"),
    ]);
  GlobalWorkerOptions.workerSrc = workerModule.default;

  const response = await fetchPdfBytes({ data: { fileId } });
  if (!response.ok) {
    throw new Error(`The PDF could not be fetched (${response.status})`);
  }
  const bytes = await response.arrayBuffer();

  // pdf.js transfers what it is given to its worker, which detaches the buffer.
  // Export needs the original later, so the worker gets a copy.
  const task = getDocument({
    data: bytes.slice(0),
    standardFontDataUrl: PDF_STANDARD_FONTS_PATH,
  });
  const doc = await task.promise;
  return { bytes, doc, status: "ready", task };
}

/** Fetches the file through the server function that proxies Drive, then opens it. */
export function usePdfDocument(fileId: string | undefined): PdfDocumentState {
  const [state, setState] = useState<LoadedDocument>({
    ...IDLE_STATE,
    fileId: null,
  });

  useEffect(() => {
    if (!fileId) {
      setState({ ...IDLE_STATE, fileId: null });
      return;
    }

    let active = true;
    let task: PDFDocumentLoadingTask | null = null;
    setState({ ...LOADING_STATE, fileId });

    openDocument(fileId)
      .then((next) => {
        const { bytes, doc, status, task: opened } = next;
        task = opened;
        if (active) {
          setState({ bytes, doc, fileId, status });
          return;
        }
        next.task.destroy();
      })
      .catch(() => {
        if (active) {
          setState({ bytes: null, doc: null, fileId, status: "error" });
        }
      });

    return () => {
      active = false;
      task?.destroy();
    };
  }, [fileId]);

  // The effect that reads a new file runs after the render that asked for it, so
  // until it has, the state still holds the file before it. Handing that one back
  // would give the new file the page count and the bytes of the old one.
  if (state.fileId !== (fileId ?? null)) {
    return fileId ? LOADING_STATE : IDLE_STATE;
  }
  return state;
}
