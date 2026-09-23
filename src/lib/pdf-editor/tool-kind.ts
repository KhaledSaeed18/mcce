import type { EditorTool } from "./types";

/** Tools that put ink down, and so take a color. */
export function usesColor(tool: EditorTool): boolean {
  return tool !== "eraser" && tool !== "hand" && tool !== "select";
}

/** Tools that draw a line, and so take a width. Text takes a size instead. */
export function usesStrokeWidth(tool: EditorTool): boolean {
  return usesColor(tool) && tool !== "text";
}
