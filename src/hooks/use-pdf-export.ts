import { useCallback, useState } from "react";
import { downloadBlob } from "@/lib/gpa/export/download";
import { buildAnnotatedFileName } from "@/lib/pdf-editor/file-name";
import type { Annotation, EditorPage } from "@/lib/pdf-editor/types";

export type PdfExportStatus = "idle" | "working" | "error";

interface PdfExportOptions {
  annotations: Annotation[];
  bytes: ArrayBuffer | null;
  fileName: string;
  layout: EditorPage[];
}

/** Writes the markup into a copy of the original and hands it to the browser. */
export function usePdfExport({
  annotations,
  bytes,
  fileName,
  layout,
}: PdfExportOptions) {
  const [status, setStatus] = useState<PdfExportStatus>("idle");

  const exportPdf = useCallback(async () => {
    // Building the copy is browser work, reached only by a press. Saying so lets
    // the bundler prove it and leave pdf-lib out of the server build entirely,
    // rather than shipping it to a runtime that can never reach it.
    if (import.meta.env.SSR || !bytes) {
      return;
    }
    setStatus("working");
    try {
      const { buildAnnotatedPdf } = await import(
        "@/lib/pdf-editor/export/build-annotated-pdf"
      );
      const result = await buildAnnotatedPdf(bytes, annotations, layout);
      const blob = new Blob([result as BlobPart], { type: "application/pdf" });
      downloadBlob(blob, buildAnnotatedFileName(fileName));
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }, [annotations, bytes, fileName, layout]);

  return { exportPdf, status };
}
