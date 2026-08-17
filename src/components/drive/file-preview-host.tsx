import { useEffect } from "react";
import { FileMissingDialog } from "@/components/drive/file-missing-dialog";
import { FilePreviewDialog } from "@/components/drive/file-preview-dialog";
import { useRecentNodes } from "@/components/providers/recent-nodes-provider";
import { useFilePreview } from "@/hooks/use-file-preview";
import type { DriveNode } from "@/lib/drive/types";

interface FilePreviewHostProps {
  nodes: DriveNode[];
}

/** Renders whichever file the URL asks for, so every route shows previews the same way. */
export function FilePreviewHost({ nodes }: FilePreviewHostProps) {
  const { handleOpenChange, node, requestedId } = useFilePreview(nodes);
  const { record } = useRecentNodes();

  // Opening a preview is the act worth remembering; visiting the folder is not.
  useEffect(() => {
    if (node) {
      record(node.id);
    }
  }, [node, record]);

  if (!requestedId) {
    return null;
  }

  if (!node) {
    return <FileMissingDialog onOpenChange={handleOpenChange} open />;
  }

  return <FilePreviewDialog node={node} onOpenChange={handleOpenChange} open />;
}
