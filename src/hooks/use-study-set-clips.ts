import { useEffect, useRef } from "react";
import { readClipLink } from "@/lib/pdf-editor/clips/clip-link";
import {
  openSetClips,
  openSharedClips,
} from "@/lib/pdf-editor/clips/clip-store";
import { readStudySets } from "@/lib/pdf-editor/study-sets";
import type { EditorTreeNode } from "@/lib/pdf-editor/types";

interface StudySetClipsOptions {
  /** A shared link's clips, drawn from their files. */
  clips?: string;
  nodes: EditorTreeNode[];
  /** A set saved in this browser. */
  setId?: string;
}

/** The clips of a study set named in the URL take the place of the clips
 * on screen. A set with no clips leaves those as they are. */
export function useStudySetClips({
  clips,
  nodes,
  setId,
}: StudySetClipsOptions) {
  // Copying or drawing clips is not safe to repeat, and effects can run twice.
  const openedRef = useRef<string | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: a set's clips open once, when the URL names them
  useEffect(() => {
    const saved = setId
      ? readStudySets().find((item) => item.id === setId)
      : undefined;
    const key = saved?.id ?? clips ?? null;
    const hasClips = saved ? saved.clips.length > 0 : Boolean(clips);
    if (!(hasClips && key) || openedRef.current === key) {
      openedRef.current = key;
      return;
    }
    openedRef.current = key;
    const showing = saved
      ? openSetClips(saved.clips)
      : openSharedClips(readClipLink(clips, nodes));
    showing.catch(() => undefined);
  }, [clips, setId]);
}
