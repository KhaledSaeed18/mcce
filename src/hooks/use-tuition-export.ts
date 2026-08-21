import { useCallback, useEffect, useState } from "react";
import {
  TUITION_CSV_FILE_NAME,
  TUITION_JSON_FILE_NAME,
  TUITION_PDF_FILE_NAME,
  TUITION_SHARE_TEXT,
  TUITION_SHARE_TITLE,
} from "@/config/tuition-export";
import {
  canShareFile,
  downloadBlob,
  openBlob,
} from "@/lib/gpa/export/download";
import { buildTuitionCsv } from "@/lib/tuition/export/csv";
import { buildTuitionExportPayload } from "@/lib/tuition/export/payload";
import { buildTuitionPdf } from "@/lib/tuition/export/pdf";
import type { TuitionScenario } from "@/lib/tuition/types";

type TuitionExportAction = "download" | "preview" | "share";

const PDF_TYPE = "application/pdf";

export function useTuitionExport(scenario: TuitionScenario) {
  const [canShare, setCanShare] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<TuitionExportAction | null>(null);

  useEffect(() => {
    setCanShare(canShareFile(TUITION_PDF_FILE_NAME, PDF_TYPE));
  }, []);

  const run = useCallback(
    async (
      action: TuitionExportAction,
      task: () => Promise<void> | void
    ): Promise<void> => {
      setError(null);
      setPending(action);
      try {
        await task();
      } catch (cause) {
        if (!(cause instanceof DOMException && cause.name === "AbortError")) {
          setError("That export did not finish. Try again.");
        }
      } finally {
        setPending(null);
      }
    },
    []
  );

  const exportPdf = useCallback(
    (action: TuitionExportAction) =>
      run(action, async () => {
        const doc = await buildTuitionPdf(buildTuitionExportPayload(scenario));
        const blob = doc.output("blob");

        if (action === "preview") {
          openBlob(blob);
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
    [scenario, run]
  );

  const exportCsv = useCallback(
    () =>
      run("download", () => {
        const csv = buildTuitionCsv(buildTuitionExportPayload(scenario));

        downloadBlob(
          new Blob([csv], { type: "text/csv;charset=utf-8" }),
          TUITION_CSV_FILE_NAME
        );
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

  return { canShare, error, exportCsv, exportJson, exportPdf, pending };
}
