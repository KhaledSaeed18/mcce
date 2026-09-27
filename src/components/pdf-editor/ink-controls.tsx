import { ColorSwatches } from "@/components/pdf-editor/color-swatches";
import { SizeSelect } from "@/components/pdf-editor/size-select";
import { Separator } from "@/components/ui/separator";
import {
  ANNOTATION_COLORS,
  EDITOR_CONTROL_HEIGHT_CLASS,
  FONT_SIZES,
  HIGHLIGHT_COLORS,
  HIGHLIGHT_WIDTHS,
  STROKE_WIDTHS,
} from "@/config/pdf-editor";
import { usesColor, usesStrokeWidth } from "@/lib/pdf-editor/tool-kind";
import type { EditorTool } from "@/lib/pdf-editor/types";

interface InkControlsProps {
  color: string;
  fontSize: number;
  onColorChange: (color: string) => void;
  onFontSizeChange: (size: number) => void;
  onStrokeWidthChange: (width: number) => void;
  strokeWidth: number;
  tool: EditorTool;
}

/** The color and size of whatever the tool in hand puts down. Tools that put
 * nothing down show nothing here. */
export function InkControls({
  color,
  fontSize,
  onColorChange,
  onFontSizeChange,
  onStrokeWidthChange,
  strokeWidth,
  tool,
}: InkControlsProps) {
  if (!usesColor(tool)) {
    return null;
  }
  const isHighlighter = tool === "highlight";

  return (
    <>
      <Separator
        className={EDITOR_CONTROL_HEIGHT_CLASS}
        orientation="vertical"
      />
      <ColorSwatches
        colors={isHighlighter ? HIGHLIGHT_COLORS : ANNOTATION_COLORS}
        onSelect={onColorChange}
        value={color}
      />
      {tool === "text" && (
        <SizeSelect
          label="Text size"
          onValueChange={onFontSizeChange}
          options={FONT_SIZES}
          suffix="px"
          value={fontSize}
        />
      )}
      {usesStrokeWidth(tool) && (
        <SizeSelect
          label="Stroke width"
          onValueChange={onStrokeWidthChange}
          options={isHighlighter ? HIGHLIGHT_WIDTHS : STROKE_WIDTHS}
          suffix="px"
          value={strokeWidth}
        />
      )}
    </>
  );
}
