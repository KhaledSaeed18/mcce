import { PDFDocument } from "pdf-lib";
import { describe, expect, it } from "vitest";
import { buildPages } from "../pages";
import { collectStudyItems, groupStudyItems } from "../study-items";
import type { Annotation } from "../types";
import { buildSummaryPdf } from "./build-summary-pdf";
import { buildSummaryBlocks } from "./summary-blocks";

function note(id: string, pageId: string, text: string): Annotation {
  return { color: "#ffd60a", id, pageId, text, type: "note", x: 0, y: 0 };
}

async function pageCount(annotations: Annotation[]): Promise<number> {
  const groups = groupStudyItems(
    collectStudyItems(annotations, buildPages(40))
  );
  const bytes = await buildSummaryPdf(
    buildSummaryBlocks("Midterm.pdf", groups)
  );
  return (await PDFDocument.load(bytes)).getPageCount();
}

describe("buildSummaryBlocks", () => {
  it("heads the summary with the file and lists items under their page", () => {
    const groups = groupStudyItems(
      collectStudyItems([note("a", "p2", "Recheck")], buildPages(3))
    );

    expect(buildSummaryBlocks("Midterm.pdf", groups)).toEqual([
      { kind: "title", text: "Midterm.pdf" },
      { kind: "subtitle", text: "Revision summary" },
      { kind: "heading", text: "Page 3" },
      { kind: "item", text: "Recheck" },
    ]);
  });
});

describe("buildSummaryPdf", () => {
  it("fits a short summary on one page", async () => {
    expect(await pageCount([note("a", "p0", "One note")])).toBe(1);
  });

  it("runs a long summary onto more pages", async () => {
    const notes = Array.from({ length: 40 }, (_, index) =>
      note(
        `n${index}`,
        `p${index}`,
        "A note long enough to need a line or two. ".repeat(3)
      )
    );

    expect(await pageCount(notes)).toBeGreaterThan(1);
  });

  it("writes a note in a script the font lacks rather than failing", async () => {
    expect(await pageCount([note("a", "p0", "راجع الإشارة, then check")])).toBe(
      1
    );
  });
});
