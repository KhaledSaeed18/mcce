import { HIGHLIGHT_ITEM_LABEL, NOTE_EMPTY_LABEL } from "@/config/pdf-editor";
import type { StudyItem } from "./types";

/** How a note or a highlight reads in a list: a note by what it says, a
 * highlight by the words it marks, in quotes. Either falls back to what it
 * is when there are no words to show, as with a highlight drawn by hand. */
export function describeStudyItem(item: StudyItem): string {
  if (item.annotation.type === "note") {
    return item.text || NOTE_EMPTY_LABEL;
  }
  return item.text ? `“${item.text}”` : HIGHLIGHT_ITEM_LABEL;
}
