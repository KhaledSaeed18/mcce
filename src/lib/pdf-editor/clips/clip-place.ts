import {
  CLIP_MARGIN,
  CLIP_SNAP_DISTANCE,
  CLIP_START_WIDTH,
} from "@/config/pdf-editor";
import type { Box, PageSize } from "../types";
import { findCardHeight, isBottomCorner, isRightCorner } from "./clip-card-box";
import type { ClipCorner, ClipPlace, EditorClip } from "./types";

/** A new card goes at the bottom right, above the cards already there. */
export function placeNewClip(clips: readonly EditorClip[]): ClipPlace {
  let y = CLIP_MARGIN;
  for (const clip of clips) {
    const { corner, width, x } = clip.place;
    const isBelow =
      !clip.isFolded && corner === "bottom-right" && x < CLIP_START_WIDTH;
    if (isBelow) {
      y = Math.max(
        y,
        clip.place.y + findCardHeight(width, clip.aspect) + CLIP_MARGIN
      );
    }
  }
  return { corner: "bottom-right", width: CLIP_START_WIDTH, x: CLIP_MARGIN, y };
}

function snap(distance: number, isSnapping: boolean): number {
  if (isSnapping && distance < CLIP_SNAP_DISTANCE) {
    return CLIP_MARGIN;
  }
  return Math.max(0, distance);
}

/** The place that keeps a card at `box`, measured from `corner`. When
 * snapping, a card let go close to an edge sits against it. */
export function placeFromCorner(
  box: Box,
  room: PageSize,
  corner: ClipCorner,
  isSnapping: boolean
): ClipPlace {
  const x = isRightCorner(corner) ? room.width - box.x - box.width : box.x;
  const y = isBottomCorner(corner) ? room.height - box.y - box.height : box.y;
  return {
    corner,
    width: box.width,
    x: snap(x, isSnapping),
    y: snap(y, isSnapping),
  };
}

/** The place for a card let go at `box`, kept to the corner nearest its
 * middle. `bottomInset` is room kept free along the bottom edge. */
export function placeCardAt(
  box: Box,
  area: PageSize,
  bottomInset: number,
  isSnapping = true
): ClipPlace {
  const room = { height: area.height - bottomInset, width: area.width };
  const isRight = box.x + box.width / 2 > room.width / 2;
  const isBottom = box.y + box.height / 2 > room.height / 2;
  const corner: ClipCorner = `${isBottom ? "bottom" : "top"}-${isRight ? "right" : "left"}`;
  return placeFromCorner(box, room, corner, isSnapping);
}
