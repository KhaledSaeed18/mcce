import { describe, expect, it } from "vitest";
import { NOTE_SIZE, PAGE_INSET } from "@/config/pdf-editor";
import { buildNote } from "./build-note";

const PAGE = { height: 200, width: 100 };

describe("buildNote", () => {
  it("pins an empty note where the page was pressed", () => {
    expect(buildNote({ x: 20, y: 30 }, "p0", PAGE)).toMatchObject({
      pageId: "p0",
      text: "",
      type: "note",
      x: 20,
      y: 30,
    });
  });

  it("pulls a note pressed at the edge back onto the page", () => {
    const note = buildNote({ x: 100, y: 200 }, "p0", PAGE);

    expect(note.x).toBe(100 - PAGE_INSET - NOTE_SIZE);
    expect(note.y).toBe(200 - PAGE_INSET - NOTE_SIZE);
  });

  it("keeps only where the note is, not the size of its icon", () => {
    expect(buildNote({ x: 0, y: 0 }, "p0", PAGE)).not.toHaveProperty("width");
  });
});
