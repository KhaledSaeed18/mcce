import type {
  GpaExportSectionOption,
  GpaExportSections,
} from "@/lib/gpa/export/types";

export const GPA_PDF_FILE_NAME = "mcce-gpa-report.pdf";
export const GPA_CSV_FILE_NAME = "mcce-grades.csv";
export const GPA_JSON_FILE_NAME = "mcce-gpa.json";

export const GPA_EXPORT_STORAGE_KEY = "mcce.gpa-export.v1";
export const GPA_SHARE_TITLE = "MCCE GPA report";
export const GPA_SHARE_TEXT =
  "Semester and cumulative GPA for the LIU MCCE program.";
/** Long enough for the new tab to load the blob before it is revoked. */
export const PREVIEW_URL_TTL_MS = 60_000;

export const DEFAULT_EXPORT_SECTIONS: GpaExportSections = {
  chart: true,
  contribution: true,
  courses: true,
  projection: true,
  summary: true,
  target: true,
};

/** Order here is the order sections appear in the PDF. */
export const GPA_EXPORT_SECTION_OPTIONS: GpaExportSectionOption[] = [
  {
    description: "Cumulative GPA, credits, quality points, and standing",
    id: "summary",
    label: "Summary",
  },
  {
    description: "Every course with its average and quality points",
    id: "courses",
    label: "Course grades",
  },
  {
    description: "Semester GPA against the cumulative line",
    id: "chart",
    label: "GPA chart",
  },
  {
    description: "Every graded course against your cumulative GPA",
    id: "contribution",
    label: "Course contributions",
  },
  {
    description: "The highest and lowest final GPA still reachable",
    id: "projection",
    label: "Projection",
  },
  {
    description: "The course average needed to hit your target",
    id: "target",
    label: "Target",
  },
];

/* PDF layout, in points. */
export const PDF_PAGE_MARGIN = 40;
export const PDF_HEADER_HEIGHT = 70;
export const PDF_LOGO_SIZE = 44;
export const PDF_LOGO_URL = "/icon-192.png";
export const PDF_CHART_HEIGHT = 170;
export const PDF_CHART_BAR_WIDTH = 18;
/** Same reason as the on-page cap: two points stretched wide flatten the line. */
export const PDF_CHART_WIDTH_PER_POINT = 110;

/** Mirrors the on-page tokens from styles.css so exports match the site. */
export const PDF_BRAND_COLOR: readonly [number, number, number] = [
  255, 159, 28,
];
export const PDF_PAPER_COLOR: readonly [number, number, number] = [
  255, 247, 232,
];
export const PDF_TEXT_COLOR: readonly [number, number, number] = [23, 23, 23];
export const PDF_MUTED_COLOR: readonly [number, number, number] = [
  110, 110, 110,
];
export const PDF_SEMESTER_COLOR: readonly [number, number, number] = [
  217, 130, 0,
];
export const PDF_CUMULATIVE_COLOR: readonly [number, number, number] = [
  124, 92, 214,
];
/** The contribution bars reuse the on-page pairing: the cumulative purple lifts, red drags. */
export const PDF_DRAG_COLOR: readonly [number, number, number] = [230, 57, 70];

/* Contribution chart layout, in points. */
export const PDF_CONTRIBUTION_ROW_HEIGHT = 14;
export const PDF_CONTRIBUTION_BAR_HEIGHT = 7;
export const PDF_CONTRIBUTION_LABEL_WIDTH = 62;
export const PDF_CONTRIBUTION_VALUE_WIDTH = 40;
