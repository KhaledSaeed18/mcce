import type { PDFDocumentLoadingTask, PDFDocumentProxy } from "pdfjs-dist";
import { useCallback, useEffect, useState } from "react";
import { openDocument } from "@/lib/pdf-editor/open-document";
import type { EditorFile } from "@/lib/pdf-editor/types";

export type PdfLoadStatus = "idle" | "loading" | "ready" | "error";

interface PdfDocumentState {
  bytes: ArrayBuffer | null;
  doc: PDFDocumentProxy | null;
  status: PdfLoadStatus;
}

interface PdfDocument extends PdfDocumentState {
  retry: () => void;
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

/** Reads the file from wherever it lives, then opens it. */
export function usePdfDocument(file: EditorFile | null): PdfDocument {
  const fileId = file ? file.id : null;
  const [state, setState] = useState<LoadedDocument>({
    ...IDLE_STATE,
    fileId: null,
  });
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt((count) => count + 1), []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: a file is reloaded when its id changes, not when an equal object is handed in again, and attempt only triggers a fresh load
  useEffect(() => {
    if (!file) {
      setState({ ...IDLE_STATE, fileId: null });
      return;
    }
    const { id } = file;

    let active = true;
    let task: PDFDocumentLoadingTask | null = null;
    setState({ ...LOADING_STATE, fileId: id });

    openDocument(file)
      .then(({ bytes, doc, task: opened }) => {
        task = opened;
        if (active) {
          setState({ bytes, doc, fileId: id, status: "ready" });
          return;
        }
        opened.destroy();
      })
      .catch(() => {
        if (active) {
          setState({ bytes: null, doc: null, fileId: id, status: "error" });
        }
      });

    return () => {
      active = false;
      task?.destroy();
    };
  }, [attempt, fileId]);

  // The effect that reads a new file runs after the render that asked for it, so
  // until it has, the state still holds the file before it. Handing that one back
  // would give the new file the page count and the bytes of the old one.
  if (state.fileId !== fileId) {
    return { ...(fileId ? LOADING_STATE : IDLE_STATE), retry };
  }
  return { ...state, retry };
}
