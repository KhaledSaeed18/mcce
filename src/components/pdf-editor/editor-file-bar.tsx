import {
  CircleHelpIcon,
  GalleryVerticalEndIcon,
  PanelLeftIcon,
  PanelRightIcon,
} from "lucide-react";
import type { ReactNode } from "react";
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
  STUDY_PANEL_HIDE_LABEL,
  STUDY_PANEL_SHOW_LABEL,
} from "@/config/pdf-editor";
import { EDITOR_HELP_LABEL } from "@/config/pdf-editor-help";
import { withShortcut } from "@/lib/pdf-editor/shortcut-label";
import type { EditorFile, SaveStatus } from "@/lib/pdf-editor/types";
import { cn } from "@/lib/utils";

interface EditorFileBarProps {
  /** The tab strip, which takes the middle of the bar once any file is open. */
  children: ReactNode;
  hasTabs: boolean;
  isBrowserOpen: boolean;
  isFullscreen: boolean;
  isFullscreenSupported: boolean;
  isRailOpen: boolean;
  isStudyOpen: boolean;
  node: EditorFile | null;
  onOpenHelp: () => void;
  onToggleBrowser: () => void;
  onToggleFullscreen: () => void;
  onToggleRail: () => void;
  onToggleStudy: () => void;
  /** Absent until a file is open and its markup has somewhere to go. */
  saveStatus: SaveStatus | null;
}

export function EditorFileBar({
  children,
  hasTabs,
  isBrowserOpen,
  isFullscreen,
  isFullscreenSupported,
  isRailOpen,
  isStudyOpen,
  node,
  onOpenHelp,
  onToggleBrowser,
  onToggleFullscreen,
  onToggleRail,
  onToggleStudy,
  saveStatus,
}: EditorFileBarProps) {
  const title = node ? node.name : EDITOR_EMPTY_TITLE;
  const studyLabel = isStudyOpen
    ? STUDY_PANEL_HIDE_LABEL
    : STUDY_PANEL_SHOW_LABEL;

  return (
    <div className="flex items-center gap-3 border-b-2 bg-background p-3">
      <div className="flex shrink-0 items-center gap-2">
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
        <EditorBrand />
      </div>

      {/* The active tab shows the title once there are tabs, so the heading is
          kept for screen readers only. */}
      <h1
        className={cn(
          "min-w-0 truncate font-head text-xs sm:text-sm",
          hasTabs ? "sr-only" : "flex-1"
        )}
      >
        {title}
      </h1>
      {children}

      <div className="flex shrink-0 items-center justify-end gap-2">
        {saveStatus ? <EditorSaveStatus status={saveStatus} /> : null}
        {node ? (
          <Button
            aria-label={studyLabel}
            aria-pressed={isStudyOpen}
            className={EDITOR_HEADER_ICON_BUTTON_CLASS}
            onClick={onToggleStudy}
            size="icon"
            title={studyLabel}
            variant="outline"
          >
            <PanelRightIcon />
          </Button>
        ) : null}
        {node?.source === "drive" ? (
          <OpenInDriveButton href={node.webViewLink} />
        ) : null}
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
