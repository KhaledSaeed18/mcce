import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { EDITOR_PATH } from "@/config/pdf-editor";
import { openSetClips } from "@/lib/pdf-editor/clips/clip-store";
import {
  openSavedSet,
  openSharedSet,
} from "@/lib/pdf-editor/study-set-opening";
import { readStudySets } from "@/lib/pdf-editor/study-sets";
import type {
  EditorTreeNode,
  OpenFile,
  PaneLock,
} from "@/lib/pdf-editor/types";

interface StudySetOpeningOptions {
  beside?: string;
  nodes: EditorTreeNode[];
  onLock: (lock: PaneLock) => void;
  onReplace: (files: OpenFile[]) => void;
  /** A shared link's files, by id. */
  set?: string;
  /** A set saved in this browser. */
  setId?: string;
}

/** A study set named in the URL, saved or shared, becomes the open tabs and
 * the panes it was laid out in. The URL is then swapped for the plain one of
 * those panes, so a reload does not open the set again over later changes. */
export function useStudySetOpening({
  beside,
  nodes,
  onLock,
  onReplace,
  set,
  setId,
}: StudySetOpeningOptions) {
  const navigate = useNavigate();
  // Copying a set's clips is not safe to repeat, and effects can run twice.
  const openedClipsRef = useRef<string | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: a set opens once, when the URL names it; later changes to what it opened are the reader's
  useEffect(() => {
    if (!(set || setId)) {
      openedClipsRef.current = null;
      return;
    }
    const saved = setId
      ? readStudySets().find((item) => item.id === setId)
      : undefined;
    const opening = saved
      ? openSavedSet(saved)
      : openSharedSet(nodes, set, beside);
    if (
      saved &&
      saved.clips.length > 0 &&
      openedClipsRef.current !== saved.id
    ) {
      openedClipsRef.current = saved.id;
      openSetClips(saved.clips).catch(() => undefined);
    }
    if (opening) {
      onReplace(opening.files);
      if (opening.lock) {
        onLock(opening.lock);
      }
    }
    navigate({
      replace: true,
      search: opening?.search ?? {},
      to: EDITOR_PATH,
    });
  }, [set, setId]);
}
