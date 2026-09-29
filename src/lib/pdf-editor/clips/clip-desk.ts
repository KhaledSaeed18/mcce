import { CLIP_CLOSED_LIMIT, CLIP_LIMIT } from "@/config/pdf-editor";
import type { ClipDesk, EditorClip } from "./types";

export const EMPTY_CLIP_DESK: ClipDesk = {
  closed: [],
  clips: [],
  isHidden: false,
};

/** A change to the clips, and the clips whose pictures can now go. */
export interface ClipDeskChange {
  desk: ClipDesk;
  dropped: string[];
}

function keepClosed(desk: ClipDesk, closed: EditorClip[]): ClipDeskChange {
  return {
    desk: { ...desk, closed: closed.slice(0, CLIP_CLOSED_LIMIT) },
    dropped: closed.slice(CLIP_CLOSED_LIMIT).map((clip) => clip.id),
  };
}

/** A new clip goes on top, and shows even if clips were hidden. Past the
 * limit, the oldest on screen is closed. */
export function addClip(desk: ClipDesk, clip: EditorClip): ClipDeskChange {
  const clips = [...desk.clips, clip];
  const over = clips.slice(0, Math.max(0, clips.length - CLIP_LIMIT));
  return keepClosed(
    { ...desk, clips: clips.slice(over.length), isHidden: false },
    [...over.reverse(), ...desk.closed]
  );
}

export function closeClip(desk: ClipDesk, id: string): ClipDeskChange {
  const clip = desk.clips.find((item) => item.id === id);
  if (!clip) {
    return { desk, dropped: [] };
  }
  const clips = desk.clips.filter((item) => item.id !== id);
  return keepClosed({ ...desk, clips }, [clip, ...desk.closed]);
}

/** Brings a closed clip back where it was, on top. */
export function reopenClip(desk: ClipDesk, id: string): ClipDeskChange {
  const clip = desk.closed.find((item) => item.id === id);
  if (!clip) {
    return { desk, dropped: [] };
  }
  const closed = desk.closed.filter((item) => item.id !== id);
  return addClip({ ...desk, closed }, { ...clip, isFolded: false });
}

/** Changes one clip on screen, and brings it to the top. */
export function changeClip(
  desk: ClipDesk,
  id: string,
  change: Partial<EditorClip>
): ClipDesk {
  const clip = desk.clips.find((item) => item.id === id);
  if (!clip) {
    return desk;
  }
  const others = desk.clips.filter((item) => item.id !== id);
  return { ...desk, clips: [...others, { ...clip, ...change }] };
}
