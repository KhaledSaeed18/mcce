import { SHEET_GRID_SPACING } from "@/config/pdf-editor";

/** Where the lines of a squared sheet fall along one side of it, leaving the
 * edges themselves bare. */
export function getGridLines(length: number): number[] {
  const lines: number[] = [];
  for (
    let offset = SHEET_GRID_SPACING;
    offset < length;
    offset += SHEET_GRID_SPACING
  ) {
    lines.push(offset);
  }
  return lines;
}
