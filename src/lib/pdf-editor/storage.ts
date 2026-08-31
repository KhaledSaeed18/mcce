import {
  PDF_ANNOTATIONS_KEY_PREFIX,
  PDF_DOCUMENT_KEY_PREFIX,
} from "@/config/pdf-editor";
import { readJson, writeJson } from "@/lib/storage";
import { buildPageId, buildPages } from "./pages";
import { reconcileWithFile } from "./reconcile";
import type { Annotation, EditorSnapshot } from "./types";

/** Markup on disk, which may predate pages being pointed at by identity. */
interface StoredAnnotation {
  pageId?: string;
  pageIndex?: number;
}

/** One key per file, so a heavily marked-up PDF cannot push the others out of quota. */
function buildKey(fileId: string): string {
  return `${PDF_ANNOTATIONS_KEY_PREFIX}.${fileId}`;
}

function buildDocumentKey(fileId: string): string {
  return `${PDF_DOCUMENT_KEY_PREFIX}.${fileId}`;
}

/** The one cast in the editor that is honest: what comes back off disk is untyped. */
function withPageId(stored: StoredAnnotation): Annotation {
  const { pageIndex, ...annotation } = stored;
  return {
    ...(annotation as Annotation),
    pageId: stored.pageId ?? buildPageId(pageIndex ?? 0),
  };
}

function readAnnotations(fileId: string): Annotation[] {
  return readJson<StoredAnnotation[]>(buildKey(fileId), []).map(withPageId);
}

const NOTHING_STORED: EditorSnapshot = { annotations: [], pages: [] };

/** What was left open on this file last time, or the file as it arrives. */
export function readDocument(
  fileId: string,
  pageCount: number
): EditorSnapshot {
  const stored = readJson<EditorSnapshot>(
    buildDocumentKey(fileId),
    NOTHING_STORED
  );
  // A stored file always has pages, so their absence means there is none.
  if (stored.pages.length > 0) {
    return reconcileWithFile(stored, pageCount);
  }
  return { annotations: readAnnotations(fileId), pages: buildPages(pageCount) };
}

export function writeDocument(fileId: string, snapshot: EditorSnapshot): void {
  writeJson(buildDocumentKey(fileId), snapshot);
}
