import {
  CLIP_LINK_PART_SEPARATOR,
  CLIP_LINK_SEPARATOR,
} from "@/config/pdf-editor";
import type { EditorClip } from "./types";

const OWN_PAGE_ID = /^p(\d+)$/;

/** The clips a link can carry: from index files, on pages the file came
 * with. Files from this device and pages put in by the reader stay here.
 * A turn is added only when the page was turned. */
export function writeClipLink(
  clips: readonly EditorClip[]
): string | undefined {
  const parts = clips.flatMap((clip) => {
    const page = OWN_PAGE_ID.exec(clip.pageId);
    if (clip.file.source !== "drive" || !page) {
      return [];
    }
    const { height, width, x, y } = clip.box;
    const numbers = [page[1], x, y, width, height].map((n) =>
      Math.round(Number(n))
    );
    const turn = clip.rotation === 0 ? [] : [clip.rotation];
    return [[clip.file.id, ...numbers, ...turn].join(CLIP_LINK_PART_SEPARATOR)];
  });
  return parts.length > 0 ? parts.join(CLIP_LINK_SEPARATOR) : undefined;
}
