import {
  ANNOTATION_FONT_FAMILY,
  TEXT_ASCENT_RATIO,
  TEXT_DESCENT_RATIO,
  TEXT_DRAFT_HEIGHT_RATIO,
  TEXT_DRAFT_MIN_HEIGHT,
  TEXT_DRAFT_WIDTH,
  TEXT_WIDTH_FALLBACK_RATIO,
} from "@/config/pdf-editor";
import type { Box, PageSize, TextAnnotation, TextDraft } from "./types";

let measureContext: CanvasRenderingContext2D | null = null;

/** One offscreen context for every measurement: a drag asks for many per second. */
function getMeasureContext(): CanvasRenderingContext2D | null {
  if (measureContext) {
    return measureContext;
  }
  if (typeof document === "undefined") {
    return null;
  }
  measureContext = document.createElement("canvas").getContext("2d");
  return measureContext;
}

export function measureTextWidth(text: string, fontSize: number): number {
  const ctx = getMeasureContext();
  if (!ctx) {
    return text.length * fontSize * TEXT_WIDTH_FALLBACK_RATIO;
  }
  ctx.font = `${fontSize}px ${ANNOTATION_FONT_FAMILY}`;
  return ctx.measureText(text).width;
}

/**
 * The rectangle a committed text occupies. Its anchor is the baseline, so the
 * box reaches above it by the ascent and below it by the descent.
 */
export function getTextBox(annotation: TextAnnotation): Box {
  return {
    height: annotation.fontSize * (TEXT_ASCENT_RATIO + TEXT_DESCENT_RATIO),
    width: measureTextWidth(annotation.text, annotation.fontSize),
    x: annotation.x,
    y: annotation.y - annotation.fontSize * TEXT_ASCENT_RATIO,
  };
}

/** The draft field's size on screen, which the field renders at and the clamp measures. */
export function getDraftSize(fontSize: number, zoom: number): PageSize {
  return {
    height: Math.max(
      TEXT_DRAFT_MIN_HEIGHT,
      fontSize * zoom * TEXT_DRAFT_HEIGHT_RATIO
    ),
    width: TEXT_DRAFT_WIDTH,
  };
}

/** The same field in page units, so it can be kept on the page like any text box. */
export function getDraftBox(
  draft: TextDraft,
  fontSize: number,
  zoom: number
): Box {
  const { height, width } = getDraftSize(fontSize, zoom);
  const pageHeight = height / zoom;
  return {
    height: pageHeight,
    width: width / zoom,
    x: draft.x,
    y: draft.y - fontSize * TEXT_ASCENT_RATIO - (pageHeight - fontSize) / 2,
  };
}
