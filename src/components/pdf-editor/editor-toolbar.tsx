import { ColorSwatches } from "@/components/pdf-editor/color-swatches";
import { ExportButton } from "@/components/pdf-editor/export-button";
import { HistoryControls } from "@/components/pdf-editor/history-controls";
import { PageControls } from "@/components/pdf-editor/page-controls";
import { SizeSelect } from "@/components/pdf-editor/size-select";
import { ToolPicker } from "@/components/pdf-editor/tool-picker";
import { ZoomControls } from "@/components/pdf-editor/zoom-controls";
import { Separator } from "@/components/ui/separator";
import {
  EDITOR_CONTROL_HEIGHT_CLASS,
  FONT_SIZES,
  STROKE_WIDTHS,
} from "@/config/pdf-editor";
import type { PdfExportStatus } from "@/hooks/use-pdf-export";
import type {
  EditorTool,
  PageNavigation,
  ZoomControl,
} from "@/lib/pdf-editor/types";

interface EditorToolbarProps {
  canRedo: boolean;
  canUndo: boolean;
  color: string;
  exportStatus: PdfExportStatus;
  fontSize: number;
  navigation: PageNavigation;
  onClear: () => void;
  onColorChange: (color: string) => void;
  onExport: () => void;
  onFontSizeChange: (size: number) => void;
  onRedo: () => void;
  onStrokeWidthChange: (width: number) => void;
  onToolChange: (tool: EditorTool) => void;
  onUndo: () => void;
  strokeWidth: number;
  tool: EditorTool;
  zoom: ZoomControl;
}

export function EditorToolbar({
  canRedo,
  canUndo,
  color,
  exportStatus,
  fontSize,
  onClear,
  onColorChange,
  onExport,
  onFontSizeChange,
  onRedo,
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
      <Separator
        className={EDITOR_CONTROL_HEIGHT_CLASS}
        orientation="vertical"
      />
      <ColorSwatches onSelect={onColorChange} value={color} />
      {tool === "text" ? (
        <SizeSelect
          label="Text size"
          onValueChange={onFontSizeChange}
          options={FONT_SIZES}
          suffix="px"
          value={fontSize}
        />
      ) : (
        <SizeSelect
          label="Stroke width"
          onValueChange={onStrokeWidthChange}
          options={STROKE_WIDTHS}
          suffix="px"
          value={strokeWidth}
        />
      )}
      <Separator
        className={EDITOR_CONTROL_HEIGHT_CLASS}
        orientation="vertical"
      />
      <HistoryControls
        canRedo={canRedo}
        canUndo={canUndo}
        onClear={onClear}
        onRedo={onRedo}
        onUndo={onUndo}
      />
      <Separator
        className={EDITOR_CONTROL_HEIGHT_CLASS}
        orientation="vertical"
      />
      {navigation.pageCount > 0 ? <PageControls {...navigation} /> : null}
      <ZoomControls {...zoom} />
      <ExportButton onExport={onExport} status={exportStatus} />
    </div>
  );
}
