import { PanelLeftIcon } from "lucide-react";
import { OpenInDriveButton } from "@/components/drive/open-in-drive-button";
import { EditorBrand } from "@/components/pdf-editor/editor-brand";
import { FullscreenButton } from "@/components/pdf-editor/fullscreen-button";
import { Button } from "@/components/ui/button";
import { EDITOR_EMPTY_TITLE } from "@/config/pdf-editor";
import type { DriveNode } from "@/lib/drive/types";

interface EditorFileBarProps {
  isBrowserOpen: boolean;
  isFullscreen: boolean;
  isFullscreenSupported: boolean;
  node: DriveNode | null;
  onToggleBrowser: () => void;
  onToggleFullscreen: () => void;
}

export function EditorFileBar({
  isBrowserOpen,
  isFullscreen,
  isFullscreenSupported,
  node,
  onToggleBrowser,
  onToggleFullscreen,
}: EditorFileBarProps) {
  const title = node ? node.name : EDITOR_EMPTY_TITLE;

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b-2 bg-background p-3">
      <div className="flex min-w-0 items-center gap-3">
        <Button
          aria-label={isBrowserOpen ? "Hide files" : "Show files"}
          aria-pressed={isBrowserOpen}
          onClick={onToggleBrowser}
          size="icon"
          variant="outline"
        >
          <PanelLeftIcon />
        </Button>
        <h1 className="min-w-0 truncate font-head text-sm sm:text-base">
          {title}
        </h1>
      </div>

      <EditorBrand />

      <div className="flex items-stretch justify-end gap-2">
        {node ? <OpenInDriveButton href={node.webViewLink} /> : null}
        {isFullscreenSupported ? (
          <FullscreenButton
            isFullscreen={isFullscreen}
            onToggle={onToggleFullscreen}
          />
        ) : null}
      </div>
    </div>
  );
}
