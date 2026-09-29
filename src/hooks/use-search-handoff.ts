import { useCallback, useEffect, useState } from "react";
import type { EditorPaneView } from "@/hooks/use-editor-panes";
import type { FileSearchPick } from "@/lib/pdf-editor/file-search/types";
import type { OpenFile } from "@/lib/pdf-editor/types";

interface SearchHandoffOptions {
  onOpenBeside: (file: OpenFile) => void;
  onShow: (file: OpenFile) => void;
  panes: EditorPaneView[];
}

/** Opens a match picked in search across files, in the pane with focus or
 * beside it, and hands the query and match to that pane's own search bar
 * once the file is in it. */
export function useSearchHandoff({
  onOpenBeside,
  onShow,
  panes,
}: SearchHandoffOptions) {
  const [pick, setPick] = useState<FileSearchPick | null>(null);
  const pane = pick
    ? panes.find((item) => item.node?.id === pick.fileId && item.session.doc)
    : undefined;
  const showMatch = pane?.session.search.showMatch;

  useEffect(() => {
    if (pick && showMatch) {
      setPick(null);
      showMatch(pick.query, pick.matchIndex);
    }
  }, [pick, showMatch]);

  return useCallback(
    (file: OpenFile, nextPick: FileSearchPick, isBeside: boolean) => {
      setPick(nextPick);
      (isBeside ? onOpenBeside : onShow)(file);
    },
    [onOpenBeside, onShow]
  );
}
