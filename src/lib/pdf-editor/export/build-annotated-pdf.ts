import { PDFDocument } from "pdf-lib";
import type { Annotation, EditorPage } from "../types";
import { applyLayout } from "./apply-layout";
import { drawAnnotationOnPage } from "./draw-on-page";
import { embedAnnotationFonts } from "./embed-font";

/**
 * Burns the markup into a copy of the original file, so the text of the source
 * document stays selectable rather than being flattened into an image.
 */
export async function buildAnnotatedPdf(
  source: ArrayBuffer,
  annotations: Annotation[],
  layout: EditorPage[]
): Promise<Uint8Array> {
  const pdf = await PDFDocument.load(source);
  const placed = await applyLayout(pdf, layout);
  const byPageId = new Map(placed.map((item) => [item.entry.id, item]));
  const fonts = await embedAnnotationFonts(pdf, annotations);

  for (const annotation of annotations) {
    const target = byPageId.get(annotation.pageId);
    if (target) {
      drawAnnotationOnPage(target.page, annotation, fonts, target.baseRotation);
    }
  }

  return await pdf.save();
}
