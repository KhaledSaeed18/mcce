import {
  NOTE_EDGE_COLOR,
  NOTE_EDGE_WIDTH,
  NOTE_FOLD_RATIO,
  NOTE_SIZE,
} from "@/config/pdf-editor";
import type { NoteAnnotation } from "../types";

/** How many lines of writing the icon suggests. */
const NOTE_LINES = 3;

/** A small sticky note with its corner folded over, standing for the note. */
export function drawNote(
  ctx: CanvasRenderingContext2D,
  note: NoteAnnotation
): void {
  const { x, y } = note;
  const fold = NOTE_SIZE * NOTE_FOLD_RATIO;
  const right = x + NOTE_SIZE;
  const bottom = y + NOTE_SIZE;

  ctx.save();
  ctx.lineWidth = NOTE_EDGE_WIDTH;
  ctx.lineJoin = "round";
  ctx.strokeStyle = NOTE_EDGE_COLOR;
  ctx.fillStyle = note.color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(right, y);
  ctx.lineTo(right, bottom - fold);
  ctx.lineTo(right - fold, bottom);
  ctx.lineTo(x, bottom);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(right, bottom - fold);
  ctx.lineTo(right - fold, bottom - fold);
  ctx.lineTo(right - fold, bottom);
  ctx.stroke();

  const step = (NOTE_SIZE - fold) / (NOTE_LINES + 1);
  ctx.beginPath();
  for (let line = 1; line <= NOTE_LINES; line += 1) {
    ctx.moveTo(x + step, y + step * line);
    ctx.lineTo(right - step, y + step * line);
  }
  ctx.stroke();
  ctx.restore();
}
