import { useCallback, useEffect, useState } from "react";
import {
  buildCurriculumPdf,
  CURRICULUM_PDF_FILE_NAME,
} from "@/lib/curriculum/pdf";
import type { CurriculumYear } from "@/lib/curriculum/types";

export type CurriculumPdfAction = "download" | "preview" | "share";

const SHARE_TITLE = "MCCE Plan of Study";
const SHARE_TEXT =
  "MCCE program courses by year and semester, with prerequisites and corequisites.";
const PREVIEW_URL_TTL_MS = 60_000;

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
      const url = URL.createObjectURL(doc.output("blob"));
      window.open(url, "_blank", "noopener");
      setTimeout(() => URL.revokeObjectURL(url), PREVIEW_URL_TTL_MS);
    } finally {
      setPendingAction(null);
    }
  }, [years]);

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
    handleShare,
    pendingAction,
  };
}
