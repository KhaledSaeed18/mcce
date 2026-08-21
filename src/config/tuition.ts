export const TUITION_PAGE_PATH = "/tuition-fees";

export const TUITION_ACADEMIC_YEAR_LABEL = "2025/2026";
export const TUITION_PROGRAM_LABEL = "MS Engineering (Graduate programs)";

export const TUITION_USD_PER_CREDIT = 135;
export const TUITION_LBP_PER_CREDIT = 7_500_000;

export const TUITION_AVERAGE_CREDITS_PER_YEAR = 26;
export const TUITION_NUMBER_OF_YEARS = 2;

export const TUITION_TOTAL_USD_PER_YEAR = 3510;
export const TUITION_TOTAL_LBP_PER_YEAR = 195_000_000;

export const TUITION_REGISTRATION_USD_YEARLY = 150;
export const TUITION_NSSF_LBP_YEARLY = 8_400_000;

export const TUITION_OFFICIAL_PAGE_URL =
  "https://liu.edu.lb/cms26/public/page.php?slug=tuition";

export const TUITION_PRICE_CHANGE_NOTE =
  "The prices above are subject to change without notice.";

export const TUITION_WARNING_NOTE =
  "This is an independent planning tool. Always verify the latest numbers on official LIU pages before payment.";

export const TUITION_SEMESTER_LABELS = ["Fall", "Spring", "Summer"] as const;

export const TUITION_MIN_SEMESTERS_PER_YEAR = 1;
export const TUITION_MAX_SEMESTERS_PER_YEAR = TUITION_SEMESTER_LABELS.length;
export const TUITION_DEFAULT_SEMESTERS_PER_YEAR = 2;

export const TUITION_DEFAULT_CREDITS_PER_SEMESTER = 13;
export const TUITION_MAX_CREDITS_PER_SEMESTER = 21;

export const TUITION_YEARLY_CHARGE_NOTE =
  "Registration and NSSF are yearly charges billed in one semester, usually fall, not split across semesters.";

export const TUITION_DEFAULT_USD_TO_LBP_RATE = 89_000;
export const TUITION_MIN_USD_TO_LBP_RATE = 1;
export const TUITION_USD_TO_LBP_RATE_STEP = 1000;

export const TUITION_RATE_NOTE =
  "LBP charges are converted at the rate you set, then added to the USD total.";
