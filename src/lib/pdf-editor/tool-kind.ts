import type { EditorTool } from "./types";

/** Tools that put ink down from the toolbar. A cover and a note have their own
 * color, and text is styled from the toolbar beside it. */
const OWN_COLOR_TOOLS: ReadonlySet<EditorTool> = new Set([
  "clip",
  "cover",
  "eraser",
  "hand",
  "note",
  "select",
  "text",
]);

export function usesColor(tool: EditorTool): boolean {
  return !OWN_COLOR_TOOLS.has(tool);
}

/** Tools that draw a line, and so take a width. */
export function usesStrokeWidth(tool: EditorTool): boolean {
  return usesColor(tool);
}
