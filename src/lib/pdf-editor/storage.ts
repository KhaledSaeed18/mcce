import { PDF_ANNOTATIONS_KEY_PREFIX } from "@/config/pdf-editor";
import { readJson, writeJson } from "@/lib/storage";
import { buildPageId } from "./pages";
import type { Annotation } from "./types";

/** Markup on disk, which may predate pages being pointed at by identity. */
interface StoredAnnotation {
  pageId?: string;
  pageIndex?: number;
}

/** One key per file, so a heavily marked-up PDF cannot push the others out of quota. */
function buildKey(fileId: string): string {
  return `${PDF_ANNOTATIONS_KEY_PREFIX}.${fileId}`;
}

/** The one cast in the editor that is honest: what comes back off disk is untyped. */
function withPageId(stored: StoredAnnotation): Annotation {
  const { pageIndex, ...annotation } = stored;
  return {
    ...(annotation as Annotation),
    pageId: stored.pageId ?? buildPageId(pageIndex ?? 0),
  };
}

export function readAnnotations(fileId: string): Annotation[] {
  return readJson<StoredAnnotation[]>(buildKey(fileId), []).map(withPageId);
}

export function writeAnnotations(
  fileId: string,
  annotations: Annotation[]
): void {
  writeJson(buildKey(fileId), annotations);
}
