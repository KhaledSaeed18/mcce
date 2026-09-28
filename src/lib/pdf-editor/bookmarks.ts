import { PDF_BOOKMARKS_KEY_PREFIX } from "@/config/pdf-editor";
import { readJson, removeStored, writeJson } from "@/lib/storage";
import type { EditorPage } from "./types";

function buildBookmarksKey(fileId: string): string {
  return `${PDF_BOOKMARKS_KEY_PREFIX}.${fileId}`;
}

export function readBookmarks(fileId: string): string[] {
  const stored = readJson<unknown>(buildBookmarksKey(fileId), []);
  return Array.isArray(stored)
    ? stored.filter((id): id is string => typeof id === "string")
    : [];
}

export function writeBookmarks(fileId: string, ids: readonly string[]): void {
  writeJson(buildBookmarksKey(fileId), ids);
}

export function removeBookmarks(fileId: string): void {
  removeStored(buildBookmarksKey(fileId));
}

/** Adds the page, or takes it off when it is already there. */
export function toggleBookmark(
  ids: readonly string[],
  pageId: string
): string[] {
  return ids.includes(pageId)
    ? ids.filter((id) => id !== pageId)
    : [...ids, pageId];
}

/** The bookmarked pages still in the document, in the order they sit now. A
 * bookmark on a page taken out is kept, so undoing the removal brings it back. */
export function listBookmarkedPositions(
  ids: readonly string[],
  pages: readonly EditorPage[]
): number[] {
  const marked = new Set(ids);
  return pages.flatMap((page, position) =>
    marked.has(page.id) ? [position] : []
  );
}
