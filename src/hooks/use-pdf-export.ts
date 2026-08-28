import { useCallback, useState } from "react";
import { downloadBlob } from "@/lib/gpa/export/download";
import { buildAnnotatedFileName } from "@/lib/pdf-editor/file-name";
import type { Annotation } from "@/lib/pdf-editor/types";

export type PdfExportStatus = "idle" | "working" | "error";

interface PdfExportOptions {
  annotations: Annotation[];
  bytes: ArrayBuffer | null;
  fileName: string;
}

/** Writes the markup into a copy of the original and hands it to the browser. */
export function usePdfExport({
  annotations,
  bytes,
  fileName,
}: PdfExportOptions) {
  const [status, setStatus] = useState<PdfExportStatus>("idle");

  const exportPdf = useCallback(async () => {
    if (!bytes) {
      return;
    }
    setStatus("working");
    try {
      const { buildAnnotatedPdf } = await import(
        "@/lib/pdf-editor/export/build-annotated-pdf"
      );
      const result = await buildAnnotatedPdf(bytes, annotations);
      const blob = new Blob([result as BlobPart], { type: "application/pdf" });
      downloadBlob(blob, buildAnnotatedFileName(fileName));
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }, [annotations, bytes, fileName]);

  return { exportPdf, status };
}
