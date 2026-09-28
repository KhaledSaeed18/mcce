import { useCallback, useState } from "react";
import type { PdfExportStatus } from "@/hooks/use-pdf-export";
import { saveBlob } from "@/lib/gpa/export/download";
import { buildSummaryFileName } from "@/lib/pdf-editor/file-name";
import type { StudyPageGroup } from "@/lib/pdf-editor/study-items";
import { buildSummaryBlocks } from "@/lib/pdf-editor/summary/summary-blocks";

/** Writes the file's notes and highlights into a summary to revise from, and
 * hands it to the browser. The PDF toolkit is only loaded when it is asked for. */
export function useRevisionSummary(
  fileName: string,
  groups: readonly StudyPageGroup[]
) {
  const [status, setStatus] = useState<PdfExportStatus>("idle");

  const download = useCallback(async () => {
    if (import.meta.env.SSR) {
      return;
    }
    setStatus("working");
    try {
      const { buildSummaryPdf } = await import(
        "@/lib/pdf-editor/summary/build-summary-pdf"
      );
      const bytes = await buildSummaryPdf(buildSummaryBlocks(fileName, groups));
      const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
      await saveBlob(blob, buildSummaryFileName(fileName));
      setStatus("idle");
    } catch (error) {
      const isCancelled =
        error instanceof DOMException && error.name === "AbortError";
      setStatus(isCancelled ? "idle" : "error");
    }
  }, [fileName, groups]);

  return { download, status };
}
