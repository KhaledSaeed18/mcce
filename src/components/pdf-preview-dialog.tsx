import { DownloadIcon, ExternalLinkIcon, Share2Icon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { canShareFile, downloadBlob } from "@/lib/gpa/export/download";

interface PdfPreviewDialogProps {
  blob: Blob | null;
  fileName: string;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  title: string;
}

const PDF_MIME_TYPE = "application/pdf";

export function PdfPreviewDialog({
  blob,
  fileName,
  onOpenChange,
  open,
  title,
}: PdfPreviewDialogProps) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!(open && blob)) {
      setUrl(null);
      return;
    }
    const nextUrl = URL.createObjectURL(blob);
    setUrl(nextUrl);
    return () => {
      URL.revokeObjectURL(nextUrl);
    };
  }, [blob, open]);

  const canShare = useMemo(
    () => (blob ? canShareFile(fileName, PDF_MIME_TYPE) : false),
    [blob, fileName]
  );

  const handleDownload = useCallback(() => {
    if (blob) {
      downloadBlob(blob, fileName);
    }
  }, [blob, fileName]);

  const handleShare = useCallback(async () => {
    if (!(blob && navigator.share)) {
      return;
    }
    try {
      await navigator.share({
        files: [new File([blob], fileName, { type: PDF_MIME_TYPE })],
        title,
      });
    } catch {
      // User dismissed the share sheet or browser blocked it.
    }
  }, [blob, fileName, title]);

  const handleOpenInNewTab = useCallback(() => {
    if (url) {
      window.open(url, "_blank", "noopener");
    }
  }, [url]);

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="flex h-[85vh] flex-col sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="truncate">{title}</DialogTitle>
        </DialogHeader>

        <div className="relative min-h-0 flex-1 overflow-hidden rounded border-2 bg-muted/20">
          {url ? (
            <iframe
              className="size-full border-0"
              src={url}
              title={`${title} preview`}
            />
          ) : null}
        </div>

        <DialogFooter className="flex-wrap gap-2">
          {canShare ? (
            <Button onClick={handleShare} variant="outline">
              <Share2Icon data-icon="inline-start" />
              Share
            </Button>
          ) : null}
          {url ? (
            <Button onClick={handleOpenInNewTab} variant="outline">
              <ExternalLinkIcon data-icon="inline-start" />
              Open in new tab
            </Button>
          ) : null}
          <Button onClick={handleDownload}>
            <DownloadIcon data-icon="inline-start" />
            Download PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
