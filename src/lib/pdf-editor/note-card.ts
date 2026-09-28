import {
  NOTE_CARD_GAP,
  NOTE_CARD_HEIGHT,
  NOTE_CARD_WIDTH,
  NOTE_SIZE,
} from "@/config/pdf-editor";
import type { PageSize, Point } from "./types";

/**
 * Where a note's card opens, in screen pixels from the page's corner: beside
 * the icon, on the left of it when the right has no room, and lifted when it
 * would hang off the foot of the page, which cuts off whatever passes it.
 */
export function placeNoteCard(
  note: Point,
  size: PageSize,
  zoom: number
): Point {
  const right = (note.x + NOTE_SIZE) * zoom + NOTE_CARD_GAP;
  const fitsRight = right + NOTE_CARD_WIDTH <= size.width * zoom;
  const left = fitsRight
    ? right
    : Math.max(0, note.x * zoom - NOTE_CARD_GAP - NOTE_CARD_WIDTH);
  const top = Math.max(
    0,
    Math.min(note.y * zoom, size.height * zoom - NOTE_CARD_HEIGHT)
  );
  return { x: left, y: top };
}
