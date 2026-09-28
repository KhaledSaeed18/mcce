import {
  ANNOTATION_FONT_FAMILY,
  COVER_LABEL,
  COVER_LABEL_COLOR,
  COVER_LABEL_PADDING,
  COVER_LABEL_SIZE,
  COVER_OUTLINE_WIDTH,
  COVER_REVEALED_ALPHA,
  COVER_REVEALED_DASH,
} from "@/config/pdf-editor";
import type { CoverAnnotation } from "../types";

/** The hint is left off a cover too small to hold it, rather than spilling out. */
function drawLabel(ctx: CanvasRenderingContext2D, cover: CoverAnnotation) {
  ctx.font = `${COVER_LABEL_SIZE}px ${ANNOTATION_FONT_FAMILY}`;
  const fits =
    ctx.measureText(COVER_LABEL).width + COVER_LABEL_PADDING * 2 <=
      cover.width && COVER_LABEL_SIZE + COVER_LABEL_PADDING * 2 <= cover.height;
  if (!fits) {
    return;
  }
  ctx.fillStyle = COVER_LABEL_COLOR;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(
    COVER_LABEL,
    cover.x + cover.width / 2,
    cover.y + cover.height / 2
  );
}

/** Solid while it hides its answer; a faint dashed outline once revealed, so
 * the reader can see where it was and hide the answer again. */
export function drawCover(
  ctx: CanvasRenderingContext2D,
  cover: CoverAnnotation,
  isRevealed: boolean
): void {
  const { height, width, x, y } = cover;
  ctx.save();
  ctx.strokeStyle = cover.color;
  ctx.lineWidth = COVER_OUTLINE_WIDTH;
  if (isRevealed) {
    ctx.fillStyle = cover.color;
    ctx.globalAlpha = COVER_REVEALED_ALPHA;
    ctx.fillRect(x, y, width, height);
    ctx.globalAlpha = 1;
    ctx.setLineDash(COVER_REVEALED_DASH);
    ctx.strokeRect(x, y, width, height);
  } else {
    ctx.fillStyle = cover.color;
    ctx.fillRect(x, y, width, height);
    drawLabel(ctx, cover);
  }
  ctx.restore();
}
