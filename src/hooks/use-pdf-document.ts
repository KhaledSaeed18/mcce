import type { PDFDocumentLoadingTask, PDFDocumentProxy } from "pdfjs-dist";
import { useEffect, useState } from "react";
import { openDocument } from "@/lib/pdf-editor/open-document";

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

const IDLE_STATE: PdfDocumentState = { bytes: null, doc: null, status: "idle" };
const LOADING_STATE: PdfDocumentState = {
  bytes: null,
  doc: null,
  status: "loading",
};

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
      .then(({ bytes, doc, task: opened }) => {
        task = opened;
        if (active) {
          setState({ bytes, doc, fileId, status: "ready" });
          return;
        }
        opened.destroy();
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
