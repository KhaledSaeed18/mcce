import {
  FILE_SEARCH_SNIPPET_AFTER,
  FILE_SEARCH_SNIPPET_BEFORE,
} from "@/config/pdf-editor";
import type { FileSearchSnippet } from "./types";

const SPACES = /\s+/g;
const CUT = "…";

function tidy(text: string): string {
  return text.replace(SPACES, " ");
}

/** The match with the words either side of it, cut at a space so no word is
 * left half shown. */
export function buildSnippet(
  text: string,
  offset: number,
  length: number
): FileSearchSnippet {
  const from = Math.max(0, offset - FILE_SEARCH_SNIPPET_BEFORE);
  const end = offset + length;
  const to = Math.min(text.length, end + FILE_SEARCH_SNIPPET_AFTER);
  let before = tidy(text.slice(from, offset)).trimStart();
  let after = tidy(text.slice(end, to)).trimEnd();
  if (from > 0) {
    const space = before.indexOf(" ");
    before = CUT + (space === -1 ? before : before.slice(space + 1));
  }
  if (to < text.length) {
    const space = after.lastIndexOf(" ");
    after = (space > 0 ? after.slice(0, space) : after) + CUT;
  }
  return { after, before, match: tidy(text.slice(offset, end)) };
}
