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

async function exportWithPageTurnedBy(rotation: number): Promise<string> {
  const source = await PDFDocument.create();
  const page = source.addPage([CONTENT_WIDTH, CONTENT_HEIGHT]);
  page.setRotation(degrees(rotation));
  const bytes = await source.save();

  const out = await buildAnnotatedPdf(
    bytes.buffer as ArrayBuffer,
    [STROKE],
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

  it("keeps the turn to itself rather than leaving it on for the page", async () => {
    const drawing = await exportWithPageTurnedBy(90);
    const opened = drawing.indexOf("q");
    const closed = drawing.lastIndexOf("Q");

    expect(opened).toBeGreaterThanOrEqual(0);
    expect(drawing.indexOf(" cm")).toBeGreaterThan(opened);
    expect(closed).toBeGreaterThan(drawing.indexOf(" cm"));
  });
});
