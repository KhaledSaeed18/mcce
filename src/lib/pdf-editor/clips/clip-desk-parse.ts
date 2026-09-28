import { EMPTY_CLIP_DESK } from "./clip-desk";
import { parseClip } from "./clip-parse";
import type { ClipDesk, EditorClip } from "./types";

/** The clips that hold together, in the order they were stored. */
export function parseClips(value: unknown): EditorClip[] {
  return Array.isArray(value)
    ? value.flatMap((item) => {
        const clip = parseClip(item);
        return clip ? [clip] : [];
      })
    : [];
}

/** Whatever was stored comes back as clips the editor can trust. */
export function parseClipDesk(value: unknown): ClipDesk {
  if (typeof value !== "object" || value === null) {
    return EMPTY_CLIP_DESK;
  }
  const stored = value as Record<string, unknown>;
  return {
    closed: parseClips(stored.closed),
    clips: parseClips(stored.clips),
    isHidden: stored.isHidden === true,
  };
}
