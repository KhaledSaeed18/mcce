import { describe, expect, it } from "vitest";
import { MIN_PANE_WIDTH } from "@/config/pdf-editor";
import {
  clampSplitRatio,
  parseSplitRatio,
  snapSplitRatio,
} from "./split-ratio";

describe("clampSplitRatio", () => {
  it("keeps both panes at least their narrowest width", () => {
    const width = MIN_PANE_WIDTH * 4;

    expect(clampSplitRatio(0.1, width)).toBe(0.25);
    expect(clampSplitRatio(0.9, width)).toBe(0.75);
    expect(clampSplitRatio(0.6, width)).toBe(0.6);
  });

  it("splits evenly when there is no room for two narrowest panes", () => {
    expect(clampSplitRatio(0.8, MIN_PANE_WIDTH)).toBe(0.5);
  });
});

describe("snapSplitRatio", () => {
  it("settles near the middle and leaves the rest alone", () => {
    expect(snapSplitRatio(0.52)).toBe(0.5);
    expect(snapSplitRatio(0.6)).toBe(0.6);
  });
});

describe("parseSplitRatio", () => {
  it("takes a share of the width and nothing else", () => {
    expect(parseSplitRatio(0.4)).toBe(0.4);
    expect(parseSplitRatio(1.2)).toBe(0.5);
    expect(parseSplitRatio("0.4")).toBe(0.5);
  });
});
