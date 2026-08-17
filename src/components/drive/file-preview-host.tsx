import { FileMissingDialog } from "@/components/drive/file-missing-dialog";
import { FilePreviewDialog } from "@/components/drive/file-preview-dialog";
import { useFilePreview } from "@/hooks/use-file-preview";
import type { DriveNode } from "@/lib/drive/types";

interface FilePreviewHostProps {
  nodes: DriveNode[];
}

/** Renders whichever file the URL asks for, so every route shows previews the same way. */
export function FilePreviewHost({ nodes }: FilePreviewHostProps) {
  const { handleOpenChange, node, requestedId } = useFilePreview(nodes);

  if (!requestedId) {
    return null;
  }

  if (!node) {
    return <FileMissingDialog onOpenChange={handleOpenChange} open />;
  }

  return <FilePreviewDialog node={node} onOpenChange={handleOpenChange} open />;
}
