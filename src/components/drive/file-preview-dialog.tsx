import {
  BookmarkCheckIcon,
  BookmarkIcon,
  CheckIcon,
  CopyIcon,
  ExternalLinkIcon,
} from "lucide-react";
import { useCallback } from "react";
import { PreviewFallback } from "@/components/drive/preview-fallback";
import { PreviewLoadingState } from "@/components/drive/preview-loading-state";
import { useSavedNodes } from "@/components/providers/saved-nodes-provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { usePreviewLoadState } from "@/hooks/use-preview-load-state";
import type { DriveNode } from "@/lib/drive/types";

const COPY_BLOCKED_MESSAGE =
  "Copying was blocked. Use Open in Google Drive instead.";

const GOOGLE_NATIVE_PREVIEW_PATH: Record<string, string> = {
  "application/vnd.google-apps.document": "document",
  "application/vnd.google-apps.presentation": "presentation",
  "application/vnd.google-apps.spreadsheet": "spreadsheets",
};

const NON_PREVIEWABLE_KINDS = new Set(["archive", "other"]);

function buildPreviewUrl(node: DriveNode): string | null {
  const nativePath = GOOGLE_NATIVE_PREVIEW_PATH[node.mimeType];
  if (nativePath) {
    return `https://docs.google.com/${nativePath}/d/${node.id}/preview`;
  }
  if (NON_PREVIEWABLE_KINDS.has(node.kind)) {
    return null;
  }
  return `https://drive.google.com/file/d/${node.id}/preview`;
}

interface FilePreviewDialogProps {
  node: DriveNode;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

export function FilePreviewDialog({
  node,
  open,
  onOpenChange,
}: FilePreviewDialogProps) {
  const { copy, hasFailed, isCopied } = useCopyToClipboard();
  const { isSaved, toggle } = useSavedNodes();
  const handleToggleSaved = useCallback(
    () => toggle(node.id),
    [node.id, toggle]
  );
  const previewUrl = buildPreviewUrl(node);
  const { status, handleLoad } = usePreviewLoadState(open, previewUrl);
  // Kept mounted through a timeout: a slow embed that arrives late then
  // replaces the message instead of being stuck behind it forever.
  const canEmbed = Boolean(previewUrl);

  const handleCopyLink = useCallback(
    () => copy(node.webViewLink),
    [copy, node.webViewLink]
  );

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="flex h-[80vh] flex-col sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="truncate">{node.name}</DialogTitle>
        </DialogHeader>

        <div className="relative min-h-0 flex-1 overflow-hidden rounded border-2">
          {canEmbed ? (
            /* onLoad is a lifecycle event marking when the embed finished loading, not a user interaction. */
            /* biome-ignore lint/a11y/noNoninteractiveElementInteractions: see comment above */
            <iframe
              className="size-full"
              onLoad={handleLoad}
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-popups-to-escape-sandbox"
              src={previewUrl ?? undefined}
              title={node.name}
            />
          ) : null}
          {status === "loading" ? <PreviewLoadingState /> : null}
          {status === "timed-out" || status === "unsupported" ? (
            <PreviewFallback slow={status === "timed-out"} />
          ) : null}
        </div>

        {hasFailed ? (
          <p className="text-destructive text-xs" role="alert">
            {COPY_BLOCKED_MESSAGE}
          </p>
        ) : null}

        <DialogFooter>
          <Button
            aria-pressed={isSaved(node.id)}
            onClick={handleToggleSaved}
            variant="outline"
          >
            {isSaved(node.id) ? (
              <BookmarkCheckIcon data-icon="inline-start" />
            ) : (
              <BookmarkIcon data-icon="inline-start" />
            )}
            {isSaved(node.id) ? "Saved" : "Save"}
          </Button>
          <Button onClick={handleCopyLink} variant="outline">
            {isCopied ? (
              <CheckIcon data-icon="inline-start" />
            ) : (
              <CopyIcon data-icon="inline-start" />
            )}
            {isCopied ? "Copied" : "Copy link"}
          </Button>
          <Button
            nativeButton={false}
            render={
              <a href={node.webViewLink} rel="noopener" target="_blank" />
            }
          >
            <ExternalLinkIcon data-icon="inline-start" />
            Open in Google Drive
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
