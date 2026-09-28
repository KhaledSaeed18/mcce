import type { PDFDocumentProxy } from "pdfjs-dist";
import {
  CLIP_PICTURE_MAX_SIDE,
  CLIP_PICTURE_SCALE,
  CLIP_PICTURE_TYPE,
} from "@/config/pdf-editor";
import { canvasToBlob } from "@/lib/canvas-blob";
import { drawAnnotation } from "../draw/annotation";
import { drawSheet } from "../draw/sheet";
import { getRenderedSize, getRotationTransform } from "../rotation";
import type { Annotation, Box, EditorPage } from "../types";
import { toRenderedBox } from "./rendered-box";
import type { ClipPicture } from "./types";

interface ClipPictureSource {
  /** The markup on the page, painted over the picture as it shows. */
  annotations: Annotation[];
  box: Box;
  doc: PDFDocumentProxy;
  page: EditorPage;
}

/** Draws the part of the page in the box, turned as the page is, with its
 * markup. pdf.js draws only that part, through a viewport shifted so the
 * box starts at the canvas corner. */
export async function drawClipPicture({
  annotations,
  box,
  doc,
  page,
}: ClipPictureSource): Promise<ClipPicture> {
  const source = await doc.getPage(page.sourceIndex + 1);
  const base = source.getViewport({ scale: 1 });
  const size = { height: base.height, width: base.width };
  const shown = toRenderedBox(box, size, page.rotation);
  const longest = Math.max(shown.width, shown.height);
  const scale = Math.min(CLIP_PICTURE_SCALE, CLIP_PICTURE_MAX_SIDE / longest);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(shown.width * scale));
  canvas.height = Math.max(1, Math.round(shown.height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("No canvas to draw the clip on");
  }
  const shift = { x: -shown.x * scale, y: -shown.y * scale };
  if (page.sheet) {
    ctx.setTransform(scale, 0, 0, scale, shift.x, shift.y);
    drawSheet(ctx, page.sheet, getRenderedSize(size, page.rotation));
  } else {
    // pdf.js draws on top of whatever transform the context already has.
    const viewport = source.getViewport({
      offsetX: shift.x,
      offsetY: shift.y,
      rotation: source.rotate + page.rotation,
      scale,
    });
    await source.render({ canvas, viewport }).promise;
  }
  const turn = getRotationTransform(size, page.rotation);
  ctx.setTransform(scale, 0, 0, scale, shift.x, shift.y);
  ctx.translate(turn.tx, turn.ty);
  ctx.rotate(turn.angle);
  for (const annotation of annotations) {
    drawAnnotation(ctx, annotation);
  }
  return {
    blob: await canvasToBlob(canvas, CLIP_PICTURE_TYPE),
    height: canvas.height,
    width: canvas.width,
  };
}
