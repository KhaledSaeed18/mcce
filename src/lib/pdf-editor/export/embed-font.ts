import fontkit from "@pdf-lib/fontkit";
import type { PDFDocument, PDFFont } from "pdf-lib";
import { ANNOTATION_FONT_PATH } from "@/config/pdf-editor";

/**
 * The font the markup is written in, subset into the exported file so it holds
 * only the glyphs actually used. Embedding it is what lets an annotation carry
 * accents, Arabic, or anything else outside Helvetica's own encoding.
 */
export async function embedAnnotationFont(pdf: PDFDocument): Promise<PDFFont> {
  const response = await fetch(ANNOTATION_FONT_PATH);
  if (!response.ok) {
    throw new Error(`Could not load the annotation font (${response.status})`);
  }
  pdf.registerFontkit(fontkit);
  return await pdf.embedFont(await response.arrayBuffer(), { subset: true });
}
