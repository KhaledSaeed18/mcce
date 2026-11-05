import type { PDFPage } from "pdf-lib";
import {
  TEXT_UNDERLINE_OFFSET_RATIO,
  TEXT_UNDERLINE_WIDTH_RATIO,
} from "@/config/pdf-editor";
import { getFillBox, getLineStart, layoutText } from "../text-layout";
import type { TextAnnotation } from "../types";
import { flipY } from "./content-space";
import { type AnnotationFonts, pickStandardFont } from "./embed-font";
import { hexToRgb } from "./hex-to-rgb";

export function drawText(
  page: PDFPage,
  annotation: TextAnnotation,
  fonts: AnnotationFonts,
  height: number
): void {
  const font = fonts.get(pickStandardFont(annotation));
  if (!font) {
    return;
  }
  const { box, lineHeight, lines } = layoutText(annotation);
  const { background, fontSize, underline, y } = annotation;
  const color = hexToRgb(annotation.color);

  if (background) {
    const fill = getFillBox(box, fontSize);
    page.drawRectangle({
      color: hexToRgb(background),
      height: fill.height,
      width: fill.width,
      x: fill.x,
      y: flipY(height, fill.y + fill.height),
    });
  }

  for (const [index, line] of lines.entries()) {
    const baseline = y + index * lineHeight;
    // The page's own font decides the width here: it is what gets written.
    const width = font.widthOfTextAtSize(line, fontSize);
    const start = getLineStart(width, box, annotation);
    page.drawText(line, {
      color,
      font,
      size: fontSize,
      x: start,
      y: flipY(height, baseline),
    });
    if (underline && line) {
      const lineY = flipY(
        height,
        baseline + fontSize * TEXT_UNDERLINE_OFFSET_RATIO
      );
      page.drawLine({
        color,
        end: { x: start + width, y: lineY },
        start: { x: start, y: lineY },
        thickness: fontSize * TEXT_UNDERLINE_WIDTH_RATIO,
      });
    }
  }
}
