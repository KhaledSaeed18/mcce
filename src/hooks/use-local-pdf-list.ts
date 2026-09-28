import { useCallback, useEffect, useState } from "react";
import { forgetLocalPdf } from "@/lib/pdf-editor/forget-local-pdf";
import { listLocalPdfs } from "@/lib/pdf-editor/local-pdf-store";
import type { LocalPdfMeta } from "@/lib/pdf-editor/types";

/** The PDFs kept on this device. Read again whenever the open file changes,
 * which is when one may have just been added. */
export function useLocalPdfList(
  activeId: string | null,
  onForget: (id: string) => void
) {
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
      // Closing its tab also moves on from it when it is the file on screen.
      onForget(id);
    },
    [onForget, refresh]
  );

  return { files, remove };
}
