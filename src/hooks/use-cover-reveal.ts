import { useCallback, useEffect, useMemo, useState } from "react";
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
 * be tried afresh. A newly drawn cover starts out hidden. While locked, as in
 * an exam, every answer stays covered.
 */
export function useCoverReveal(
  fileId: string | undefined,
  annotations: Annotation[],
  isLocked: boolean
) {
  const [state, setState] = useState<RevealState>({
    fileId,
    revealed: NONE_REVEALED,
  });
  const isOwnState = state.fileId === fileId && !isLocked;
  const revealed = isOwnState ? state.revealed : NONE_REVEALED;
  const coverIds = useMemo(() => listCoverIds(annotations), [annotations]);
  const isAllRevealed = isEveryCoverRevealed(coverIds, revealed);

  const toggle = useCallback(
    (id: string) => {
      if (!isLocked && coverIds.includes(id)) {
        setState({ fileId, revealed: toggleRevealed(revealed, id) });
      }
    },
    [coverIds, fileId, isLocked, revealed]
  );

  // Locking covers everything, so what was looked under before is hidden
  // again once the lock comes off.
  useEffect(() => {
    if (isLocked) {
      setState({ fileId, revealed: NONE_REVEALED });
    }
  }, [fileId, isLocked]);

  const toggleAll = useCallback(() => {
    if (isLocked) {
      return;
    }
    setState({
      fileId,
      revealed: isAllRevealed ? NONE_REVEALED : new Set(coverIds),
    });
  }, [coverIds, fileId, isAllRevealed, isLocked]);

  return {
    hasCovers: coverIds.length > 0,
    isAllRevealed,
    isLocked,
    revealed,
    toggle,
    toggleAll,
  };
}

export type CoverControls = ReturnType<typeof useCoverReveal>;
