import { useCallback, useEffect, useState } from "react";
import {
  TUITION_CSV_FILE_NAME,
  TUITION_JSON_FILE_NAME,
  TUITION_PDF_FILE_NAME,
  TUITION_SHARE_TEXT,
  TUITION_SHARE_TITLE,
} from "@/config/tuition-export";
import { useExportTask } from "@/hooks/use-export-task";
import { usePdfPreview } from "@/hooks/use-pdf-preview";
import { canShareFile, downloadBlob } from "@/lib/gpa/export/download";
import { buildTuitionCsv } from "@/lib/tuition/export/csv";
import { buildTuitionExportPayload } from "@/lib/tuition/export/payload";
import { buildTuitionPdf } from "@/lib/tuition/export/pdf";
import type { TuitionScenario } from "@/lib/tuition/types";

type TuitionExportAction = "download" | "preview" | "share";
const PDF_TYPE = "application/pdf";

export function useTuitionExport(scenario: TuitionScenario) {
  const [canShare, setCanShare] = useState(false);
  const { error, pending, run } = useExportTask<TuitionExportAction>();
  const {
    blob: previewBlob,
    handleOpenChange: handlePreviewOpenChange,
    isOpen: isPreviewOpen,
    openPreview,
  } = usePdfPreview();

  useEffect(() => {
    setCanShare(canShareFile(TUITION_PDF_FILE_NAME, PDF_TYPE));
  }, []);

  const exportPdf = useCallback(
    (action: TuitionExportAction) =>
      run(action, async () => {
        const doc = await buildTuitionPdf(buildTuitionExportPayload(scenario));
        const blob = doc.output("blob");

        if (action === "preview") {
          openPreview(blob);
          return;
        }
        if (action === "download") {
          downloadBlob(blob, TUITION_PDF_FILE_NAME);
          return;
        }

        await navigator.share({
          files: [new File([blob], TUITION_PDF_FILE_NAME, { type: PDF_TYPE })],
          text: TUITION_SHARE_TEXT,
          title: TUITION_SHARE_TITLE,
        });
      }),
    [openPreview, scenario, run]
  );

  const exportCsv = useCallback(
    () =>
      run("download", () => {
        const csv = buildTuitionCsv(buildTuitionExportPayload(scenario));
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        downloadBlob(blob, TUITION_CSV_FILE_NAME);
      }),
    [scenario, run]
  );

  const exportJson = useCallback(
    () =>
      run("download", () => {
        const json = JSON.stringify(
          buildTuitionExportPayload(scenario),
          null,
          2
        );
        downloadBlob(
          new Blob([json], { type: "application/json" }),
          TUITION_JSON_FILE_NAME
        );
      }),
    [scenario, run]
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
