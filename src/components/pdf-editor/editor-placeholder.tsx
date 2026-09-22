import { EditorIdleState } from "@/components/pdf-editor/editor-idle-state";
import { EditorStatus } from "@/components/pdf-editor/editor-status";
import type { PdfLoadStatus } from "@/hooks/use-pdf-document";
import type { DriveNode } from "@/lib/drive/types";

interface EditorPlaceholderProps {
  isBrowserOpen: boolean;
  nodes: DriveNode[];
  onShowFiles: () => void;
  status: PdfLoadStatus;
}

/** What fills the document area while there are no pages to draw. */
export function EditorPlaceholder({
  isBrowserOpen,
  nodes,
  onShowFiles,
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

  return <EditorStatus status={status} />;
}
