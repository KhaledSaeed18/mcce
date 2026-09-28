import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { EDITOR_PATH } from "@/config/pdf-editor";
import { showFile } from "@/lib/pdf-editor/desk";
import { closeFile, forgetFile } from "@/lib/pdf-editor/desk-close";
import { findNextFile, moveFile } from "@/lib/pdf-editor/desk-order";
import { readDesk, writeDesk } from "@/lib/pdf-editor/desk-storage";
import { closePaneShowing } from "@/lib/pdf-editor/pane-layout";
import { placeFile } from "@/lib/pdf-editor/pane-search";
import type { EditorFile, OpenFile } from "@/lib/pdf-editor/types";

function toOpenFile(file: EditorFile): OpenFile {
  return { id: file.id, name: file.name, source: file.source };
}

/** The files open as tabs. The URL still says which are shown, so opening a
 * file anywhere, from the file panel or a shared link, gives it a tab. The
 * file in the pane with focus is the one most recently shown. */
export function useEditorDesk(
  focused: EditorFile | null,
  other: EditorFile | null
) {
  const navigate = useNavigate();
  // The workspace only renders in the browser, so storage can be read at once.
  const [desk, setDesk] = useState(readDesk);
  const activeId = focused?.id;
  const otherId = other?.id;

  useEffect(() => {
    setDesk((current) =>
      [other, focused].reduce(
        (next, file) => (file ? showFile(next, toOpenFile(file)) : next),
        current
      )
    );
  }, [focused, other]);

  useEffect(() => writeDesk(desk), [desk]);

  /** Shows a file in the pane with focus, or the blank editor for none. */
  const show = useCallback(
    (file: OpenFile | null) =>
      navigate({
        from: EDITOR_PATH,
        search: (search) => (file ? placeFile(search, file) : {}),
        to: EDITOR_PATH,
      }),
    [navigate]
  );

  /** Moves off a file on screen before its tab goes: in a split its pane
   * closes, and on its own the file seen before it takes its place. */
  const leave = useCallback(
    (id: string) => {
      if (otherId && (id === activeId || id === otherId)) {
        navigate({
          from: EDITOR_PATH,
          search: (search) => closePaneShowing(search, id),
          to: EDITOR_PATH,
        });
      } else if (id === activeId) {
        show(findNextFile(desk, id));
      }
    },
    [activeId, desk, navigate, otherId, show]
  );

  const close = useCallback(
    (id: string) => {
      leave(id);
      setDesk((current) => closeFile(current, id));
    },
    [leave]
  );

  const forget = useCallback(
    (id: string) => {
      leave(id);
      setDesk((current) => forgetFile(current, id));
    },
    [leave]
  );

  const move = useCallback(
    (from: number, to: number) =>
      setDesk((current) => moveFile(current, from, to)),
    []
  );

  return { activeId, close, desk, forget, move, show };
}
