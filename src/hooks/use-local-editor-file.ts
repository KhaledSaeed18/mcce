import { useEffect, useMemo, useState } from "react";
import { LOCAL_PDF_MISSING_NAME } from "@/config/pdf-editor";
import { readLocalPdfMeta } from "@/lib/pdf-editor/local-pdf-store";
import type { LocalEditorFile } from "@/lib/pdf-editor/types";

/** The file from this device the URL names. It is handed back at once so its
 * bytes start loading, and its name fills in once the browser has read it. */
export function useLocalEditorFile(
  localId: string | undefined
): LocalEditorFile | null {
  const [name, setName] = useState("");

  useEffect(() => {
    if (!localId) {
      return;
    }
    let isActive = true;
    readLocalPdfMeta(localId)
      .then((meta) => {
        if (isActive) {
          setName(meta?.name ?? LOCAL_PDF_MISSING_NAME);
        }
      })
      .catch(() => {
        if (isActive) {
          setName(LOCAL_PDF_MISSING_NAME);
        }
      });
    return () => {
      isActive = false;
    };
  }, [localId]);

  return useMemo(
    () => (localId ? { id: localId, name, source: "local" } : null),
    [localId, name]
  );
}
