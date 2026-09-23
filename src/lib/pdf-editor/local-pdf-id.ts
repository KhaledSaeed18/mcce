import { LOCAL_PDF_ID_LENGTH, LOCAL_PDF_ID_PREFIX } from "@/config/pdf-editor";

/** Taken from the file's content, so opening the same PDF again finds the
 * markup already made on it instead of starting a second copy. */
export async function buildLocalPdfId(bytes: ArrayBuffer): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  const hex = Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
  return `${LOCAL_PDF_ID_PREFIX}${hex.slice(0, LOCAL_PDF_ID_LENGTH)}`;
}
