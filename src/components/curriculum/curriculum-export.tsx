import { DownloadIcon, EyeIcon, Loader2Icon, Share2Icon } from "lucide-react";
import { m } from "motion/react";
import { PdfPreviewDialog } from "@/components/pdf-preview-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCurriculumPdfExport } from "@/hooks/use-curriculum-pdf-export";
import { useEntrance } from "@/hooks/use-entrance";
import { CURRICULUM_PDF_FILE_NAME } from "@/lib/curriculum/pdf";
import type { CurriculumYear } from "@/lib/curriculum/types";

interface CurriculumExportProps {
  years: CurriculumYear[];
}

export function CurriculumExport({ years }: CurriculumExportProps) {
  const entrance = useEntrance(0.1);
  const {
    canShare,
    handleDownload,
    handlePreview,
    handlePreviewOpenChange,
    handleShare,
    isPreviewOpen,
    pendingAction,
    previewBlob,
  } = useCurriculumPdfExport(years);
  const isBusy = Boolean(pendingAction);

  return (
    <m.div {...entrance}>
      <Card>
        <CardContent className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-0.5">
            <p className="font-head text-sm">Take the plan with you</p>
            <p className="text-muted-foreground text-xs">
              A PDF of every year, semester, course, and requirement.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              disabled={isBusy}
              onClick={handlePreview}
              size="sm"
              variant="outline"
            >
              {pendingAction === "preview" ? (
                <Loader2Icon
                  className="animate-spin"
                  data-icon="inline-start"
                />
              ) : (
                <EyeIcon data-icon="inline-start" />
              )}
              Preview
            </Button>
            {canShare ? (
              <Button
                disabled={isBusy}
                onClick={handleShare}
                size="sm"
                variant="outline"
              >
                <Share2Icon data-icon="inline-start" />
                Share
              </Button>
            ) : null}

            <Button disabled={isBusy} onClick={handleDownload} size="sm">
              {pendingAction === "download" ? (
                <Loader2Icon
                  className="animate-spin"
                  data-icon="inline-start"
                />
              ) : (
                <DownloadIcon data-icon="inline-start" />
              )}
              Download PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      <PdfPreviewDialog
        blob={previewBlob}
        fileName={CURRICULUM_PDF_FILE_NAME}
        onOpenChange={handlePreviewOpenChange}
        open={isPreviewOpen}
        title="Plan of Study"
      />
    </m.div>
  );
}
