import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { EDITOR_PATH } from "@/config/pdf-editor";
import { closePane, focusPane, swapPanes } from "@/lib/pdf-editor/pane-layout";
import { openInOtherPane, placeFileOnSide } from "@/lib/pdf-editor/pane-search";
import type {
  EditorPaneSide,
  EditorSearch,
  OpenFile,
} from "@/lib/pdf-editor/types";

/** Changes to the panes, made through the URL so reloading, going back, and
 * sharing a link all keep the split. */
export function usePaneActions() {
  const navigate = useNavigate();

  const update = useCallback(
    (change: (search: EditorSearch) => EditorSearch, replace = false) =>
      navigate({ from: EDITOR_PATH, replace, search: change, to: EDITOR_PATH }),
    [navigate]
  );

  // Moving focus is not a step worth going back through.
  const focus = useCallback(
    (side: EditorPaneSide) => update((search) => focusPane(search, side), true),
    [update]
  );

  const close = useCallback(
    (side: EditorPaneSide) => update((search) => closePane(search, side)),
    [update]
  );

  const openBeside = useCallback(
    (file: OpenFile) => update((search) => openInOtherPane(search, file)),
    [update]
  );

  const place = useCallback(
    (file: Pick<OpenFile, "id" | "source">, side: EditorPaneSide) =>
      update((search) => placeFileOnSide(search, file, side)),
    [update]
  );

  const swap = useCallback(() => update(swapPanes), [update]);

  return { close, focus, openBeside, place, swap };
}
