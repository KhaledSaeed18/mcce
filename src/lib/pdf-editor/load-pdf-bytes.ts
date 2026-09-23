import { fetchPdfBytes } from "./fetch-pdf";
import { readLocalPdfBytes } from "./local-pdf-store";
import type { EditorFile } from "./types";

/** The file's bytes, from wherever it lives. */
export async function loadPdfBytes(file: EditorFile): Promise<ArrayBuffer> {
  if (file.source === "local") {
    const bytes = await readLocalPdfBytes(file.id);
    if (!bytes) {
      throw new Error("The PDF is no longer kept in this browser");
    }
    return bytes;
  }
  const response = await fetchPdfBytes({ data: { fileId: file.id } });
  if (!response.ok) {
    throw new Error(`The PDF could not be fetched (${response.status})`);
  }
  return response.arrayBuffer();
}
