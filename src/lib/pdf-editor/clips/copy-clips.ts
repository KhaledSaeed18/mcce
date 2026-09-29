import { copyClipPictures, removeClipPictures } from "./clip-picture-store";
import type { EditorClip } from "./types";

/** Copies of the clips under new ids, each with its own copy of the
 * picture, so closing one never takes the other's picture with it. */
export async function copyClips(
  clips: readonly EditorClip[]
): Promise<EditorClip[]> {
  const copies = clips.map((clip) => ({ ...clip, id: crypto.randomUUID() }));
  if (copies.length > 0) {
    await copyClipPictures(
      clips.map((clip, index) => [clip.id, copies[index].id])
    );
  }
  return copies;
}

/** Lets go of the pictures of clips nothing shows any more. */
export function dropClipPictures(clips: readonly EditorClip[]): void {
  if (clips.length > 0) {
    removeClipPictures(clips.map((clip) => clip.id)).catch(() => undefined);
  }
}
