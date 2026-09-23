import { useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import {
  EDITOR_PATH,
  LOCAL_PDF_PROBLEM_COPY,
  LOCAL_PDF_SAVE_FAILED,
  PDF_HEADER_SEARCH_BYTES,
} from "@/config/pdf-editor";
import { checkLocalPdf } from "@/lib/pdf-editor/local-pdf-check";
import { buildLocalPdfId } from "@/lib/pdf-editor/local-pdf-id";
import { saveLocalPdf } from "@/lib/pdf-editor/local-pdf-store";

/** Takes a PDF from the reader's computer, keeps it in this browser, and opens it. */
export function useOpenLocalPdf() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isOpening, setIsOpening] = useState(false);

  const openFile = useCallback(
    async (file: File) => {
      setError(null);
      // Checked on the header alone first, so a large wrong file is never read whole.
      const head = await file.slice(0, PDF_HEADER_SEARCH_BYTES).arrayBuffer();
      const problem = checkLocalPdf(file.size, head);
      if (problem) {
        setError(LOCAL_PDF_PROBLEM_COPY[problem]);
        return;
      }
      setIsOpening(true);
      try {
        const bytes = await file.arrayBuffer();
        const id = await buildLocalPdfId(bytes);
        await saveLocalPdf(
          {
            addedAt: new Date().toISOString(),
            id,
            name: file.name,
            size: file.size,
          },
          bytes
        );
        await navigate({ search: { local: id }, to: EDITOR_PATH });
      } catch {
        setError(LOCAL_PDF_SAVE_FAILED);
      } finally {
        setIsOpening(false);
      }
    },
    [navigate]
  );

  return { error, isOpening, openFile };
}
