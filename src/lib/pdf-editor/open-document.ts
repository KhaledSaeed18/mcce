import type { PDFDocumentLoadingTask, PDFDocumentProxy } from "pdfjs-dist";
import { PDF_STANDARD_FONTS_PATH } from "@/config/pdf-editor";
import { fetchPdfBytes } from "./fetch-pdf";

export interface OpenedDocument {
  /** The file as it arrived, kept whole because the export writes into a copy of it. */
  bytes: ArrayBuffer;
  doc: PDFDocumentProxy;
  task: PDFDocumentLoadingTask;
}

/** Loaded lazily: pdf.js and its worker are far too big to sit in the main bundle. */
export async function openDocument(fileId: string): Promise<OpenedDocument> {
  // Reading a file is browser work: pdf.js runs against a worker and a canvas,
  // and the effect that calls this never runs on the server. Saying so lets the
  // bundler leave pdf.js out of the server build rather than carrying it there.
  if (import.meta.env.SSR) {
    throw new Error("A PDF can only be opened in the browser");
  }

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
  return { bytes, doc: await task.promise, task };
}
