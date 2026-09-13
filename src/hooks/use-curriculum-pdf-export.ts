import { useCallback, useEffect, useState } from "react";
import { usePdfPreview } from "@/hooks/use-pdf-preview";
import {
  buildCurriculumPdf,
  CURRICULUM_PDF_FILE_NAME,
} from "@/lib/curriculum/pdf";
import type { CurriculumYear } from "@/lib/curriculum/types";

export type CurriculumPdfAction = "download" | "preview" | "share";

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
  const [pendingAction, setPendingAction] =
    useState<CurriculumPdfAction | null>(null);
  const {
    blob: previewBlob,
    handleOpenChange: handlePreviewOpenChange,
    isOpen: isPreviewOpen,
    openPreview,
  } = usePdfPreview();

  useEffect(() => {
    setCanShare(canShareFiles());
  }, []);

  const handleDownload = useCallback(async () => {
    setPendingAction("download");
    try {
      const doc = await buildCurriculumPdf(years);
      doc.save(CURRICULUM_PDF_FILE_NAME);
    } finally {
      setPendingAction(null);
    }
  }, [years]);

  const handlePreview = useCallback(async () => {
    setPendingAction("preview");
    try {
      const doc = await buildCurriculumPdf(years);
      openPreview(doc.output("blob"));
    } finally {
      setPendingAction(null);
    }
  }, [openPreview, years]);

  const handleShare = useCallback(async () => {
    setPendingAction("share");
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
      setPendingAction(null);
    }
  }, [years]);

  return {
    canShare,
    handleDownload,
    handlePreview,
    handlePreviewOpenChange,
    handleShare,
    isPreviewOpen,
    pendingAction,
    previewBlob,
  };
}
