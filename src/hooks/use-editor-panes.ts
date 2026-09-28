import {
  type EditorSession,
  useEditorSession,
} from "@/hooks/use-editor-session";
import type { EditorTools } from "@/hooks/use-editor-tools";
import type {
  EditorFile,
  EditorPaneSide,
  EditorSearch,
} from "@/lib/pdf-editor/types";

interface EditorPanesOptions {
  beside: EditorFile | null;
  focus: EditorSearch["focus"];
  isSpacePanning: boolean;
  node: EditorFile | null;
  tools: EditorTools;
}

/** A pane on screen: its file, and the session holding that file. */
export interface EditorPaneView {
  node: EditorFile | null;
  session: EditorSession;
  side: EditorPaneSide;
}

/** The one or two files on screen, and which has focus. Both sessions always
 * run, the second idle while nothing is beside, since hooks cannot come and
 * go; a session with no file costs next to nothing. */
export function useEditorPanes({
  beside,
  focus,
  isSpacePanning,
  node,
  tools,
}: EditorPanesOptions) {
  const primarySession = useEditorSession({ isSpacePanning, node, tools });
  const besideSession = useEditorSession({
    isSpacePanning,
    node: beside,
    tools,
  });
  const primary: EditorPaneView = {
    node,
    session: primarySession,
    side: "primary",
  };
  if (!beside) {
    const sides: Partial<Record<string, EditorPaneSide>> = {};
    return { focused: primary, other: null, panes: [primary], sides };
  }
  const second: EditorPaneView = {
    node: beside,
    session: besideSession,
    side: "beside",
  };
  const isBesideFocused = focus === "beside";
  // Which side each file on screen sits on, for marking its tab.
  const sides: Partial<Record<string, EditorPaneSide>> = {
    [beside.id]: "beside",
  };
  if (node) {
    sides[node.id] = "primary";
  }
  return {
    focused: isBesideFocused ? second : primary,
    other: isBesideFocused ? primary : second,
    panes: [primary, second],
    sides,
  };
}
