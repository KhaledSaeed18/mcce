import { inflateSync } from "node:zlib";
import { degrees, PDFDocument } from "pdf-lib";
import { describe, expect, it } from "vitest";
import { buildPages } from "../pages";
import type { Annotation } from "../types";
import { buildAnnotatedPdf } from "./build-annotated-pdf";

/** Portrait content, so a page turned a quarter is read the other way round. */
const CONTENT_WIDTH = 100;
const CONTENT_HEIGHT = 200;

const STROKE: Annotation = {
  color: "#e63946",
  id: "s",
  pageId: "p0",
  points: [
    { x: 10, y: 20 },
    { x: 30, y: 40 },
  ],
  type: "pen",
  width: 2,
};

const ARROW: Annotation = {
  color: "#e63946",
  from: { x: 10, y: 100 },
  id: "a",
  pageId: "p0",
  strokeWidth: 2,
  to: { x: 60, y: 100 },
  type: "arrow",
};

/** A stroke operator standing alone on its line, and a switch to a stored graphics state. */
const STROKE_OPERATOR = /^S$/gm;
const GRAPHICS_STATE_OPERATOR = /\/GS-\d+ gs/;

const HIGHLIGHT: Annotation = {
  color: "#ffd60a",
  id: "h",
  pageId: "p0",
  points: [
    { x: 10, y: 20 },
    { x: 30, y: 40 },
    { x: 50, y: 20 },
  ],
  type: "highlight",
  width: 12,
};

async function exportWithPageTurnedBy(
  rotation: number,
  annotation: Annotation = STROKE
): Promise<string> {
  const source = await PDFDocument.create();
  const page = source.addPage([CONTENT_WIDTH, CONTENT_HEIGHT]);
  page.setRotation(degrees(rotation));
  const bytes = await source.save();

  const out = await buildAnnotatedPdf(
    bytes.buffer as ArrayBuffer,
    [annotation],
    buildPages(1)
  );
  return readDrawing(Buffer.from(out));
}

/** The content stream the markup was written into, which is stored compressed. */
function readDrawing(raw: Buffer): string {
  let from = 0;
  for (;;) {
    const open = raw.indexOf("stream\n", from);
    if (open === -1) {
      return "";
    }
    const close = raw.indexOf("endstream", open);
    try {
      const text = inflateSync(raw.subarray(open + "stream\n".length, close));
      const drawing = text.toString("latin1");
      if (drawing.includes(" cm")) {
        return drawing;
      }
    } catch {
      // Not every stream in the file is markup, or even compressed.
    }
    from = close + 1;
  }
}

describe("drawAnnotationOnPage", () => {
  it("flips markup onto a page that carries no turn of its own", async () => {
    const drawing = await exportWithPageTurnedBy(0);

    expect(drawing).toContain("1 0 0 1 0 0 cm");
    // Flipped against the full height of a page that is read upright.
    expect(drawing).toContain("10 180 m");
  });

  it("undoes a page's own turn so markup lands where the reader put it", async () => {
    const drawing = await exportWithPageTurnedBy(90);

    expect(drawing).toContain(`0 1 -1 0 ${CONTENT_WIDTH} 0 cm`);
    // Flipped against the height the page is read at, not the one it is stored at.
    expect(drawing).toContain("10 80 m");
  });

  it("writes an arrow as its line and both sides of its head, all meeting at the tip", async () => {
    const drawing = await exportWithPageTurnedBy(0, ARROW);

    expect(drawing).toContain("10 100 m");
    expect(drawing.match(/60 100 l/g)).toHaveLength(3);
  });

  it("writes a highlight as one see-through path, flipped against the page height", async () => {
    const drawing = await exportWithPageTurnedBy(0, HIGHLIGHT);

    // Anchored at the top of the page and drawn downward, as markup is stored.
    expect(drawing).toContain(`1 0 0 1 0 ${CONTENT_HEIGHT} cm`);
    expect(drawing).toContain("1 0 0 -1 0 0 cm");
    expect(drawing).toContain("10 20 m");
    // One stroke for the whole path, so overlapping segments do not darken.
    expect(drawing.match(STROKE_OPERATOR)).toHaveLength(1);
    expect(drawing).toMatch(GRAPHICS_STATE_OPERATOR);
  });

  it("keeps the turn to itself rather than leaving it on for the page", async () => {
    const drawing = await exportWithPageTurnedBy(90);
    const opened = drawing.indexOf("q");
    const closed = drawing.lastIndexOf("Q");

    expect(opened).toBeGreaterThanOrEqual(0);
    expect(drawing.indexOf(" cm")).toBeGreaterThan(opened);
    expect(closed).toBeGreaterThan(drawing.indexOf(" cm"));
  });
});
