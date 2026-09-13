import { Link } from "@tanstack/react-router";
import { ExternalLinkIcon, MonitorIcon } from "lucide-react";
import { LogoMark } from "@/components/logo-mark";
import { Button } from "@/components/ui/button";
import { EDITOR_HEIGHT_CLASS } from "@/config/pdf-editor";
import type { DriveNode } from "@/lib/drive/types";
import { cn } from "@/lib/utils";

interface EditorViewportNoticeProps {
  node: DriveNode | null;
}

export function EditorViewportNotice({ node }: EditorViewportNoticeProps) {
  return (
    <main
      className={cn(
        "flex flex-col items-center justify-center gap-6 bg-background p-6 text-center",
        EDITOR_HEIGHT_CLASS
      )}
    >
      <LogoMark className="size-24 sm:size-28" />

      <div className="flex max-w-sm flex-col items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded border-2 border-black bg-primary shadow-sm">
          <MonitorIcon
            aria-hidden="true"
            className="size-5 text-primary-foreground"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <h1 className="font-head text-2xl sm:text-3xl">
            Large display required
          </h1>
          <p className="text-muted-foreground text-sm/relaxed">
            The PDF editor is designed for desktop screens to give you room for
            the document tools and side-by-side workspace. Open this file on a
            wider screen, or view it directly in Google Drive.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button nativeButton={false} render={<Link to="/" />}>
          Back to catalog
        </Button>
        {node ? (
          <Button
            nativeButton={false}
            render={
              <a href={node.webViewLink} rel="noopener" target="_blank" />
            }
            variant="outline"
          >
            <ExternalLinkIcon data-icon="inline-start" />
            Open in Google Drive
          </Button>
        ) : null}
      </div>
    </main>
  );
}
