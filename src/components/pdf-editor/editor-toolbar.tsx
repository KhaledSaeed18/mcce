import { SearchIcon } from "lucide-react";
import type { ReactNode } from "react";
import { BookmarkButton } from "@/components/pdf-editor/bookmark-button";
import { CoversButton } from "@/components/pdf-editor/covers-button";
import { ExamControl } from "@/components/pdf-editor/exam-control";
import { ExportButton } from "@/components/pdf-editor/export-button";
import { HistoryControls } from "@/components/pdf-editor/history-controls";
import { InkControls } from "@/components/pdf-editor/ink-controls";
import { PageControls } from "@/components/pdf-editor/page-controls";
import { ToolPicker } from "@/components/pdf-editor/tool-picker";
import { ZoomControls } from "@/components/pdf-editor/zoom-controls";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  EDITOR_CONTROL_HEIGHT_CLASS,
  SEARCH_LABEL,
  SHORTCUT_HINTS,
} from "@/config/pdf-editor";
import type { CoverControls } from "@/hooks/use-cover-reveal";
import type { ExamTimer } from "@/hooks/use-exam-timer";
import type { PageBookmarks } from "@/hooks/use-page-bookmarks";
import type { PdfExportStatus } from "@/hooks/use-pdf-export";
import { withShortcut } from "@/lib/pdf-editor/shortcut-label";
import type {
  EditorTool,
  PageNavigation,
  ZoomControl,
} from "@/lib/pdf-editor/types";

interface EditorToolbarProps {
  bookmarks: PageBookmarks;
  canClear: boolean;
  canRedo: boolean;
  canRestore: boolean;
  canUndo: boolean;
  /** Controls that act across files, like the clips button. */
  children?: ReactNode;
  color: string;
  covers: CoverControls;
  exam: ExamTimer;
  exportStatus: PdfExportStatus;
  fontSize: number;
  navigation: PageNavigation;
  onClear: () => void;
  onColorChange: (color: string) => void;
  onExport: () => void;
  onFontSizeChange: (size: number) => void;
  onOpenSearch: () => void;
  onRedo: () => void;
  onRestore: () => void;
  onStrokeWidthChange: (width: number) => void;
  onToolChange: (tool: EditorTool) => void;
  onUndo: () => void;
  strokeWidth: number;
  tool: EditorTool;
  zoom: ZoomControl;
}

export function EditorToolbar({
  bookmarks,
  children,
  canClear,
  canRedo,
  canRestore,
  canUndo,
  color,
  covers,
  exam,
  exportStatus,
  fontSize,
  onClear,
  onColorChange,
  onExport,
  onFontSizeChange,
  onRedo,
  onOpenSearch,
  onRestore,
  onStrokeWidthChange,
  onToolChange,
  navigation,
  onUndo,
  strokeWidth,
  tool,
  zoom,
}: EditorToolbarProps) {
  return (
    <div
      aria-label="Markup tools"
      className="flex flex-wrap items-center gap-3 border-b-2 bg-card p-3"
      role="toolbar"
    >
      <ToolPicker onSelect={onToolChange} value={tool} />
      <InkControls
        color={color}
        fontSize={fontSize}
        onColorChange={onColorChange}
        onFontSizeChange={onFontSizeChange}
        onStrokeWidthChange={onStrokeWidthChange}
        strokeWidth={strokeWidth}
        tool={tool}
      />
      <Separator
        className={EDITOR_CONTROL_HEIGHT_CLASS}
        orientation="vertical"
      />
      <HistoryControls
        canClear={canClear}
        canRedo={canRedo}
        canRestore={canRestore}
        canUndo={canUndo}
        onClear={onClear}
        onRedo={onRedo}
        onRestore={onRestore}
        onUndo={onUndo}
      />
      <Separator
        className={EDITOR_CONTROL_HEIGHT_CLASS}
        orientation="vertical"
      />
      {covers.hasCovers ? (
        <CoversButton
          isAllRevealed={covers.isAllRevealed}
          isLocked={covers.isLocked}
          onToggle={covers.toggleAll}
        />
      ) : null}
      <ExamControl exam={exam} />
      <Button
        aria-label={SEARCH_LABEL}
        onClick={onOpenSearch}
        size="icon"
        title={withShortcut(SEARCH_LABEL, SHORTCUT_HINTS.search)}
        variant="outline"
      >
        <SearchIcon />
      </Button>
      {navigation.pageCount > 0 ? <PageControls {...navigation} /> : null}
      <BookmarkButton
        isMarked={bookmarks.isActiveMarked}
        onToggle={bookmarks.toggleActive}
      />
      {children}
      <ZoomControls {...zoom} />
      <ExportButton onExport={onExport} status={exportStatus} />
    </div>
  );
}
