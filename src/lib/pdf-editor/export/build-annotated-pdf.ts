import { PDFDocument } from "pdf-lib";
import type { Annotation } from "../types";
import { drawAnnotationOnPage } from "./draw-on-page";
import { embedAnnotationFont } from "./embed-font";

/**
 * Burns the markup into a copy of the original file, so the text of the source
 * document stays selectable rather than being flattened into an image.
 */
export async function buildAnnotatedPdf(
  source: ArrayBuffer,
  annotations: Annotation[]
): Promise<Uint8Array> {
  const pdf = await PDFDocument.load(source);
  const pages = pdf.getPages();
  // Markup with no text in it has no reason to carry a font at all.
  const font = annotations.some((annotation) => annotation.type === "text")
    ? await embedAnnotationFont(pdf)
    : null;

  for (const annotation of annotations) {
    const page = pages[annotation.pageIndex];
    if (page) {
      drawAnnotationOnPage(page, annotation, font);
    }
  }

  return await pdf.save();
}
