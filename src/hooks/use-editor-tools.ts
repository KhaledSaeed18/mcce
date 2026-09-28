import { useCallback, useRef, useState } from "react";
import {
  DEFAULT_COLOR,
  DEFAULT_FONT_SIZE,
  DEFAULT_HIGHLIGHT_COLOR,
  DEFAULT_HIGHLIGHT_WIDTH,
  DEFAULT_STROKE_WIDTH,
  DEFAULT_TOOL,
} from "@/config/pdf-editor";
import type { EditorTool } from "@/lib/pdf-editor/types";

/** The tool in hand and the ink it draws with, shared by every open file. */
export function useEditorTools() {
  const [tool, setToolState] = useState<EditorTool>(DEFAULT_TOOL);
  // The clip tool hands the pointer back once a box is drawn.
  const previousRef = useRef<EditorTool>(DEFAULT_TOOL);
  const toolRef = useRef<EditorTool>(DEFAULT_TOOL);
  const setTool = useCallback((next: EditorTool) => {
    if (next !== toolRef.current) {
      previousRef.current = toolRef.current;
      toolRef.current = next;
    }
    setToolState(next);
  }, []);
  const restoreTool = useCallback(
    () => setTool(previousRef.current),
    [setTool]
  );
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
    restoreTool,
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

export type EditorTools = ReturnType<typeof useEditorTools>;
