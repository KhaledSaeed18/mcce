import {
  SHEET_GRID_COLOR,
  SHEET_GRID_LINE_WIDTH,
  SHEET_PAPER_COLOR,
} from "@/config/pdf-editor";
import { getGridLines } from "../sheet-grid";
import type { PageSheet, PageSize } from "../types";

/** Paints a sheet the reader put in, in page space; the caller scales the context. */
export function drawSheet(
  ctx: CanvasRenderingContext2D,
  sheet: PageSheet,
  size: PageSize
): void {
  ctx.fillStyle = SHEET_PAPER_COLOR;
  ctx.fillRect(0, 0, size.width, size.height);
  if (sheet === "blank") {
    return;
  }
  ctx.strokeStyle = SHEET_GRID_COLOR;
  ctx.lineWidth = SHEET_GRID_LINE_WIDTH;
  ctx.beginPath();
  for (const x of getGridLines(size.width)) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, size.height);
  }
  for (const y of getGridLines(size.height)) {
    ctx.moveTo(0, y);
    ctx.lineTo(size.width, y);
  }
  ctx.stroke();
}
