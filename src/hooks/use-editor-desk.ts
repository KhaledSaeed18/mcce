import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { EDITOR_PATH } from "@/config/pdf-editor";
import { closeFile, showFile } from "@/lib/pdf-editor/desk";
import { findNextFile, moveFile } from "@/lib/pdf-editor/desk-order";
import { readDesk, writeDesk } from "@/lib/pdf-editor/desk-storage";
import { buildEditorSearch } from "@/lib/pdf-editor/editor-search";
import type { EditorFile, OpenFile } from "@/lib/pdf-editor/types";

/** The files open as tabs. The URL still says which one is shown, so opening
 * a file anywhere, from the file panel or a shared link, gives it a tab. */
export function useEditorDesk(activeFile: EditorFile | null) {
  const navigate = useNavigate();
  // The workspace only renders in the browser, so storage can be read at once.
  const [desk, setDesk] = useState(readDesk);
  const activeId = activeFile?.id;
  const activeName = activeFile?.name ?? "";
  const activeSource = activeFile?.source;

  useEffect(() => {
    if (activeId && activeSource) {
      setDesk((current) =>
        showFile(current, {
          id: activeId,
          name: activeName,
          source: activeSource,
        })
      );
    }
  }, [activeId, activeName, activeSource]);

  useEffect(() => writeDesk(desk), [desk]);

  /** Shows a file, or the blank editor for none. */
  const show = useCallback(
    (file: OpenFile | null) =>
      navigate({
        search: file ? buildEditorSearch(file) : {},
        to: EDITOR_PATH,
      }),
    [navigate]
  );

  const close = useCallback(
    (id: string) => {
      if (id === activeId) {
        show(findNextFile(desk, id));
      }
      setDesk((current) => closeFile(current, id));
    },
    [activeId, desk, show]
  );

  const move = useCallback(
    (from: number, to: number) =>
      setDesk((current) => moveFile(current, from, to)),
    []
  );

  return { activeId, close, desk, move, show };
}
