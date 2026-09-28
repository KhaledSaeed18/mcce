import {
  degrees,
  PDFArray,
  PDFDict,
  PDFDocument,
  PDFHexString,
  PDFName,
  type PDFNumber,
} from "pdf-lib";
import { describe, expect, it } from "vitest";
import { NOTE_SIZE } from "@/config/pdf-editor";
import { buildPages } from "../pages";
import type { NoteAnnotation } from "../types";
import { buildAnnotatedPdf } from "./build-annotated-pdf";

const NOTE: NoteAnnotation = {
  color: "#ffd60a",
  id: "n",
  pageId: "p0",
  text: "Check the sign of the second term",
  type: "note",
  x: 10,
  y: 20,
};

async function exportNote(note: NoteAnnotation, rotation = 0) {
  const source = await PDFDocument.create();
  source.addPage([100, 200]).setRotation(degrees(rotation));
  const bytes = await source.save();
  const out = await buildAnnotatedPdf(
    bytes.buffer as ArrayBuffer,
    [note],
    buildPages(1)
  );
  const pdf = await PDFDocument.load(out);
  const annots = pdf.getPage(0).node.Annots();
  const annot = annots ? pdf.context.lookup(annots.get(0), PDFDict) : null;
  return { annot, count: annots?.size() ?? 0 };
}

function readRect(annot: PDFDict): number[] {
  const rect = annot.lookup(PDFName.of("Rect"), PDFArray);
  return rect.asArray().map((value) => (value as PDFNumber).asNumber());
}

describe("attachNote", () => {
  it("writes a note as a sticky note that holds its text", async () => {
    const { annot, count } = await exportNote(NOTE);

    expect(count).toBe(1);
    expect(annot?.get(PDFName.of("Subtype"))).toBe(PDFName.of("Text"));
    const contents = annot?.lookup(PDFName.of("Contents"), PDFHexString);
    expect(contents?.decodeText()).toBe(NOTE.text);
  });

  it("keeps text in any script", async () => {
    const { annot } = await exportNote({ ...NOTE, text: "راجع الإشارة" });

    const contents = annot?.lookup(PDFName.of("Contents"), PDFHexString);
    expect(contents?.decodeText()).toBe("راجع الإشارة");
  });

  it("places the icon where the note sits, flipped to count from the bottom", async () => {
    const { annot } = await exportNote(NOTE);

    expect(annot && readRect(annot)).toEqual([
      10,
      200 - 20 - NOTE_SIZE,
      10 + NOTE_SIZE,
      200 - 20,
    ]);
  });

  it("places the icon through a page's own turn", async () => {
    const { annot } = await exportNote(NOTE, 90);

    // Read turned, the page is 200 wide and 100 tall; its content runs the other way.
    expect(annot && readRect(annot)).toEqual([
      20,
      10,
      20 + NOTE_SIZE,
      10 + NOTE_SIZE,
    ]);
  });
});
