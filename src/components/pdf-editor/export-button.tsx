import { DownloadIcon, LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EDITOR_CONTROL_HEIGHT_CLASS } from "@/config/pdf-editor";
import type { PdfExportStatus } from "@/hooks/use-pdf-export";

interface ExportButtonProps {
  onExport: () => void;
  status: PdfExportStatus;
}

/** Building the copy can fail, and a download that never arrives has to say so. */
export function ExportButton({ onExport, status }: ExportButtonProps) {
  return (
    <div className="ml-auto flex items-center gap-2">
      {status === "error" ? (
        <span className="font-head text-destructive text-sm" role="alert">
          The copy could not be built
        </span>
      ) : null}
      <Button
        className={EDITOR_CONTROL_HEIGHT_CLASS}
        disabled={status === "working"}
        onClick={onExport}
      >
        {status === "working" ? (
          <LoaderIcon className="animate-spin" data-icon="inline-start" />
        ) : (
          <DownloadIcon data-icon="inline-start" />
        )}
        Download copy
      </Button>
    </div>
  );
}
