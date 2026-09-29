import type { ClipDeskChange } from "./clip-desk";
import type { ClipDesk } from "./types";

/** For a file taken off this device: its clips go, on screen and closed,
 * and their pictures with them. */
export function forgetFileClips(
  desk: ClipDesk,
  fileId: string
): ClipDeskChange {
  const isKept = (clip: { file: { id: string } }) => clip.file.id !== fileId;
  const dropped = [...desk.clips, ...desk.closed]
    .filter((clip) => !isKept(clip))
    .map((clip) => clip.id);
  return {
    desk: {
      ...desk,
      closed: desk.closed.filter(isKept),
      clips: desk.clips.filter(isKept),
    },
    dropped,
  };
}
