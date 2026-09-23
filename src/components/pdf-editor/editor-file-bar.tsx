import {
  CircleHelpIcon,
  GalleryVerticalEndIcon,
  PanelLeftIcon,
} from "lucide-react";
import { OpenInDriveButton } from "@/components/drive/open-in-drive-button";
import { EditorBrand } from "@/components/pdf-editor/editor-brand";
import { EditorSaveStatus } from "@/components/pdf-editor/editor-save-status";
import { FullscreenButton } from "@/components/pdf-editor/fullscreen-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import {
  EDITOR_EMPTY_TITLE,
  EDITOR_HEADER_ICON_BUTTON_CLASS,
  SHORTCUT_HINTS,
} from "@/config/pdf-editor";
import { EDITOR_HELP_LABEL } from "@/config/pdf-editor-help";
import { withShortcut } from "@/lib/pdf-editor/shortcut-label";
import type { EditorFile, SaveStatus } from "@/lib/pdf-editor/types";

interface EditorFileBarProps {
  isBrowserOpen: boolean;
  isFullscreen: boolean;
  isFullscreenSupported: boolean;
  isRailOpen: boolean;
  node: EditorFile | null;
  onOpenHelp: () => void;
  onToggleBrowser: () => void;
  onToggleFullscreen: () => void;
  onToggleRail: () => void;
  /** Absent until a file is open and its markup has somewhere to go. */
  saveStatus: SaveStatus | null;
}

export function EditorFileBar({
  isBrowserOpen,
  isFullscreen,
  isFullscreenSupported,
  isRailOpen,
  node,
  onOpenHelp,
  onToggleBrowser,
  onToggleFullscreen,
  onToggleRail,
  saveStatus,
}: EditorFileBarProps) {
  const title = node ? node.name : EDITOR_EMPTY_TITLE;

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b-2 bg-background p-3">
      <div className="flex min-w-0 items-center gap-2">
        <Button
          aria-label={isBrowserOpen ? "Hide files" : "Show files"}
          aria-pressed={isBrowserOpen}
          className={EDITOR_HEADER_ICON_BUTTON_CLASS}
          onClick={onToggleBrowser}
          size="icon"
          title={isBrowserOpen ? "Hide files" : "Show files"}
          variant="outline"
        >
          <PanelLeftIcon />
        </Button>
        {node ? (
          <Button
            aria-label={isRailOpen ? "Hide pages" : "Show pages"}
            aria-pressed={isRailOpen}
            className={EDITOR_HEADER_ICON_BUTTON_CLASS}
            onClick={onToggleRail}
            size="icon"
            title={isRailOpen ? "Hide pages" : "Show pages"}
            variant="outline"
          >
            <GalleryVerticalEndIcon />
          </Button>
        ) : null}
        <h1 className="min-w-0 truncate font-head text-xs sm:text-sm">
          {title}
        </h1>
      </div>

      <EditorBrand />

      <div className="flex items-center justify-end gap-2">
        {saveStatus ? <EditorSaveStatus status={saveStatus} /> : null}
        {node ? <OpenInDriveButton href={node.webViewLink} /> : null}
        <Button
          aria-label={EDITOR_HELP_LABEL}
          className={EDITOR_HEADER_ICON_BUTTON_CLASS}
          onClick={onOpenHelp}
          size="icon"
          title={withShortcut(EDITOR_HELP_LABEL, SHORTCUT_HINTS.help)}
          variant="outline"
        >
          <CircleHelpIcon />
        </Button>
        <ThemeSwitcher className={EDITOR_HEADER_ICON_BUTTON_CLASS} />
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
