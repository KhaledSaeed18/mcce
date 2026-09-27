import type { PDFDocumentProxy } from "pdfjs-dist";

type PageReference = Parameters<PDFDocumentProxy["getPageIndex"]>[0];

function isPageReference(target: unknown): target is PageReference {
  return typeof target === "object" && target !== null && "num" in target;
}

/**
 * The page of the file a link inside it points at. A destination is either a
 * name the file looks up or the target itself, whose first part is the page:
 * usually a reference to it, sometimes, in files written by hand, its number.
 */
export async function resolveDestination(
  doc: PDFDocumentProxy,
  dest: unknown
): Promise<number | null> {
  try {
    const explicit =
      typeof dest === "string" ? await doc.getDestination(dest) : dest;
    if (!Array.isArray(explicit)) {
      return null;
    }
    const [target] = explicit as unknown[];
    if (typeof target === "number") {
      return target;
    }
    return isPageReference(target) ? await doc.getPageIndex(target) : null;
  } catch {
    // A broken link in the file leaves its entry with nowhere to go.
    return null;
  }
}
