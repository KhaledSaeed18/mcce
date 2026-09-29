import { useEditorHelp } from "@/hooks/use-editor-help";
import { useFileSearchDialog } from "@/hooks/use-file-search-dialog";

/** The dialogs the workspace can open from its bars as well as by key:
 * help, and search across files. */
export function useWorkspaceDialogs() {
  const help = useEditorHelp();
  const fileSearch = useFileSearchDialog();
  return { fileSearch, help };
}

export type WorkspaceDialogs = ReturnType<typeof useWorkspaceDialogs>;
