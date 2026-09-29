import type { EditorTool } from "./types";

/** Tools that put ink down, and so take a color. A cover and a note have their own. */
const OWN_COLOR_TOOLS: ReadonlySet<EditorTool> = new Set([
  "clip",
  "cover",
  "eraser",
  "hand",
  "note",
  "select",
]);

export function usesColor(tool: EditorTool): boolean {
  return !OWN_COLOR_TOOLS.has(tool);
}

/** Tools that draw a line, and so take a width. Text takes a size instead. */
export function usesStrokeWidth(tool: EditorTool): boolean {
  return usesColor(tool) && tool !== "text";
}
