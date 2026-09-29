import { addClip, type ClipDeskChange, closeClip } from "./clip-desk";
import type { ClipDesk, EditorClip } from "./types";

/** Puts a set's clips on screen in place of the ones there, which go to
 * the recently closed list, as a set's tabs replace the open ones. */
export function replaceClips(
  desk: ClipDesk,
  clips: readonly EditorClip[]
): ClipDeskChange {
  let next = desk;
  const dropped: string[] = [];
  const steps = [
    ...desk.clips.map(
      (clip) => (current: ClipDesk) => closeClip(current, clip.id)
    ),
    ...clips.map((clip) => (current: ClipDesk) => addClip(current, clip)),
  ];
  for (const step of steps) {
    const change = step(next);
    next = change.desk;
    dropped.push(...change.dropped);
  }
  return { desk: next, dropped };
}
