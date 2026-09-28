import { describe, expect, it } from "vitest";
import { buildCover, buildShape } from "./build-annotation";
import {
  isEveryCoverRevealed,
  listCoverIds,
  toggleRevealed,
} from "./cover-reveal";
import type { ToolSettings } from "./types";

const SETTINGS: ToolSettings = {
  color: "#000000",
  fontSize: 16,
  strokeWidth: 2,
  tool: "rect",
};

describe("listCoverIds", () => {
  it("lists covers and nothing else", () => {
    const cover = buildCover({ x: 0, y: 0 }, { x: 10, y: 10 }, "p0");
    const box = buildShape(
      "rect",
      { x: 0, y: 0 },
      { x: 10, y: 10 },
      "p0",
      SETTINGS
    );

    expect(listCoverIds([box, cover])).toEqual([cover.id]);
  });
});

describe("toggleRevealed", () => {
  it("reveals a hidden cover and hides a revealed one", () => {
    const once = toggleRevealed(new Set(), "a");
    const twice = toggleRevealed(once, "a");

    expect(once.has("a")).toBe(true);
    expect(twice.has("a")).toBe(false);
  });

  it("leaves the set it was given alone", () => {
    const revealed = new Set(["a"]);

    toggleRevealed(revealed, "b");

    expect([...revealed]).toEqual(["a"]);
  });
});

describe("isEveryCoverRevealed", () => {
  it("is true only when every cover is showing", () => {
    expect(isEveryCoverRevealed(["a", "b"], new Set(["a"]))).toBe(false);
    expect(isEveryCoverRevealed(["a", "b"], new Set(["a", "b"]))).toBe(true);
  });

  it("is false with no covers at all", () => {
    expect(isEveryCoverRevealed([], new Set())).toBe(false);
  });
});
