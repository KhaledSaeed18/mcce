import { useCallback, useEffect, useState } from "react";
import {
  buildCurriculumPdf,
  CURRICULUM_PDF_FILE_NAME,
} from "@/lib/curriculum/pdf";
import type { CurriculumYear } from "@/lib/curriculum/types";

const SHARE_TITLE = "MCCE Plan of Study";
const SHARE_TEXT =
  "MCCE program courses by year and semester, with prerequisites and corequisites.";

function canShareFiles(): boolean {
  if (typeof navigator === "undefined" || !navigator.canShare) {
    return false;
  }
  const probe = new File([""], CURRICULUM_PDF_FILE_NAME, {
    type: "application/pdf",
  });
  return navigator.canShare({ files: [probe] });
}

export function useCurriculumPdfExport(years: CurriculumYear[]) {
  const [canShare, setCanShare] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setCanShare(canShareFiles());
  }, []);

  const handleDownload = useCallback(async () => {
    setIsGenerating(true);
    try {
      const doc = await buildCurriculumPdf(years);
      doc.save(CURRICULUM_PDF_FILE_NAME);
    } finally {
      setIsGenerating(false);
    }
  }, [years]);

  const handleShare = useCallback(async () => {
    setIsGenerating(true);
    try {
      const doc = await buildCurriculumPdf(years);
      const file = new File([doc.output("blob")], CURRICULUM_PDF_FILE_NAME, {
        type: "application/pdf",
      });
      await navigator.share({
        files: [file],
        text: SHARE_TEXT,
        title: SHARE_TITLE,
      });
    } catch {
      // User cancelled the share sheet, or the browser rejected it. Nothing to recover.
    } finally {
      setIsGenerating(false);
    }
  }, [years]);

  return { canShare, handleDownload, handleShare, isGenerating };
}
