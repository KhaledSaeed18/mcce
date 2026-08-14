import type { jsPDF } from "jspdf";
import { FOOTER_DISCLAIMER } from "@/config/footer";
import { PROGRAM_NAME, SITE_NAME, SITE_URL } from "@/config/site";
import {
  getProgramCredits,
  getSemesterCredits,
  getYearCredits,
} from "./credits";
import { flattenCourses } from "./lookup";
import type {
  CurriculumCourse,
  CurriculumSemester,
  CurriculumYear,
} from "./types";

export const CURRICULUM_PDF_FILE_NAME = "mcce-plan-of-study.pdf";

const LOGO_URL = "/icon-192.png";
const PAGE_MARGIN = 40;
const HEADER_HEIGHT = 70;
const LOGO_SIZE = 44;
/** --primary / --chart-1 from styles.css. */
const BRAND_COLOR: readonly [number, number, number] = [255, 159, 28];
/** --background (the site's paper color, not white) from styles.css. */
const PAPER_COLOR: readonly [number, number, number] = [255, 247, 232];
const TEXT_COLOR: readonly [number, number, number] = [23, 23, 23];
const MUTED_COLOR: readonly [number, number, number] = [110, 110, 110];

interface JsPdfWithAutoTable extends jsPDF {
  lastAutoTable?: { finalY: number };
}

function formatRequirementCodes(codes: string[]): string {
  return codes.length > 0 ? codes.join(", ") : "None";
}

function buildCourseRow(course: CurriculumCourse): (string | number)[] {
  return [
    course.code,
    course.name,
    course.credits,
    formatRequirementCodes(course.prerequisites),
    formatRequirementCodes(course.corequisites),
  ];
}

/** Fetches the app icon (paper background, rounded corners) as a data URL for embedding. */
async function loadLogoDataUrl(): Promise<string | null> {
  try {
    const response = await fetch(LOGO_URL);
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

function fillPageBackground(
  doc: JsPdfWithAutoTable,
  pageWidth: number,
  pageHeight: number
) {
  doc.setFillColor(...PAPER_COLOR);
  doc.rect(0, 0, pageWidth, pageHeight, "F");
}

function drawDocumentHeader(
  doc: JsPdfWithAutoTable,
  pageWidth: number,
  logoDataUrl: string | null
) {
  doc.setFillColor(...BRAND_COLOR);
  doc.rect(0, 0, pageWidth, HEADER_HEIGHT, "F");
  doc.setTextColor(...TEXT_COLOR);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(`${SITE_NAME} Plan of Study`, PAGE_MARGIN, 44);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(PROGRAM_NAME, PAGE_MARGIN, 60);

  if (logoDataUrl) {
    doc.addImage(
      logoDataUrl,
      "PNG",
      pageWidth - PAGE_MARGIN - LOGO_SIZE,
      (HEADER_HEIGHT - LOGO_SIZE) / 2,
      LOGO_SIZE,
      LOGO_SIZE
    );
  }
}

function drawSummaryLine(
  doc: JsPdfWithAutoTable,
  years: CurriculumYear[],
  cursorY: number
): number {
  doc.setTextColor(...MUTED_COLOR);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const courseCount = flattenCourses(years).length;
  doc.text(
    `${years.length} year${years.length === 1 ? "" : "s"}, ${getProgramCredits(years)} credits, ${courseCount} courses`,
    PAGE_MARGIN,
    cursorY
  );
  return cursorY + 26;
}

function drawFooters(
  doc: JsPdfWithAutoTable,
  pageWidth: number,
  pageHeight: number
) {
  const pageCount = doc.getNumberOfPages();
  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...MUTED_COLOR);
    doc.text(FOOTER_DISCLAIMER, PAGE_MARGIN, pageHeight - 20);
    doc.text(SITE_URL, pageWidth - PAGE_MARGIN, pageHeight - 20, {
      align: "right",
    });
  }
}

export async function buildCurriculumPdf(
  years: CurriculumYear[]
): Promise<jsPDF> {
  const [{ jsPDF: JsPdf }, { default: autoTable }, logoDataUrl] =
    await Promise.all([
      import("jspdf"),
      import("jspdf-autotable"),
      loadLogoDataUrl(),
    ]);

  const doc = new JsPdf({ format: "letter", unit: "pt" }) as JsPdfWithAutoTable;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  fillPageBackground(doc, pageWidth, pageHeight);
  drawDocumentHeader(doc, pageWidth, logoDataUrl);
  let cursorY = drawSummaryLine(doc, years, HEADER_HEIGHT + 26);

  const ensureSpace = (height: number) => {
    if (cursorY + height > pageHeight - PAGE_MARGIN) {
      doc.addPage();
      fillPageBackground(doc, pageWidth, pageHeight);
      cursorY = PAGE_MARGIN;
    }
  };

  const drawSemester = (semester: CurriculumSemester) => {
    ensureSpace(40);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.text(
      `${semester.label} · ${getSemesterCredits(semester)} credits · ${semester.courses.length} courses`,
      PAGE_MARGIN,
      cursorY
    );
    cursorY += 10;

    autoTable(doc, {
      body: semester.courses.map(buildCourseRow),
      columnStyles: { 2: { cellWidth: 45, halign: "center" } },
      head: [["Code", "Course", "Credits", "Prerequisites", "Corequisites"]],
      headStyles: {
        fillColor: [...BRAND_COLOR],
        fontStyle: "bold",
        textColor: [...TEXT_COLOR],
      },
      margin: { left: PAGE_MARGIN, right: PAGE_MARGIN },
      startY: cursorY,
      styles: {
        fillColor: [...PAPER_COLOR],
        fontSize: 9,
        textColor: [...TEXT_COLOR],
      },
      theme: "grid",
    });

    // lastAutoTable is set imperatively by the jspdf-autotable plugin at runtime,
    // not something the type checker can see as definitely assigned here.
    // biome-ignore lint/suspicious/noUnnecessaryConditions: see comment above
    cursorY = (doc.lastAutoTable?.finalY ?? cursorY) + 20;
  };

  for (const year of years) {
    ensureSpace(40);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(...TEXT_COLOR);
    const yearCourseCount = year.semesters.reduce(
      (total, semester) => total + semester.courses.length,
      0
    );
    doc.text(
      `${year.label} · ${getYearCredits(year)} credits · ${yearCourseCount} courses`,
      PAGE_MARGIN,
      cursorY
    );
    cursorY += 18;

    for (const semester of year.semesters) {
      drawSemester(semester);
    }
  }

  drawFooters(doc, pageWidth, pageHeight);

  return doc;
}
