import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { EDITOR_PATH } from "@/config/pdf-editor";
import { forgetLocalPdf } from "@/lib/pdf-editor/forget-local-pdf";
import { listLocalPdfs } from "@/lib/pdf-editor/local-pdf-store";
import type { LocalPdfMeta } from "@/lib/pdf-editor/types";

/** The PDFs kept on this device. Read again whenever the open file changes,
 * which is when one may have just been added. */
export function useLocalPdfList(activeId: string | null) {
  const navigate = useNavigate();
  const [files, setFiles] = useState<LocalPdfMeta[]>([]);

  const refresh = useCallback(async () => {
    try {
      setFiles(await listLocalPdfs());
    } catch {
      // A blocked store has nothing to list.
      setFiles([]);
    }
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: activeId only triggers a fresh read
  useEffect(() => {
    refresh();
  }, [activeId, refresh]);

  const remove = useCallback(
    async (id: string) => {
      await forgetLocalPdf(id);
      await refresh();
      if (id === activeId) {
        await navigate({ search: {}, to: EDITOR_PATH });
      }
    },
    [activeId, navigate, refresh]
  );

  return { files, remove };
}
