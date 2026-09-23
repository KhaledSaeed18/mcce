import { useEffect, useState } from "react";
import type { EditorFile, FilePanelTab } from "@/lib/pdf-editor/types";

const TAB_BY_SOURCE: Record<EditorFile["source"], FilePanelTab> = {
  drive: "index",
  local: "device",
};

/** The file panel's tab, which follows the open file to the list it sits in.
 * With no file open it stays where it was, so removing a file from this
 * device leaves the reader looking at the rest of them. */
export function useFilePanelTab(source: EditorFile["source"] | null) {
  const [tab, setTab] = useState<FilePanelTab>(
    source ? TAB_BY_SOURCE[source] : "index"
  );

  useEffect(() => {
    if (source) {
      setTab(TAB_BY_SOURCE[source]);
    }
  }, [source]);

  return { setTab, tab };
}
