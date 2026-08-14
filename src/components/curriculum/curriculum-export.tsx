import { DownloadIcon, Loader2Icon, Share2Icon } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCurriculumPdfExport } from "@/hooks/use-curriculum-pdf-export";
import type { CurriculumYear } from "@/lib/curriculum/types";

interface CurriculumExportProps {
  years: CurriculumYear[];
}

export function CurriculumExport({ years }: CurriculumExportProps) {
  const { canShare, handleDownload, handleShare, isGenerating } =
    useCurriculumPdfExport(years);

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
              disabled={isGenerating}
              onClick={handleDownload}
              size="sm"
              variant="outline"
            >
              {isGenerating ? (
                <Loader2Icon
                  className="animate-spin"
                  data-icon="inline-start"
                />
              ) : (
                <DownloadIcon data-icon="inline-start" />
              )}
              Download PDF
            </Button>

            {canShare ? (
              <Button disabled={isGenerating} onClick={handleShare} size="sm">
                <Share2Icon data-icon="inline-start" />
                Share
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
