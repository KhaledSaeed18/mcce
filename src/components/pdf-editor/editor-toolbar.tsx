import { DownloadIcon, LoaderIcon } from "lucide-react";
import { ColorSwatches } from "@/components/pdf-editor/color-swatches";
import { HistoryControls } from "@/components/pdf-editor/history-controls";
import { SizeSelect } from "@/components/pdf-editor/size-select";
import { ToolPicker } from "@/components/pdf-editor/tool-picker";
import { ZoomControls } from "@/components/pdf-editor/zoom-controls";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  EDITOR_CONTROL_HEIGHT_CLASS,
  FONT_SIZES,
  STROKE_WIDTHS,
} from "@/config/pdf-editor";
import type { PdfExportStatus } from "@/hooks/use-pdf-export";
import type { EditorTool } from "@/lib/pdf-editor/types";
import { cn } from "@/lib/utils";

interface EditorToolbarProps {
  canRedo: boolean;
  canUndo: boolean;
  color: string;
  exportStatus: PdfExportStatus;
  fontSize: number;
  onClear: () => void;
  onColorChange: (color: string) => void;
  onExport: () => void;
  onFontSizeChange: (size: number) => void;
  onRedo: () => void;
  onResetZoom: () => void;
  onStrokeWidthChange: (width: number) => void;
  onToolChange: (tool: EditorTool) => void;
  onUndo: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  strokeWidth: number;
  tool: EditorTool;
  zoom: number;
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
  onResetZoom,
  onStrokeWidthChange,
  onToolChange,
  onUndo,
  onZoomIn,
  onZoomOut,
  strokeWidth,
  tool,
  zoom,
}: EditorToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 border-b-2 bg-card p-3">
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
      <ZoomControls
        onReset={onResetZoom}
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        zoom={zoom}
      />
      <Button
        className={cn("ml-auto", EDITOR_CONTROL_HEIGHT_CLASS)}
        disabled={exportStatus === "working"}
        onClick={onExport}
      >
        {exportStatus === "working" ? (
          <LoaderIcon className="animate-spin" data-icon="inline-start" />
        ) : (
          <DownloadIcon data-icon="inline-start" />
        )}
        Download copy
      </Button>
    </div>
  );
}
