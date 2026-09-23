import { fetchPdfBytes } from "./fetch-pdf";
import type { EditorFile } from "./types";

/** The file's bytes, from wherever it lives. */
export async function loadPdfBytes(file: EditorFile): Promise<ArrayBuffer> {
  const response = await fetchPdfBytes({ data: { fileId: file.id } });
  if (!response.ok) {
    throw new Error(`The PDF could not be fetched (${response.status})`);
  }
  return response.arrayBuffer();
}
