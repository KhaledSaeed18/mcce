import type { jsPDF } from "jspdf";
import { FOOTER_DISCLAIMER } from "@/config/footer";
import { SITE_URL } from "@/config/site";
import { drawBreakdown } from "@/lib/tuition/export-pdf-rows";
import {
  BRAND_COLOR,
  LBP_COLUMN_X,
  MUTED_COLOR,
  PAGE_MARGIN,
  PAPER_COLOR,
  TEXT_COLOR,
  USD_COLUMN_X,
} from "@/lib/tuition/pdf-theme";
import type { TuitionScenario } from "@/lib/tuition/types";

export async function buildTuitionPdf(
  scenario: TuitionScenario
): Promise<jsPDF> {
  const { jsPDF: JsPdf } = await import("jspdf");
  const doc = new JsPdf({ format: "letter", unit: "pt" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const { calculation, plan } = scenario;
  const chargeSemester = calculation.semesters[plan.chargeSemesterIndex];

  doc.setFillColor(...PAPER_COLOR);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  doc.setFillColor(...BRAND_COLOR);
  doc.rect(0, 0, pageWidth, 72, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(...TEXT_COLOR);
  doc.text("MCCE Tuition Planning", PAGE_MARGIN, 42);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(
    `Semesters this year: ${calculation.semesters.length} | Yearly charges billed in: ${chargeSemester?.label ?? "-"}`,
    PAGE_MARGIN,
    90
  );
  doc.text(
    `Registration included: ${plan.includeRegistration ? "Yes" : "No"} | NSSF included: ${plan.includeNssf ? "Yes" : "No"}`,
    PAGE_MARGIN,
    106
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Item", PAGE_MARGIN, 138);
  doc.text("USD", USD_COLUMN_X, 138, { align: "right" });
  doc.text("LBP", LBP_COLUMN_X, 138, { align: "right" });

  let cursorY = 160;
  for (const semester of calculation.semesters) {
    cursorY = drawBreakdown(
      doc,
      `${semester.label} semester`,
      semester,
      cursorY
    );
  }
  drawBreakdown(
    doc,
    "Annual projection",
    calculation.annualProjection,
    cursorY
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...MUTED_COLOR);
  doc.text(FOOTER_DISCLAIMER, PAGE_MARGIN, pageHeight - 20);
  doc.text(SITE_URL, pageWidth - PAGE_MARGIN, pageHeight - 20, {
    align: "right",
  });

  return doc;
}
