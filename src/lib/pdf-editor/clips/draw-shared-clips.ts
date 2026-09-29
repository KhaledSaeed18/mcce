import { borrowDocument } from "../borrow-document";
import { buildPageId } from "../pages";
import { drawClipPicture } from "./clip-picture";
import { saveClipPicture } from "./clip-picture-store";
import { placeNewClip } from "./clip-place";
import type { EditorClip, SharedClip } from "./types";

async function drawSharedClip(
  shared: SharedClip,
  placed: readonly EditorClip[]
): Promise<EditorClip | null> {
  const lease = borrowDocument(shared.file);
  try {
    const { doc } = await lease.opening;
    if (shared.sourceIndex >= doc.numPages) {
      return null;
    }
    const pageId = buildPageId(shared.sourceIndex);
    const page = {
      id: pageId,
      rotation: shared.rotation,
      sourceIndex: shared.sourceIndex,
    };
    const picture = await drawClipPicture({
      annotations: [],
      box: shared.box,
      doc,
      page,
    });
    const id = crypto.randomUUID();
    await saveClipPicture(id, picture.blob);
    return {
      aspect: picture.width / picture.height,
      box: shared.box,
      file: shared.file,
      id,
      isFolded: false,
      pageId,
      pageNumber: shared.sourceIndex + 1,
      place: placeNewClip(placed),
      rotation: shared.rotation,
      version: 0,
    };
  } finally {
    lease.release();
  }
}

/** Draws a shared link's clips from their files, one file at a time so no
 * more than one extra file is loaded, stacked as new cards are. A clip
 * whose file or page cannot be read is left out. */
export async function drawSharedClips(
  shared: readonly SharedClip[]
): Promise<EditorClip[]> {
  const clips: EditorClip[] = [];
  for (const item of shared) {
    // biome-ignore lint/performance/noAwaitInLoops: files are read one at a time so only one extra file is ever loaded
    const clip = await drawSharedClip(item, clips).catch(() => null);
    if (clip) {
      clips.push(clip);
    }
  }
  return clips;
}
