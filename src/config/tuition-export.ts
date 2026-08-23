export const TUITION_PDF_FILE_NAME = "mcce-tuition-report.pdf";
export const TUITION_CSV_FILE_NAME = "mcce-tuition.csv";
export const TUITION_JSON_FILE_NAME = "mcce-tuition.json";

export const TUITION_SHARE_TITLE = "MCCE tuition report";
export const TUITION_SHARE_TEXT =
  "Tuition plan for the LIU MCCE program, with the yearly charges and totals.";

/* PDF layout, in points. */
export const TUITION_PDF_PAGE_MARGIN = 40;
export const TUITION_PDF_HEADER_HEIGHT = 70;
export const TUITION_PDF_LOGO_SIZE = 44;
export const TUITION_PDF_LOGO_URL = "/icon-192.png";
export const TUITION_PDF_TILE_HEIGHT = 54;
export const TUITION_PDF_BAR_ROW_HEIGHT = 26;
export const TUITION_PDF_BAR_HEIGHT = 10;
export const TUITION_PDF_BAR_LABEL_WIDTH = 96;
/** Room a drawn row needs, used to decide a page break before it starts. */
export const TUITION_PDF_TABLE_ROW_HEIGHT = 20;
export const TUITION_PDF_TABLE_CHROME_HEIGHT = 60;
export const TUITION_PDF_CHART_CHROME_HEIGHT = 56;

/** Mirrors the on-page tokens from styles.css so exports match the site. */
export const TUITION_PDF_BRAND_COLOR: readonly [number, number, number] = [
  255, 159, 28,
];
export const TUITION_PDF_PAPER_COLOR: readonly [number, number, number] = [
  255, 247, 232,
];
export const TUITION_PDF_CARD_COLOR: readonly [number, number, number] = [
  255, 237, 205,
];
export const TUITION_PDF_TEXT_COLOR: readonly [number, number, number] = [
  23, 23, 23,
];
export const TUITION_PDF_MUTED_COLOR: readonly [number, number, number] = [
  110, 110, 110,
];
export const TUITION_PDF_RULE_COLOR: readonly [number, number, number] = [
  228, 205, 168,
];

/** One color per charge, reused by the bars and their legend. */
export const TUITION_PDF_TUITION_COLOR: readonly [number, number, number] = [
  217, 130, 0,
];
export const TUITION_PDF_REGISTRATION_COLOR: readonly [number, number, number] =
  [124, 92, 214];
export const TUITION_PDF_NSSF_COLOR: readonly [number, number, number] = [
  14, 149, 148,
];
export const TUITION_PDF_LBP_COLOR: readonly [number, number, number] = [
  26, 106, 176,
];
