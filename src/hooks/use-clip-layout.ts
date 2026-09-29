import { useMemo } from "react";
import {
  type ClipLayout,
  layOutClips,
} from "@/lib/pdf-editor/clips/clip-layout";
import type { EditorClip } from "@/lib/pdf-editor/clips/types";
import type { PageSize } from "@/lib/pdf-editor/types";

const NO_AREA: PageSize = { height: 0, width: 0 };

/** Where the cards sit over the pages, laid out again whenever the pages
 * change size, so each keeps its corner. */
export function useClipLayout(
  clips: readonly EditorClip[],
  area: PageSize | null
): ClipLayout {
  return useMemo(() => layOutClips(clips, area ?? NO_AREA), [area, clips]);
}
