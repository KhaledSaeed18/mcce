import { describe, expect, it } from "vitest";
import { PAGE_QUARTER_TURN } from "@/config/pdf-editor";
import { mergeLineBoxes } from "./line-boxes";
import { toPageBox } from "./page-box";

describe("mergeLineBoxes", () => {
  it("joins the runs of one line into a single band", () => {
    const merged = mergeLineBoxes([
      { height: 10, width: 30, x: 0, y: 100 },
      { height: 10, width: 5, x: 30, y: 100 },
      { height: 12, width: 40, x: 35, y: 99 },
    ]);
    expect(merged).toEqual([{ height: 12, width: 75, x: 0, y: 99 }]);
  });

  it("keeps separate lines apart, top to bottom", () => {
    const merged = mergeLineBoxes([
      { height: 10, width: 50, x: 0, y: 120 },
      { height: 10, width: 80, x: 0, y: 100 },
    ]);
    expect(merged.map((box) => box.y)).toEqual([100, 120]);
  });
});

describe("toPageBox", () => {
  const size = { height: 800, width: 600 };

  it("scales a box on an upright page back by the zoom", () => {
    expect(
      toPageBox({ height: 20, width: 100, x: 50, y: 40 }, 2, size, 0)
    ).toEqual({ height: 10, width: 50, x: 25, y: 20 });
  });

  it("turns a box on a page turned a quarter back onto the upright page", () => {
    // On a quarter-turned page the reader's top-left is the upright page's bottom-left.
    const box = toPageBox(
      { height: 50, width: 100, x: 0, y: 0 },
      1,
      size,
      PAGE_QUARTER_TURN
    );
    expect(box).toEqual({ height: 100, width: 50, x: 0, y: 700 });
  });
});
