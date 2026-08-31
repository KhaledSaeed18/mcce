import { type PDFDocument, type PDFFont, StandardFonts } from "pdf-lib";

/**
 * Helvetica is one of the fonts every PDF reader carries, so it needs no font
 * file shipped with the app and no toolkit to subset one. It can only write the
 * characters WinAnsi covers, which is Latin and the accents around it: markup in
 * a script outside that cannot be written into the copy, and the export says so
 * rather than producing a file with the text missing.
 */
export async function embedAnnotationFont(pdf: PDFDocument): Promise<PDFFont> {
  return await pdf.embedFont(StandardFonts.Helvetica);
}
