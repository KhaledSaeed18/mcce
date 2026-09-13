import { PdfPreviewDialog } from "@/components/pdf-preview-dialog";
import { TuitionExportActions } from "@/components/tuition/tuition-export-actions";
import { TUITION_PDF_FILE_NAME } from "@/config/tuition-export";
import { useTuitionExport } from "@/hooks/use-tuition-export";
import type { TuitionScenario } from "@/lib/tuition/types";

interface TuitionExportPanelProps {
  scenario: TuitionScenario;
}

export function TuitionExportPanel({ scenario }: TuitionExportPanelProps) {
  const {
    canShare,
    error,
    exportCsv,
    exportJson,
    exportPdf,
    handlePreviewOpenChange,
    isPreviewOpen,
    pending,
    previewBlob,
  } = useTuitionExport(scenario);

  return (
    <div className="flex flex-col gap-3 rounded border-2 bg-card p-4">
      <div>
        <h3 className="font-head text-sm">Export</h3>
        <p className="mt-1 text-muted-foreground text-xs">
          This scenario as PDF, CSV, or JSON.
        </p>
      </div>

      <TuitionExportActions
        canShare={canShare}
        onCsv={exportCsv}
        onJson={exportJson}
        onPdf={exportPdf}
        pending={pending}
      />

      {error ? (
        <p className="text-destructive text-xs" role="alert">
          {error}
        </p>
      ) : null}

      <PdfPreviewDialog
        blob={previewBlob}
        fileName={TUITION_PDF_FILE_NAME}
        onOpenChange={handlePreviewOpenChange}
        open={isPreviewOpen}
        title="Tuition Scenario"
      />
    </div>
  );
}
