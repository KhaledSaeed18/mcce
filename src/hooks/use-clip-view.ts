import { useCallback, useMemo } from "react";
import { useClipExamCovers } from "@/hooks/use-clip-exam-covers";
import { useClipLabels } from "@/hooks/use-clip-labels";
import { useClipSource } from "@/hooks/use-clip-source";
import { useClips } from "@/hooks/use-clips";
import { useClipsHotkey } from "@/hooks/use-clips-hotkey";
import type { EditorPaneView } from "@/hooks/use-editor-panes";
import {
  changeStoredClip,
  closeStoredClip,
  readClipDesk,
  reopenStoredClip,
  setClipsHidden,
} from "@/lib/pdf-editor/clips/clip-store";
import type { ClipPlace, EditorClip } from "@/lib/pdf-editor/clips/types";
import type { EditorTreeNode, OpenFile } from "@/lib/pdf-editor/types";

interface ClipViewOptions {
  nodes: EditorTreeNode[];
  onOpenBeside: (file: OpenFile) => void;
  panes: EditorPaneView[];
}

function toggleHidden(): void {
  setClipsHidden(!readClipDesk().isHidden);
}

const fold = (id: string, isFolded: boolean) =>
  changeStoredClip(id, { isFolded });
const place = (id: string, next: ClipPlace) =>
  changeStoredClip(id, { place: next });

const ACTIONS = {
  close: closeStoredClip,
  fold,
  place,
  reopen: reopenStoredClip,
  toggleHidden,
};

export type ClipActions = typeof ACTIONS;

/** Everything the clips on screen and the clips button show and do. */
export function useClipView({ nodes, onOpenBeside, panes }: ClipViewOptions) {
  const desk = useClips();
  const all = useMemo(() => [...desk.clips, ...desk.closed], [desk]);
  const { labels, pageNumbers } = useClipLabels(all, nodes, panes);
  const examCovers = useClipExamCovers(desk.clips, nodes);
  const openSource = useClipSource({ onOpenBeside, panes });
  useClipsHotkey(toggleHidden);

  const findPane = useCallback(
    (clip: EditorClip) =>
      panes.find((pane) => pane.node?.id === clip.file.id && pane.session.doc),
    [panes]
  );
  const canRedraw = useCallback(
    (clip: EditorClip) => findPane(clip) !== undefined,
    [findPane]
  );
  const redraw = useCallback(
    (clip: EditorClip) => findPane(clip)?.session.clips.redraw(clip),
    [findPane]
  );

  return {
    actions: ACTIONS,
    canRedraw,
    desk,
    examCovers,
    labels,
    openSource,
    pageNumbers,
    redraw,
  };
}

export type ClipView = ReturnType<typeof useClipView>;
