import { useCallback, useEffect, useState } from "react";
import type { EditorPaneView } from "@/hooks/use-editor-panes";
import { toRenderedBox } from "@/lib/pdf-editor/clips/rendered-box";
import type { EditorClip } from "@/lib/pdf-editor/clips/types";
import { getRenderedSize } from "@/lib/pdf-editor/rotation";
import { scrollToPageSpot } from "@/lib/pdf-editor/scroll-anchor";
import type { OpenFile } from "@/lib/pdf-editor/types";

interface ClipSourceOptions {
  onOpenBeside: (file: OpenFile) => void;
  panes: EditorPaneView[];
}

/** Opens a clip's file beside, or goes to it where it already is, on the
 * clip's page with the clipped part across the middle. */
export function useClipSource({ onOpenBeside, panes }: ClipSourceOptions) {
  const [pending, setPending] = useState<EditorClip | null>(null);
  const pane = pending
    ? panes.find((item) => item.node?.id === pending.file.id)
    : undefined;
  const session = pane?.session.doc ? pane.session : null;

  useEffect(() => {
    if (!(pending && session)) {
      return;
    }
    const { markup, navigation, scrollRef, sizes } = session;
    const position = markup.pages.findIndex(
      (item) => item.id === pending.pageId
    );
    const page = markup.pages[position];
    const size = page ? sizes[page.sourceIndex] : undefined;
    if (page && !size) {
      return;
    }
    setPending(null);
    if (!(page && size)) {
      return;
    }
    const shown = toRenderedBox(pending.box, size, page.rotation);
    const rendered = getRenderedSize(size, page.rotation);
    const middle = (shown.y + shown.height / 2) / rendered.height;
    const scroller = scrollRef.current;
    if (!(scroller && scrollToPageSpot(scroller, position, middle))) {
      navigation.goToPage(position);
    }
  }, [pending, session]);

  return useCallback(
    (clip: EditorClip) => {
      setPending(clip);
      if (!panes.some((item) => item.node?.id === clip.file.id)) {
        onOpenBeside(clip.file);
      }
    },
    [onOpenBeside, panes]
  );
}
