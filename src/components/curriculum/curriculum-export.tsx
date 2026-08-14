import { DownloadIcon, EyeIcon, Loader2Icon, Share2Icon } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCurriculumPdfExport } from "@/hooks/use-curriculum-pdf-export";
import type { CurriculumYear } from "@/lib/curriculum/types";

interface CurriculumExportProps {
  years: CurriculumYear[];
}

export function CurriculumExport({ years }: CurriculumExportProps) {
  const {
    canShare,
    handleDownload,
    handlePreview,
    handleShare,
    pendingAction,
  } = useCurriculumPdfExport(years);
  const isBusy = Boolean(pendingAction);

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 12 }}
      transition={{ delay: 0.1, duration: 0.4 }}
    >
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
    </motion.div>
  );
}
