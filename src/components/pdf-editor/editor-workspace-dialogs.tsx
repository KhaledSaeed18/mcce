import { EditorExamDialogs } from "@/components/pdf-editor/editor-exam-dialogs";
import { EditorFileSearch } from "@/components/pdf-editor/editor-file-search";
import { EditorHelpDialog } from "@/components/pdf-editor/editor-help-dialog";
import type { EditorPaneView } from "@/hooks/use-editor-panes";
import type { WorkspaceDialogs } from "@/hooks/use-workspace-dialogs";
import type { EditorTreeNode, OpenFile } from "@/lib/pdf-editor/types";

interface EditorWorkspaceDialogsProps {
  dialogs: WorkspaceDialogs;
  files: OpenFile[];
  nodes: EditorTreeNode[];
  onOpenBeside: (file: OpenFile) => void;
  onShow: (file: OpenFile) => void;
  panes: EditorPaneView[];
}

/** The dialogs the workspace opens over everything: help, search across
 * files, and each pane's time-up notice. */
export function EditorWorkspaceDialogs({
  dialogs,
  files,
  nodes,
  onOpenBeside,
  onShow,
  panes,
}: EditorWorkspaceDialogsProps) {
  return (
    <>
      <EditorHelpDialog
        onOpenChange={dialogs.help.setIsOpen}
        open={dialogs.help.isOpen}
      />
      <EditorFileSearch
        dialog={dialogs.fileSearch}
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
