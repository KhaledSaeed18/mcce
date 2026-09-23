import { useState } from "react";
import {
  DEFAULT_COLOR,
  DEFAULT_FONT_SIZE,
  DEFAULT_HIGHLIGHT_COLOR,
  DEFAULT_HIGHLIGHT_WIDTH,
  DEFAULT_STROKE_WIDTH,
  DEFAULT_TOOL,
} from "@/config/pdf-editor";
import type { EditorTool } from "@/lib/pdf-editor/types";

export function useEditorTools() {
  const [tool, setTool] = useState<EditorTool>(DEFAULT_TOOL);
  const [color, setColor] = useState<string>(DEFAULT_COLOR);
  const [strokeWidth, setStrokeWidth] = useState<number>(DEFAULT_STROKE_WIDTH);
  const [fontSize, setFontSize] = useState<number>(DEFAULT_FONT_SIZE);
  const [highlightColor, setHighlightColor] = useState<string>(
    DEFAULT_HIGHLIGHT_COLOR
  );
  const [highlightWidth, setHighlightWidth] = useState<number>(
    DEFAULT_HIGHLIGHT_WIDTH
  );

  return {
    color,
    fontSize,
    highlightColor,
    highlightWidth,
    setColor,
    setFontSize,
    setHighlightColor,
    setHighlightWidth,
    setStrokeWidth,
    setTool,
    strokeWidth,
    tool,
  };
}
