import { describe, expect, it } from "vitest";
import { PASTE_OFFSET } from "@/config/pdf-editor";
import { pasteAnnotation } from "./paste-annotation";
import type { Annotation } from "./types";

const SQUARE: Annotation = {
  color: "#000000",
  height: 40,
  id: "rect",
  pageId: "p0",
  strokeWidth: 2,
  type: "rect",
  width: 40,
  x: 100,
  y: 100,
};

describe("pasteAnnotation", () => {
  it("gives the copy its own identity on the page it is pasted to", () => {
    const copy = pasteAnnotation(SQUARE, "p3", 1);
    expect(copy.id).not.toBe(SQUARE.id);
    expect(copy.pageId).toBe("p3");
  });

  it("steps each further paste down from the original", () => {
    const second = pasteAnnotation(SQUARE, "p0", 2);
    expect(second).toMatchObject({
      x: 100 + PASTE_OFFSET * 2,
      y: 100 + PASTE_OFFSET * 2,
    });
  });
});
