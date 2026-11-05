import { type PDFDocument, type PDFFont, StandardFonts } from "pdf-lib";
import type { Annotation, TextFontFamily, TextFormat } from "../types";

/** Regular, bold, italic, and bold italic of each family. */
const STANDARD_FONTS: Record<
  TextFontFamily,
  readonly [StandardFonts, StandardFonts, StandardFonts, StandardFonts]
> = {
  mono: [
    StandardFonts.Courier,
    StandardFonts.CourierBold,
    StandardFonts.CourierOblique,
    StandardFonts.CourierBoldOblique,
  ],
  sans: [
    StandardFonts.Helvetica,
    StandardFonts.HelveticaBold,
    StandardFonts.HelveticaOblique,
    StandardFonts.HelveticaBoldOblique,
  ],
  serif: [
    StandardFonts.TimesRoman,
    StandardFonts.TimesRomanBold,
    StandardFonts.TimesRomanItalic,
    StandardFonts.TimesRomanBoldItalic,
  ],
};

export type AnnotationFonts = ReadonlyMap<StandardFonts, PDFFont>;

export function pickStandardFont(format: TextFormat): StandardFonts {
  const variant = (format.bold ? 1 : 0) + (format.italic ? 2 : 0);
  return STANDARD_FONTS[format.fontFamily ?? "sans"][variant];
}

/**
 * These are fonts every PDF reader carries, so they need no font file shipped
 * with the app and no toolkit to subset one. They can only write the characters
 * WinAnsi covers, which is Latin and the accents around it: markup in a script
 * outside that cannot be written into the copy, and the export says so rather
 * than producing a file with the text missing. Only the faces in use are embedded.
 */
export async function embedAnnotationFonts(
  pdf: PDFDocument,
  annotations: readonly Annotation[]
): Promise<AnnotationFonts> {
  const names = new Set<StandardFonts>();
  for (const annotation of annotations) {
    if (annotation.type === "text") {
      names.add(pickStandardFont(annotation));
    }
  }
  const entries = await Promise.all(
    Array.from(
      names,
      async (name) => [name, await pdf.embedFont(name)] as const
    )
  );
  return new Map(entries);
}
