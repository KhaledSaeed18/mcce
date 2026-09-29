import {
  CLIP_BORDER_WIDTH,
  CLIP_HEADER_HEIGHT,
  CLIP_MARGIN,
  CLIP_MIN_WIDTH,
} from "@/config/pdf-editor";
import type { Box, PageSize } from "../types";
import type { ClipCorner, ClipPlace } from "./types";

export function isRightCorner(corner: ClipCorner): boolean {
  return corner.endsWith("right");
}

export function isBottomCorner(corner: ClipCorner): boolean {
  return corner.startsWith("bottom");
}

/** A card's height: its header over the picture at the card's width. */
export function findCardHeight(width: number, aspect: number): number {
  const inner = width - 2 * CLIP_BORDER_WIDTH;
  return CLIP_HEADER_HEIGHT + inner / aspect + 2 * CLIP_BORDER_WIDTH;
}

/** Where a card sits on the pages now, kept inside them however they have
 * shrunk since. `bottomInset` is room kept free along the bottom edge. */
export function findCardBox(
  place: ClipPlace,
  aspect: number,
  area: PageSize,
  bottomInset: number
): Box {
  const room = { height: area.height - bottomInset, width: area.width };
  const width = Math.max(
    Math.min(place.width, room.width - 2 * CLIP_MARGIN),
    CLIP_MIN_WIDTH
  );
  const height = findCardHeight(width, aspect);
  const left = isRightCorner(place.corner)
    ? room.width - place.x - width
    : place.x;
  const top = isBottomCorner(place.corner)
    ? room.height - place.y - height
    : place.y;
  return {
    height,
    width,
    x: Math.max(0, Math.min(left, room.width - width)),
    y: Math.max(0, Math.min(top, room.height - height)),
  };
}
