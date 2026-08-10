import { describe, expect, it } from "vitest";
import { formatBytes } from "./format";

describe("formatBytes", () => {
  it("renders an em dash for null or non-positive sizes", () => {
    expect(formatBytes(null)).toBe("—");
    expect(formatBytes(0)).toBe("—");
  });

  it("renders bytes with no decimal", () => {
    expect(formatBytes(512)).toBe("512 B");
  });

  it("renders larger units with one decimal", () => {
    expect(formatBytes(1536)).toBe("1.5 KB");
    expect(formatBytes(13_299_859_460)).toBe("12.4 GB");
  });
});
