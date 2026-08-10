import { CheckIcon, CopyIcon, ExternalLinkIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import type { DriveNode } from "@/lib/drive/types";

const LOAD_TIMEOUT_MS = 6000;
const COPIED_FEEDBACK_MS = 2000;

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

type PreviewStatus = "loading" | "loaded" | "timed-out";
type CopyStatus = "idle" | "copied" | "failed";

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
  const [status, setStatus] = useState<PreviewStatus>("loading");
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const previewUrl = buildPreviewUrl(node);

  useEffect(() => {
    if (!(open && previewUrl)) {
      setStatus("loading");
      return;
    }

    const timer = setTimeout(() => {
      setStatus((current) => (current === "loading" ? "timed-out" : current));
    }, LOAD_TIMEOUT_MS);

    return () => clearTimeout(timer);
  }, [open, previewUrl]);

  useEffect(() => {
    if (copyStatus === "idle") {
      return;
    }
    const timer = setTimeout(() => setCopyStatus("idle"), COPIED_FEEDBACK_MS);
    return () => clearTimeout(timer);
  }, [copyStatus]);

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(node.webViewLink).then(
      () => setCopyStatus("copied"),
      () => setCopyStatus("failed")
    );
  }, [node.webViewLink]);

  const handleLoad = useCallback(() => setStatus("loaded"), []);

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="flex h-[80vh] flex-col sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="truncate">{node.name}</DialogTitle>
        </DialogHeader>

        <div className="relative min-h-0 flex-1 overflow-hidden rounded border-2 border-black">
          {previewUrl && status !== "timed-out" ? (
            <>
              {status === "loading" && (
                <Skeleton className="absolute inset-0 rounded-none border-0" />
              )}
              {/* onLoad is a lifecycle event marking when the embed finished loading, not a user interaction. */}
              {/* biome-ignore lint/a11y/noNoninteractiveElementInteractions: see comment above */}
              <iframe
                className="size-full"
                onLoad={handleLoad}
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-popups-to-escape-sandbox"
                src={previewUrl}
                title={node.name}
              />
            </>
          ) : (
            <div className="flex size-full flex-col items-center justify-center gap-1 p-6 text-center text-muted-foreground text-sm">
              <p>
                {status === "timed-out"
                  ? "Preview is taking a while to load."
                  : "This file type can't be previewed here."}
              </p>
              <p>Open it in Google Drive instead.</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button onClick={handleCopyLink} variant="outline">
            {copyStatus === "copied" ? (
              <CheckIcon data-icon="inline-start" />
            ) : (
              <CopyIcon data-icon="inline-start" />
            )}
            {copyStatus === "copied" ? "Copied" : "Copy link"}
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
