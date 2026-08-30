import { describe, expect, it } from "vitest";
import { findText } from "./move";
import type { Annotation } from "./types";

const TEXT: Annotation = {
  color: "#000000",
  fontSize: 16,
  id: "note",
  pageId: "p0",
  text: "hello",
  type: "text",
  x: 10,
  y: 20,
};

const STROKE: Annotation = {
  color: "#000000",
  id: "line",
  pageId: "p0",
  points: [{ x: 0, y: 0 }],
  type: "pen",
  width: 2,
};

describe("findText", () => {
  it("finds the text with the given id", () => {
    expect(findText([STROKE, TEXT], "note")).toBe(TEXT);
  });

  it("finds nothing when nothing is selected", () => {
    expect(findText([TEXT], null)).toBeNull();
  });

  it("finds nothing when the id is on another page's annotation", () => {
    expect(findText([STROKE], "note")).toBeNull();
  });

  it("ignores an id that belongs to markup which is not text", () => {
    expect(findText([STROKE, TEXT], "line")).toBeNull();
  });
});
