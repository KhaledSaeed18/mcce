import { Link } from "@tanstack/react-router";
import {
  BookmarkCheckIcon,
  BookmarkIcon,
  CheckIcon,
  CopyIcon,
  ExternalLinkIcon,
  PencilRulerIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface FilePreviewActionsProps {
  canAnnotate: boolean;
  fileId: string;
  isCopied: boolean;
  isSaved: boolean;
  onCopyLink: () => void;
  onToggleSaved: () => void;
  webViewLink: string;
}

export function FilePreviewActions({
  canAnnotate,
  fileId,
  isCopied,
  isSaved,
  onCopyLink,
  onToggleSaved,
  webViewLink,
}: FilePreviewActionsProps) {
  return (
    <DialogFooter>
      <Button aria-pressed={isSaved} onClick={onToggleSaved} variant="outline">
        {isSaved ? (
          <BookmarkCheckIcon data-icon="inline-start" />
        ) : (
          <BookmarkIcon data-icon="inline-start" />
        )}
        {isSaved ? "Saved" : "Save"}
      </Button>
      {canAnnotate ? (
        <Button
          nativeButton={false}
          render={
            <Link search={{ file: fileId }} target="_blank" to="/editor" />
          }
          variant="outline"
        >
          <PencilRulerIcon data-icon="inline-start" />
          Open in editor
        </Button>
      ) : null}
      <Button onClick={onCopyLink} variant="outline">
        {isCopied ? (
          <CheckIcon data-icon="inline-start" />
        ) : (
          <CopyIcon data-icon="inline-start" />
        )}
        {isCopied ? "Copied" : "Copy link"}
      </Button>
      <Button
        nativeButton={false}
        render={<a href={webViewLink} rel="noopener" target="_blank" />}
      >
        <ExternalLinkIcon data-icon="inline-start" />
        Open in Google Drive
      </Button>
    </DialogFooter>
  );
}
