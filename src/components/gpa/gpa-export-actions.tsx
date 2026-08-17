import {
  DownloadIcon,
  EyeIcon,
  FileJsonIcon,
  Loader2Icon,
  Share2Icon,
  SheetIcon,
} from "lucide-react";
import { type ReactNode, useCallback } from "react";
import { Button } from "@/components/ui/button";
import type { GpaExportAction } from "@/lib/gpa/export/types";

interface GpaExportActionsProps {
  canShare: boolean;
  /** Extra actions that belong on the same row, such as the copy-link button. */
  children?: ReactNode;
  isDisabled: boolean;
  onCsv: () => void;
  onJson: () => void;
  onPdf: (action: GpaExportAction) => void;
  pending: GpaExportAction | null;
}

export function GpaExportActions({
  canShare,
  children,
  isDisabled,
  onCsv,
  onJson,
  onPdf,
  pending,
}: GpaExportActionsProps) {
  const isBusy = pending !== null;
  const handlePreview = useCallback(() => onPdf("preview"), [onPdf]);
  const handleShare = useCallback(() => onPdf("share"), [onPdf]);
  const handleDownload = useCallback(() => onPdf("download"), [onPdf]);

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        disabled={isBusy || isDisabled}
        onClick={handlePreview}
        size="sm"
        variant="outline"
      >
        {pending === "preview" ? (
          <Loader2Icon className="animate-spin" data-icon="inline-start" />
        ) : (
          <EyeIcon data-icon="inline-start" />
        )}
        Preview
      </Button>

      {canShare ? (
        <Button
          disabled={isBusy || isDisabled}
          onClick={handleShare}
          size="sm"
          variant="outline"
        >
          <Share2Icon data-icon="inline-start" />
          Share
        </Button>
      ) : null}

      <Button disabled={isBusy} onClick={onCsv} size="sm" variant="outline">
        <SheetIcon data-icon="inline-start" />
        CSV
      </Button>

      <Button disabled={isBusy} onClick={onJson} size="sm" variant="outline">
        <FileJsonIcon data-icon="inline-start" />
        JSON
      </Button>

      <Button
        disabled={isBusy || isDisabled}
        onClick={handleDownload}
        size="sm"
      >
        {pending === "download" ? (
          <Loader2Icon className="animate-spin" data-icon="inline-start" />
        ) : (
          <DownloadIcon data-icon="inline-start" />
        )}
        Download PDF
      </Button>

      {children}
    </div>
  );
}
