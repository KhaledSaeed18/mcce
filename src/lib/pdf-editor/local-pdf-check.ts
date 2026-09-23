import {
  LOCAL_PDF_MAX_BYTES,
  PDF_HEADER,
  PDF_HEADER_SEARCH_BYTES,
} from "@/config/pdf-editor";
import type { LocalPdfProblem } from "./types";

/** The name and type a browser reports can be wrong or missing, so the file's
 * own header is what decides whether it is a PDF. */
export function checkLocalPdf(
  size: number,
  bytes: ArrayBuffer
): LocalPdfProblem | null {
  if (size === 0) {
    return "empty";
  }
  if (size > LOCAL_PDF_MAX_BYTES) {
    return "too-large";
  }
  const head = new TextDecoder("latin1").decode(
    bytes.slice(0, PDF_HEADER_SEARCH_BYTES)
  );
  return head.includes(PDF_HEADER) ? null : "not-pdf";
}
