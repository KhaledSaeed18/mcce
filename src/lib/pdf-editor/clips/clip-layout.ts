import { CLIP_FOLD_ROW_HEIGHT } from "@/config/pdf-editor";
import type { Box, PageSize } from "../types";
import { findCardBox } from "./clip-card-box";
import type { EditorClip } from "./types";

export interface ClipLayout {
  /** Room kept along the bottom for the row of folded cards. */
  bottomInset: number;
  /** Where each open card sits, by id. */
  boxes: Map<string, Box>;
  /** The open cards and where they sit, in the order they stack. */
  cards: Array<{ box: Box; clip: EditorClip }>;
  folded: EditorClip[];
}

/** Where every card goes over pages of this size. */
export function layOutClips(
  clips: readonly EditorClip[],
  area: PageSize
): ClipLayout {
  const folded = clips.filter((clip) => clip.isFolded);
  const bottomInset = folded.length > 0 ? CLIP_FOLD_ROW_HEIGHT : 0;
  const cards = clips
    .filter((clip) => !clip.isFolded)
    .map((clip) => ({
      box: findCardBox(clip.place, clip.aspect, area, bottomInset),
      clip,
    }));
  const boxes = new Map(cards.map(({ box, clip }) => [clip.id, box]));
  return { bottomInset, boxes, cards, folded };
}
