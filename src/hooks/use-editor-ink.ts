import type { EditorTools } from "@/hooks/use-editor-tools";
import type { ToolSettings } from "@/lib/pdf-editor/types";

interface EditorInkOptions {
  /** The file's own recolor, which also recolors its selected markup. */
  changeColor: (color: string) => void;
  isSpacePanning: boolean;
  tools: EditorTools;
}

/** The ink the toolbar edits and the settings the pages draw with, worked out
 * from the tools every file shares. */
export function useEditorInk({
  changeColor,
  isSpacePanning,
  tools,
}: EditorInkOptions) {
  // The highlighter keeps its own ink, so picking a marker shade leaves the
  // pen's color alone, and the toolbar edits whichever the tool in hand uses.
  const isHighlighter = tools.tool === "highlight";
  const ink = {
    changeColor: isHighlighter ? tools.setHighlightColor : changeColor,
    changeStrokeWidth: isHighlighter
      ? tools.setHighlightWidth
      : tools.setStrokeWidth,
    color: isHighlighter ? tools.highlightColor : tools.color,
    strokeWidth: isHighlighter ? tools.highlightWidth : tools.strokeWidth,
  };

  // The pages draw with the borrowed hand while the toolbar keeps showing the
  // tool the reader picked, which is what they get back when Space comes up.
  const settings: ToolSettings = {
    color: ink.color,
    fontSize: tools.fontSize,
    strokeWidth: ink.strokeWidth,
    tool: isSpacePanning ? "hand" : tools.tool,
  };

  return { ink, settings };
}
