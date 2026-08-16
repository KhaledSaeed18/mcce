import type { jsPDF } from "jspdf";
import { FOOTER_DISCLAIMER } from "@/config/footer";
import {
  PDF_BRAND_COLOR,
  PDF_HEADER_HEIGHT,
  PDF_LOGO_SIZE,
  PDF_LOGO_URL,
  PDF_MUTED_COLOR,
  PDF_PAGE_MARGIN,
  PDF_PAPER_COLOR,
  PDF_TEXT_COLOR,
} from "@/config/gpa-export";
import { PROGRAM_NAME, SITE_NAME, SITE_URL } from "@/config/site";

/** Returns null rather than throwing, so a missing icon never blocks an export. */
export async function loadLogoDataUrl(): Promise<string | null> {
  try {
    const response = await fetch(PDF_LOGO_URL);

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
  doc.setFillColor(...PDF_PAPER_COLOR);
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

  doc.setFillColor(...PDF_BRAND_COLOR);
  doc.rect(0, 0, pageWidth, PDF_HEADER_HEIGHT, "F");
  doc.setTextColor(...PDF_TEXT_COLOR);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(`${SITE_NAME} GPA Report`, PDF_PAGE_MARGIN, 44);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(PROGRAM_NAME, PDF_PAGE_MARGIN, 60);

  if (logoDataUrl) {
    doc.addImage(
      logoDataUrl,
      "PNG",
      pageWidth - PDF_PAGE_MARGIN - PDF_LOGO_SIZE,
      (PDF_HEADER_HEIGHT - PDF_LOGO_SIZE) / 2,
      PDF_LOGO_SIZE,
      PDF_LOGO_SIZE
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
    doc.setTextColor(...PDF_MUTED_COLOR);
    doc.text(
      `${FOOTER_DISCLAIMER} Generated ${stamp}.`,
      PDF_PAGE_MARGIN,
      pageHeight - 20
    );
    doc.text(
      `${SITE_URL} · ${page} of ${pageCount}`,
      pageWidth - PDF_PAGE_MARGIN,
      pageHeight - 20,
      { align: "right" }
    );
  }
}
