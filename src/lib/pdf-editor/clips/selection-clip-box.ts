import { CLIP_SELECTION_MARGIN } from "@/config/pdf-editor";
import { boxAroundBoxes } from "../annotation-box";
import type { Box, PageSize } from "../types";

/** The box a clip of selected lines takes: around all of them, with a small
 * margin, kept on the page. */
export function findSelectionClipBox(
  boxes: readonly Box[],
  size: PageSize
): Box {
  const around = boxAroundBoxes(boxes);
  const x = Math.max(0, around.x - CLIP_SELECTION_MARGIN);
  const y = Math.max(0, around.y - CLIP_SELECTION_MARGIN);
  const right = Math.min(
    size.width,
    around.x + around.width + CLIP_SELECTION_MARGIN
  );
  const bottom = Math.min(
    size.height,
    around.y + around.height + CLIP_SELECTION_MARGIN
  );
  return { height: bottom - y, width: right - x, x, y };
}
