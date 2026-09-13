import { useCallback, useEffect, useState } from "react";
import {
  GPA_CSV_FILE_NAME,
  GPA_JSON_FILE_NAME,
  GPA_PDF_FILE_NAME,
  GPA_SHARE_TEXT,
  GPA_SHARE_TITLE,
} from "@/config/gpa-export";
import { useExportTask } from "@/hooks/use-export-task";
import { usePdfPreview } from "@/hooks/use-pdf-preview";
import { buildGradesCsv } from "@/lib/gpa/export/csv";
import { canShareFile, downloadBlob } from "@/lib/gpa/export/download";
import { buildExportPayload } from "@/lib/gpa/export/payload";
import { buildGpaPdf } from "@/lib/gpa/export/pdf";
import type {
  GpaExportAction,
  GpaExportSections,
} from "@/lib/gpa/export/types";

type PayloadInput = Parameters<typeof buildExportPayload>[0];
const PDF_TYPE = "application/pdf";

export function useGpaExport(input: PayloadInput, sections: GpaExportSections) {
  const [canShare, setCanShare] = useState(false);
  const { error, pending, run } = useExportTask<GpaExportAction>();
  const {
    blob: previewBlob,
    handleOpenChange: handlePreviewOpenChange,
    isOpen: isPreviewOpen,
    openPreview,
  } = usePdfPreview();

  useEffect(() => setCanShare(canShareFile(GPA_PDF_FILE_NAME, PDF_TYPE)), []);

  const exportPdf = useCallback(
    (action: GpaExportAction) =>
      run(action, async () => {
        const doc = await buildGpaPdf(buildExportPayload(input), sections);
        const blob = doc.output("blob");

        if (action === "preview") {
          openPreview(blob);
          return;
        }
        if (action === "download") {
          downloadBlob(blob, GPA_PDF_FILE_NAME);
          return;
        }
        await navigator.share({
          files: [new File([blob], GPA_PDF_FILE_NAME, { type: PDF_TYPE })],
          text: GPA_SHARE_TEXT,
          title: GPA_SHARE_TITLE,
        });
      }),
    [input, openPreview, run, sections]
  );

  const exportCsv = useCallback(
    () =>
      run("download", () => {
        const csv = buildGradesCsv(buildExportPayload(input));

        downloadBlob(
          new Blob([csv], { type: "text/csv;charset=utf-8" }),
          GPA_CSV_FILE_NAME
        );
      }),
    [input, run]
  );

  const exportJson = useCallback(
    () =>
      run("download", () => {
        const json = JSON.stringify(buildExportPayload(input), null, 2);

        downloadBlob(
          new Blob([json], { type: "application/json" }),
          GPA_JSON_FILE_NAME
        );
      }),
    [input, run]
  );

  return {
    canShare,
    error,
    exportCsv,
    exportJson,
    exportPdf,
    handlePreviewOpenChange,
    isPreviewOpen,
    pending,
    previewBlob,
  };
}
