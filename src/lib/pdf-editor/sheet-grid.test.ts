import { describe, expect, it } from "vitest";
import { SHEET_GRID_SPACING } from "@/config/pdf-editor";
import { getGridLines } from "./sheet-grid";

describe("getGridLines", () => {
  it("rules a line every square, leaving the edges bare", () => {
    const lines = getGridLines(SHEET_GRID_SPACING * 3);

    expect(lines).toHaveLength(2);
    expect(lines[0]).toBeCloseTo(SHEET_GRID_SPACING);
    expect(lines[1]).toBeCloseTo(SHEET_GRID_SPACING * 2);
  });

  it("rules nothing on a side shorter than one square", () => {
    expect(getGridLines(SHEET_GRID_SPACING / 2)).toEqual([]);
  });
});
