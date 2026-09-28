import type { PDFDocument, PDFFont, PDFPage } from "pdf-lib";
import {
  SUMMARY_BODY_SIZE,
  SUMMARY_BULLET_INDENT,
  SUMMARY_GAP_RATIO,
  SUMMARY_HEADING_SIZE,
  SUMMARY_LINE_RATIO,
  SUMMARY_MARGIN,
  SUMMARY_MUTED_COLOR,
  SUMMARY_PAGE_SIZE,
  SUMMARY_SUBTITLE_SIZE,
  SUMMARY_TITLE_SIZE,
} from "@/config/pdf-editor";
import { hexToRgb } from "../export/hex-to-rgb";
import type { SummaryBlock, SummaryBlockKind } from "./summary-blocks";
import { wrapText } from "./wrap-text";
import { toWritableText } from "./writable-text";

export interface SummaryFonts {
  bold: PDFFont;
  regular: PDFFont;
}

interface BlockStyle {
  font: keyof SummaryFonts;
  indent: number;
  isMuted: boolean;
  size: number;
}

const BLOCK_STYLES: Record<SummaryBlockKind, BlockStyle> = {
  heading: {
    font: "bold",
    indent: 0,
    isMuted: false,
    size: SUMMARY_HEADING_SIZE,
  },
  item: {
    font: "regular",
    indent: SUMMARY_BULLET_INDENT,
    isMuted: false,
    size: SUMMARY_BODY_SIZE,
  },
  subtitle: {
    font: "regular",
    indent: 0,
    isMuted: true,
    size: SUMMARY_SUBTITLE_SIZE,
  },
  title: { font: "bold", indent: 0, isMuted: false, size: SUMMARY_TITLE_SIZE },
};

const BULLET = "•";

/** Writes blocks down A4 pages, starting a new page when one fills up. A
 * heading is carried over with the first line under it rather than left at
 * the foot of a page on its own. */
export function createSummaryWriter(pdf: PDFDocument, fonts: SummaryFonts) {
  const [pageWidth, pageHeight] = SUMMARY_PAGE_SIZE;
  const muted = hexToRgb(SUMMARY_MUTED_COLOR);
  let page: PDFPage = pdf.addPage(SUMMARY_PAGE_SIZE);
  let y = pageHeight - SUMMARY_MARGIN;

  const makeRoom = (height: number) => {
    if (y - height < SUMMARY_MARGIN) {
      page = pdf.addPage(SUMMARY_PAGE_SIZE);
      y = pageHeight - SUMMARY_MARGIN;
    }
  };

  return (block: SummaryBlock) => {
    const style = BLOCK_STYLES[block.kind];
    const font = fonts[style.font];
    const lineHeight = style.size * SUMMARY_LINE_RATIO;
    const width = pageWidth - SUMMARY_MARGIN * 2 - style.indent;
    const lines = wrapText(toWritableText(font, block.text), width, (text) =>
      font.widthOfTextAtSize(text, style.size)
    );
    const color = style.isMuted ? muted : undefined;
    const next = BLOCK_STYLES.item.size * SUMMARY_LINE_RATIO;
    makeRoom(lineHeight + (block.kind === "heading" ? next : 0));

    for (const [index, line] of lines.entries()) {
      makeRoom(lineHeight);
      const baseline = y - style.size;
      if (index === 0 && block.kind === "item") {
        page.drawText(BULLET, {
          font,
          size: style.size,
          x: SUMMARY_MARGIN,
          y: baseline,
        });
      }
      page.drawText(line, {
        color,
        font,
        size: style.size,
        x: SUMMARY_MARGIN + style.indent,
        y: baseline,
      });
      y -= lineHeight;
    }
    y -= SUMMARY_BODY_SIZE * SUMMARY_GAP_RATIO;
  };
}
