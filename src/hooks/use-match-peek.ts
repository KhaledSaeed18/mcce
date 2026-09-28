import { useMemo } from "react";
import { MATCH_PEEK_HOTKEY_KEY } from "@/config/pdf-editor";
import type { EditorPaneView } from "@/hooks/use-editor-panes";
import { useEditorSession } from "@/hooks/use-editor-session";
import type { EditorTools } from "@/hooks/use-editor-tools";
import { useHeldKey } from "@/hooks/use-held-key";
import { buildDriveFileUrl } from "@/lib/drive/urls";
import type { DriveEditorFile, EditorTreeNode } from "@/lib/pdf-editor/types";

interface MatchPeekOptions {
  focused: EditorPaneView;
  isSpacePanning: boolean;
  match: EditorTreeNode | null;
  tools: EditorTools;
}

/** Holding M shows the match of the file in the pane with focus over that
 * pane, on the same page, and letting go shows the pane as it was. The
 * match has a session of its own, so the pane underneath never moves. */
export function useMatchPeek({
  focused,
  isSpacePanning,
  match,
  tools,
}: MatchPeekOptions): EditorPaneView | null {
  // No peeking at the answers while the exam on this file runs.
  const isHeld = useHeldKey(
    MATCH_PEEK_HOTKEY_KEY,
    match !== null && !focused.session.exam.isRunning
  );
  const node = useMemo<DriveEditorFile | null>(
    () =>
      isHeld && match
        ? {
            id: match.id,
            name: match.name,
            parentId: match.parentId,
            source: "drive",
            webViewLink: buildDriveFileUrl(match.id),
          }
        : null,
    [isHeld, match]
  );
  const session = useEditorSession({
    isSpacePanning,
    node,
    startPage: node ? focused.session.navigation.activeIndex : undefined,
    tools,
  });
  return node ? { node, session, side: focused.side } : null;
}
