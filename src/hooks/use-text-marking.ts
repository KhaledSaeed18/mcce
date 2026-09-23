import { type RefObject, useCallback } from "react";
import { buildTextMark } from "@/lib/pdf-editor/build-annotation";
import { mergeLineBoxes } from "@/lib/pdf-editor/line-boxes";
import { toPageBox } from "@/lib/pdf-editor/page-box";
import { collectSelectionBoxes } from "@/lib/pdf-editor/selection-boxes";
import type {
  Annotation,
  EditorPage,
  PageSize,
  TextMarkStyle,
} from "@/lib/pdf-editor/types";

interface TextMarkingOptions {
  /** Highlights take the highlighter's shade; lines take the pen's color. */
  colors: Record<TextMarkStyle, string>;
  onAddMany: (annotations: Annotation[]) => void;
  pages: EditorPage[];
  scrollRef: RefObject<HTMLElement | null>;
  sizes: PageSize[];
  zoom: number;
}

/** Turns the selected text into marks, one per page it covers, added as a
 * single undo step, then lets go of the selection. */
export function useTextMarking({
  colors,
  onAddMany,
  pages,
  scrollRef,
  sizes,
  zoom,
}: TextMarkingOptions) {
  return useCallback(
    (style: TextMarkStyle, range: Range) => {
      const root = scrollRef.current;
      if (!root) {
        return;
      }
      const marks: Annotation[] = [];
      for (const [position, boxes] of collectSelectionBoxes(range, root)) {
        const page = pages[position];
        const size = page ? sizes[page.sourceIndex] : undefined;
        if (!(page && size)) {
          continue;
        }
        const pageBoxes = boxes.map((box) =>
          toPageBox(box, zoom, size, page.rotation)
        );
        marks.push(
          buildTextMark(
            style,
            mergeLineBoxes(pageBoxes),
            page.id,
            colors[style]
          )
        );
      }
      onAddMany(marks);
      document.getSelection()?.removeAllRanges();
    },
    [colors, onAddMany, pages, scrollRef, sizes, zoom]
  );
}
