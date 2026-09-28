import { PDFDocument, StandardFonts } from "pdf-lib";
import type { SummaryBlock } from "./summary-blocks";
import { createSummaryWriter } from "./summary-writer";

/** A revision summary on its own pages: one when it fits, more when it runs on. */
export async function buildSummaryPdf(
  blocks: readonly SummaryBlock[]
): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const [regular, bold] = await Promise.all([
    pdf.embedFont(StandardFonts.Helvetica),
    pdf.embedFont(StandardFonts.HelveticaBold),
  ]);
  const write = createSummaryWriter(pdf, { bold, regular });
  for (const block of blocks) {
    write(block);
  }
  return await pdf.save();
}
