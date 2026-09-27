import { useCallback, useMemo, useState } from "react";
import {
  isEveryCoverRevealed,
  listCoverIds,
  toggleRevealed,
} from "@/lib/pdf-editor/cover-reveal";
import type { Annotation } from "@/lib/pdf-editor/types";

interface RevealState {
  fileId: string | undefined;
  revealed: ReadonlySet<string>;
}

const NONE_REVEALED: ReadonlySet<string> = new Set();

/**
 * Which answer covers the reader has looked under. It lasts only as long as
 * the file is open: every cover is hidden again the next time, so a page can
 * be tried afresh. A newly drawn cover starts out hidden.
 */
export function useCoverReveal(
  fileId: string | undefined,
  annotations: Annotation[]
) {
  const [state, setState] = useState<RevealState>({
    fileId,
    revealed: NONE_REVEALED,
  });
  const revealed = state.fileId === fileId ? state.revealed : NONE_REVEALED;
  const coverIds = useMemo(() => listCoverIds(annotations), [annotations]);
  const isAllRevealed = isEveryCoverRevealed(coverIds, revealed);

  const toggle = useCallback(
    (id: string) => {
      if (coverIds.includes(id)) {
        setState({ fileId, revealed: toggleRevealed(revealed, id) });
      }
    },
    [coverIds, fileId, revealed]
  );

  const toggleAll = useCallback(
    () =>
      setState({
        fileId,
        revealed: isAllRevealed ? NONE_REVEALED : new Set(coverIds),
      }),
    [coverIds, fileId, isAllRevealed]
  );

  return {
    hasCovers: coverIds.length > 0,
    isAllRevealed,
    revealed,
    toggle,
    toggleAll,
  };
}

export type CoverControls = ReturnType<typeof useCoverReveal>;
