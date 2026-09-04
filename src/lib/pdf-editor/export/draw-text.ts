import type { PDFFont, PDFPage } from "pdf-lib";
import { layoutText } from "../text-layout";
import type { TextAnnotation } from "../types";
import { flipY } from "./content-space";
import { hexToRgb } from "./hex-to-rgb";

export function drawText(
  page: PDFPage,
  annotation: TextAnnotation,
  font: PDFFont | null,
  height: number
): void {
  // The caller embeds a font only when some annotation is text.
  if (!font) {
    return;
  }
  const { lineHeight, lines } = layoutText(annotation);
  const color = hexToRgb(annotation.color);

  for (const [index, line] of lines.entries()) {
    page.drawText(line, {
      color,
      font,
      size: annotation.fontSize,
      x: annotation.x,
      y: flipY(height, annotation.y + index * lineHeight),
    });
  }
}
