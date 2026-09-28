import type { EditorPage } from "../types";
import type { EditorClip } from "./types";

/** How the id of a page the file came with names its place in the file. */
const OWN_PAGE_ID = /^p\d+$/;

/** The clip's page number in its file as the pages sit now, or null once
 * its page has been removed. With no pages to go by, a page the file came
 * with is found by its place in the file, and any other keeps the number
 * it was clipped at. */
export function findClipPageNumber(
  clip: EditorClip,
  pages: readonly EditorPage[] | null
): number | null {
  if (pages) {
    const position = pages.findIndex((page) => page.id === clip.pageId);
    return position < 0 ? null : position + 1;
  }
  return OWN_PAGE_ID.test(clip.pageId)
    ? Number(clip.pageId.slice(1)) + 1
    : clip.pageNumber;
}
