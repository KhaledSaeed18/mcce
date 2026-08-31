import { degrees, PDFDocument } from "pdf-lib";
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

    await applyLayout(pdf, buildPages(3));

    expect(widths(pdf)).toEqual([100, 101, 102]);
  });

  it("drops the pages that were removed", async () => {
    const pdf = await makeDocument(3);
    const layout = buildPages(3).filter((page) => page.id !== "p1");

    await applyLayout(pdf, layout);

    expect(widths(pdf)).toEqual([100, 102]);
  });

  it("puts the pages out in the order the editor holds them", async () => {
    const pdf = await makeDocument(3);
    const [first, second, third] = buildPages(3) as [
      EditorPage,
      EditorPage,
      EditorPage,
    ];

    await applyLayout(pdf, [third, first, second]);

    expect(widths(pdf)).toEqual([102, 100, 101]);
  });
});

describe("applyLayout turning pages", () => {
  it("turns a page as far as the editor has turned it", async () => {
    const pdf = await makeDocument(2);
    const layout = buildPages(2);
    layout[0].rotation = 90;

    await applyLayout(pdf, layout);

    expect(pdf.getPage(0).getRotation().angle).toBe(90);
    expect(pdf.getPage(1).getRotation().angle).toBe(0);
  });

  it("adds the turn to the one the page already had", async () => {
    const pdf = await makeDocument(1);
    pdf.getPage(0).setRotation(degrees(90));
    const layout = buildPages(1);
    layout[0].rotation = 180;

    await applyLayout(pdf, layout);

    expect(pdf.getPage(0).getRotation().angle).toBe(270);
  });
});

describe("applyLayout duplicating pages", () => {
  it("writes a page the editor holds twice out twice", async () => {
    const pdf = await makeDocument(3);
    const layout = buildPages(3);
    const copy: EditorPage = { ...layout[1], id: "copy" };

    await applyLayout(pdf, [layout[0], layout[1], copy, layout[2]]);

    expect(widths(pdf)).toEqual([100, 101, 101, 102]);
  });

  it("gives each appearance a page of its own rather than one shared", async () => {
    const pdf = await makeDocument(2);
    const layout = buildPages(2);
    const copy: EditorPage = { ...layout[0], id: "copy", rotation: 90 };

    await applyLayout(pdf, [layout[0], copy]);
    const [first, second] = pdf.getPages();

    expect(first).not.toBe(second);
    expect(first.getRotation().angle).toBe(0);
    expect(second.getRotation().angle).toBe(90);
  });
});
