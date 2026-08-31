import type { PDFDocument, PDFPage } from "pdf-lib";
import type { EditorPage } from "../types";

export interface ResolvedPage {
  entry: EditorPage;
  page: PDFPage;
}

/** Which appearances are repeats, and so need a page of their own rather than the original. */
function findRepeats(pages: ResolvedPage[]): number[] {
  const seen = new Set<number>();
  const repeats: number[] = [];

  for (const { entry } of pages) {
    if (seen.has(entry.sourceIndex)) {
      repeats.push(entry.sourceIndex);
      continue;
    }
    seen.add(entry.sourceIndex);
  }

  return repeats;
}

/**
 * The page each entry is written from. A page the editor holds once is the one
 * the file already has, so it keeps everything that came with it. A page held
 * more than once cannot be the same page twice over, so each appearance after
 * the first is given a copy.
 */
export async function resolveLayoutPages(
  pdf: PDFDocument,
  layout: EditorPage[]
): Promise<ResolvedPage[]> {
  const original = pdf.getPages();
  const present = layout.flatMap((entry) => {
    const page = original[entry.sourceIndex];
    return page ? [{ entry, page }] : [];
  });

  const repeats = findRepeats(present);
  if (repeats.length === 0) {
    return present;
  }

  const copies = await pdf.copyPages(pdf, repeats);
  const seen = new Set<number>();
  let nextCopy = 0;

  return present.map(({ entry, page }) => {
    if (seen.has(entry.sourceIndex)) {
      const copy = copies[nextCopy] ?? page;
      nextCopy += 1;
      return { entry, page: copy };
    }
    seen.add(entry.sourceIndex);
    return { entry, page };
  });
}
