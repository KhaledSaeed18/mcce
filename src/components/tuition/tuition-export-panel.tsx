import { TuitionExportActions } from "@/components/tuition/tuition-export-actions";
import { useTuitionExport } from "@/hooks/use-tuition-export";
import type { TuitionScenario } from "@/lib/tuition/types";

interface TuitionExportPanelProps {
  scenario: TuitionScenario;
}

export function TuitionExportPanel({ scenario }: TuitionExportPanelProps) {
  const { canShare, error, exportCsv, exportJson, exportPdf, pending } =
    useTuitionExport(scenario);

  return (
    <div className="flex flex-col gap-3 rounded border-2 bg-card p-4">
      <p className="text-muted-foreground text-sm">
        Export this scenario as PDF, CSV, or JSON.
      </p>

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
    </div>
  );
}
