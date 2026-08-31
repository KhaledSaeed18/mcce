import {
  PAGE_FULL_TURN,
  PAGE_HALF_TURN,
  PAGE_QUARTER_TURN,
  PAGE_THREE_QUARTER_TURN,
} from "@/config/pdf-editor";
import type { PageSize } from "../types";

/** A PDF transformation matrix, in the order pdf-lib takes its parts. */
export type ContentMatrix = [number, number, number, number, number, number];

/** Markup is placed from the top down; PDF user space counts from the bottom up. */
export function flipY(height: number, y: number): number {
  return height - y;
}

/**
 * Maps the page as a reader sees it onto the space its content is written in.
 *
 * A page carrying its own /Rotate is shown turned, and markup is made against
 * that turned view, but pdf-lib writes into the space behind it. The two only
 * coincide on a page that is not turned. A rotation is used rather than the
 * reflection the two origins suggest, so that text stays the right way round.
 */
export function getContentMatrix(
  size: PageSize,
  rotation: number
): ContentMatrix {
  const turn = ((rotation % PAGE_FULL_TURN) + PAGE_FULL_TURN) % PAGE_FULL_TURN;
  if (turn === PAGE_QUARTER_TURN) {
    return [0, 1, -1, 0, size.width, 0];
  }
  if (turn === PAGE_HALF_TURN) {
    return [-1, 0, 0, -1, size.width, size.height];
  }
  if (turn === PAGE_THREE_QUARTER_TURN) {
    return [0, -1, 1, 0, 0, size.height];
  }
  return [1, 0, 0, 1, 0, 0];
}
