import { useMemo } from "react";
import type { EditorPaneView } from "@/hooks/use-editor-panes";
import { useTabLabels } from "@/hooks/use-tab-labels";
import { findClipPageNumber } from "@/lib/pdf-editor/clips/clip-page-number";
import type { EditorClip } from "@/lib/pdf-editor/clips/types";
import { readStoredPages } from "@/lib/pdf-editor/storage";
import type { EditorTreeNode, TabLabel } from "@/lib/pdf-editor/types";

/** What each clip is headed by: its file's chip and short name, as its tab
 * would show them, and its page as the file's pages sit now. */
export function useClipLabels(
  clips: EditorClip[],
  nodes: EditorTreeNode[],
  panes: EditorPaneView[]
) {
  const files = useMemo(() => clips.map((clip) => clip.file), [clips]);
  const labelList = useTabLabels(files, nodes);
  const [first, second] = panes;
  const firstPages = first?.session.doc ? first.session.markup.pages : null;
  const secondPages = second?.session.doc ? second.session.markup.pages : null;
  const firstId = first?.node?.id;
  const secondId = second?.node?.id;

  return useMemo(() => {
    const labels = new Map<string, TabLabel>();
    const pageNumbers = new Map<string, number | null>();
    for (const [index, clip] of clips.entries()) {
      labels.set(clip.id, labelList[index]);
      let pages = readStoredPages(clip.file.id);
      if (clip.file.id === firstId && firstPages) {
        pages = firstPages;
      } else if (clip.file.id === secondId && secondPages) {
        pages = secondPages;
      }
      pageNumbers.set(clip.id, findClipPageNumber(clip, pages));
    }
    return { labels, pageNumbers };
  }, [clips, firstId, firstPages, labelList, secondId, secondPages]);
}
