import { FILE_SEARCH_SELECTION_LIMIT } from "@/config/pdf-editor";

const SPACES = /\s+/g;

/** The words selected on the page, when there are a few to search for. */
export function readSelectedWords(): string | null {
  const words = window.getSelection()?.toString().replace(SPACES, " ").trim();
  if (!words || words.length > FILE_SEARCH_SELECTION_LIMIT) {
    return null;
  }
  return words;
}
