import { EditorExamDialogs } from "@/components/pdf-editor/editor-exam-dialogs";
import { EditorFileSearch } from "@/components/pdf-editor/editor-file-search";
import { EditorHelpDialog } from "@/components/pdf-editor/editor-help-dialog";
import type { EditorHelp } from "@/hooks/use-editor-help";
import type { EditorPaneView } from "@/hooks/use-editor-panes";
import type { EditorTreeNode, OpenFile } from "@/lib/pdf-editor/types";

interface EditorWorkspaceDialogsProps {
  files: OpenFile[];
  help: EditorHelp;
  nodes: EditorTreeNode[];
  onOpenBeside: (file: OpenFile) => void;
  onShow: (file: OpenFile) => void;
  panes: EditorPaneView[];
}

/** The dialogs the workspace opens over everything: help, search across
 * files, and each pane's time-up notice. */
export function EditorWorkspaceDialogs({
  files,
  help,
  nodes,
  onOpenBeside,
  onShow,
  panes,
}: EditorWorkspaceDialogsProps) {
  return (
    <>
      <EditorHelpDialog onOpenChange={help.setIsOpen} open={help.isOpen} />
      <EditorFileSearch
        files={files}
        nodes={nodes}
        onOpenBeside={onOpenBeside}
        onShow={onShow}
        panes={panes}
      />
      <EditorExamDialogs panes={panes} />
    </>
  );
}
