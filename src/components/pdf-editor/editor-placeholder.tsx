import { EditorIdleState } from "@/components/pdf-editor/editor-idle-state";
import { EditorStatus } from "@/components/pdf-editor/editor-status";
import type { PdfLoadStatus } from "@/hooks/use-pdf-document";
import type { EditorFile, EditorTreeNode } from "@/lib/pdf-editor/types";

interface EditorPlaceholderProps {
  isBrowserOpen: boolean;
  nodes: EditorTreeNode[];
  onRetry: () => void;
  onShowFiles: () => void;
  /** Where the open file came from, which the loading and error copy name. */
  source: EditorFile["source"];
  status: PdfLoadStatus;
}

/** What fills the document area while there are no pages to draw. */
export function EditorPlaceholder({
  isBrowserOpen,
  nodes,
  onRetry,
  onShowFiles,
  source,
  status,
}: EditorPlaceholderProps) {
  if (status === "idle") {
    return (
      <EditorIdleState
        isBrowserOpen={isBrowserOpen}
        nodes={nodes}
        onShowFiles={onShowFiles}
      />
    );
  }

  return <EditorStatus onRetry={onRetry} source={source} status={status} />;
}
