import { Link } from "@tanstack/react-router";
import { ExternalLinkIcon, MonitorIcon } from "lucide-react";
import { LogoMark } from "@/components/logo-mark";
import { Button } from "@/components/ui/button";
import { EDITOR_HEIGHT_CLASS, EDITOR_MIN_WIDTH_PX } from "@/config/pdf-editor";
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
      <LogoMark className="size-28" />

      <div className="flex max-w-sm flex-col gap-2">
        <MonitorIcon
          aria-hidden="true"
          className="mx-auto size-8 text-muted-foreground"
        />
        <h1 className="font-head text-2xl">Large display required</h1>
        <p className="text-muted-foreground text-sm">
          The PDF editor needs at least {EDITOR_MIN_WIDTH_PX}px of horizontal
          space to display the markup toolbar and document workspace.
        </p>
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
