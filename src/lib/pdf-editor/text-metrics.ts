import {
  ANNOTATION_FONT_FAMILY,
  TEXT_WIDTH_FALLBACK_RATIO,
} from "@/config/pdf-editor";

let measureContext: CanvasRenderingContext2D | null = null;

/** One offscreen context for every measurement: wrapping asks for many per keystroke. */
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
