import { type RefObject, useCallback } from "react";
import { findSelectionClipBox } from "@/lib/pdf-editor/clips/selection-clip-box";
import { toPageBox } from "@/lib/pdf-editor/page-box";
import { collectSelectionBoxes } from "@/lib/pdf-editor/selection-boxes";
import type { Box, EditorPage, PageSize } from "@/lib/pdf-editor/types";

interface SelectionClipOptions {
  onClip: (pageId: string, box: Box) => void;
  pages: EditorPage[];
  scrollRef: RefObject<HTMLElement | null>;
  sizes: PageSize[];
  zoom: number;
}

/** Clips the lines selected, one clip for each page the selection covers,
 * then lets go of the selection. */
export function useSelectionClip({
  onClip,
  pages,
  scrollRef,
  sizes,
  zoom,
}: SelectionClipOptions) {
  return useCallback(
    (range: Range) => {
      const root = scrollRef.current;
      if (!root) {
        return;
      }
      for (const [position, { boxes }] of collectSelectionBoxes(range, root)) {
        const page = pages[position];
        const size = page ? sizes[page.sourceIndex] : undefined;
        if (page && size && boxes.length > 0) {
          const pageBoxes = boxes.map((box) =>
            toPageBox(box, zoom, size, page.rotation)
          );
          onClip(page.id, findSelectionClipBox(pageBoxes, size));
        }
      }
      document.getSelection()?.removeAllRanges();
    },
    [onClip, pages, scrollRef, sizes, zoom]
  );
}
