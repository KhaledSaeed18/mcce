import { PDF_ANNOTATIONS_KEY_PREFIX } from "@/config/pdf-editor";
import { readJson, writeJson } from "@/lib/storage";
import type { Annotation } from "./types";

/** One key per file, so a heavily marked-up PDF cannot push the others out of quota. */
function buildKey(fileId: string): string {
  return `${PDF_ANNOTATIONS_KEY_PREFIX}.${fileId}`;
}

export function readAnnotations(fileId: string): Annotation[] {
  return readJson<Annotation[]>(buildKey(fileId), []);
}

export function writeAnnotations(
  fileId: string,
  annotations: Annotation[]
): void {
  writeJson(buildKey(fileId), annotations);
}
