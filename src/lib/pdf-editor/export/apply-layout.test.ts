import { PDFDocument } from "pdf-lib";
import { describe, expect, it } from "vitest";
import { buildPages } from "../pages";
import type { EditorPage } from "../types";
import { applyLayout } from "./apply-layout";

/** Each page is a different width, which is how they are told apart afterwards. */
async function makeDocument(pageCount: number): Promise<PDFDocument> {
  const pdf = await PDFDocument.create();
  for (let index = 0; index < pageCount; index += 1) {
    pdf.addPage([100 + index, 200]);
  }
  return pdf;
}

function widths(pdf: PDFDocument): number[] {
  return pdf.getPages().map((page) => Math.round(page.getWidth()));
}

describe("applyLayout", () => {
  it("leaves a document the editor has not changed alone", async () => {
    const pdf = await makeDocument(3);

    applyLayout(pdf, buildPages(3));

    expect(widths(pdf)).toEqual([100, 101, 102]);
  });

  it("drops the pages that were removed", async () => {
    const pdf = await makeDocument(3);
    const layout = buildPages(3).filter((page) => page.id !== "p1");

    applyLayout(pdf, layout);

    expect(widths(pdf)).toEqual([100, 102]);
  });

  it("puts the pages out in the order the editor holds them", async () => {
    const pdf = await makeDocument(3);
    const [first, second, third] = buildPages(3) as [
      EditorPage,
      EditorPage,
      EditorPage,
    ];

    applyLayout(pdf, [third, first, second]);

    expect(widths(pdf)).toEqual([102, 100, 101]);
  });
});
