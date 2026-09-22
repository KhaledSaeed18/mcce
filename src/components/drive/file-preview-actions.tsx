import { Link } from "@tanstack/react-router";
import {
  BookmarkCheckIcon,
  BookmarkIcon,
  CheckIcon,
  CopyIcon,
  ExternalLinkIcon,
  HighlighterIcon,
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
  const saveLabel = isSaved ? "Remove from saved" : "Save";
  const copyLabel = isCopied ? "Link copied" : "Copy link";

  return (
    <DialogFooter className="sm:items-center">
      <div className="flex gap-2 sm:mr-auto">
        <Button
          aria-label={saveLabel}
          aria-pressed={isSaved}
          onClick={onToggleSaved}
          size="icon"
          title={saveLabel}
          variant="outline"
        >
          {isSaved ? <BookmarkCheckIcon /> : <BookmarkIcon />}
        </Button>
        <Button
          aria-label={copyLabel}
          onClick={onCopyLink}
          size="icon"
          title={copyLabel}
          variant="outline"
        >
          {isCopied ? <CheckIcon /> : <CopyIcon />}
        </Button>
      </div>
      <Button
        nativeButton={false}
        render={<a href={webViewLink} rel="noopener" target="_blank" />}
        variant={canAnnotate ? "outline" : "default"}
      >
        <ExternalLinkIcon data-icon="inline-start" />
        Open in Google Drive
      </Button>
      {canAnnotate ? (
        <Button
          className="group/annotate"
          nativeButton={false}
          render={
            <Link search={{ file: fileId }} target="_blank" to="/editor" />
          }
        >
          <HighlighterIcon
            className="transition-transform duration-200 group-hover/annotate:-rotate-12 motion-reduce:transition-none"
            data-icon="inline-start"
          />
          Annotate PDF
        </Button>
      ) : null}
    </DialogFooter>
  );
}
