import type { jsPDF } from "jspdf";
import { FOOTER_DISCLAIMER } from "@/config/footer";
import { PROGRAM_NAME, SITE_NAME, SITE_URL } from "@/config/site";
import {
  TUITION_PDF_BRAND_COLOR,
  TUITION_PDF_HEADER_HEIGHT,
  TUITION_PDF_LOGO_SIZE,
  TUITION_PDF_LOGO_URL,
  TUITION_PDF_MUTED_COLOR,
  TUITION_PDF_PAGE_MARGIN,
  TUITION_PDF_PAPER_COLOR,
  TUITION_PDF_TEXT_COLOR,
} from "@/config/tuition-export";

/** Returns null rather than throwing, so a missing icon never blocks an export. */
export async function loadLogoDataUrl(): Promise<string | null> {
  try {
    const response = await fetch(TUITION_PDF_LOGO_URL);

    if (!response.ok) {
      return null;
    }

    const blob = await response.blob();

    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export function fillPageBackground(doc: jsPDF) {
  doc.setFillColor(...TUITION_PDF_PAPER_COLOR);
  doc.rect(
    0,
    0,
    doc.internal.pageSize.getWidth(),
    doc.internal.pageSize.getHeight(),
    "F"
  );
}

export function drawHeader(doc: jsPDF, logoDataUrl: string | null) {
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFillColor(...TUITION_PDF_BRAND_COLOR);
  doc.rect(0, 0, pageWidth, TUITION_PDF_HEADER_HEIGHT, "F");
  doc.setTextColor(...TUITION_PDF_TEXT_COLOR);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(`${SITE_NAME} Tuition Report`, TUITION_PDF_PAGE_MARGIN, 44);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(PROGRAM_NAME, TUITION_PDF_PAGE_MARGIN, 60);

  if (logoDataUrl) {
    doc.addImage(
      logoDataUrl,
      "PNG",
      pageWidth - TUITION_PDF_PAGE_MARGIN - TUITION_PDF_LOGO_SIZE,
      (TUITION_PDF_HEADER_HEIGHT - TUITION_PDF_LOGO_SIZE) / 2,
      TUITION_PDF_LOGO_SIZE,
      TUITION_PDF_LOGO_SIZE
    );
  }
}

export function drawFooters(doc: jsPDF, generatedAt: string) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const stamp = new Date(generatedAt).toLocaleDateString();
  const pageCount = doc.getNumberOfPages();

  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...TUITION_PDF_MUTED_COLOR);
    doc.text(
      `${FOOTER_DISCLAIMER} Generated ${stamp}.`,
      TUITION_PDF_PAGE_MARGIN,
      pageHeight - 20
    );
    doc.text(
      `${SITE_URL} · ${page} of ${pageCount}`,
      pageWidth - TUITION_PDF_PAGE_MARGIN,
      pageHeight - 20,
      { align: "right" }
    );
  }
}
