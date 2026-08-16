import type { AcademicStanding, ScaleReference } from "@/lib/gpa/types";

/**
 * LIU converts a course average straight to quality points along a line, with
 * no letter-grade bands in between: quality points are (average - 50) / 10,
 * flattening to 4.0 at 90 and above.
 *
 * The catalogue's three anchors (2.0 is 70/100, 2.5 is 75%, 3.0 is 80/100) sit
 * exactly on this line, which is why they cannot distinguish it from a banded
 * scale on their own. A MyLIU transcript can: banded rounding puts a 12-credit
 * semester of 85/78/72/74 at 2.50, while the portal and this line both give
 * 2.72. Verified across two semesters and the cumulative figure.
 */
export const QPT_AVERAGE_OFFSET = 50;
export const QPT_AVERAGE_DIVISOR = 10;

export const MAX_QUALITY_POINTS = 4;
export const MIN_PASSING_QUALITY_POINTS = 1;
export const MAX_COURSE_AVERAGE = 100;

/** Below this a course fails and earns no quality points. */
export const PASSING_AVERAGE = 60;
/** At and above this every average is worth the same 4.0. */
export const MAX_QUALITY_POINT_AVERAGE = 90;

/** MCCE total, stated in LIU University Catalogue 2022-2023 section 4.7.1. */
export const MCCE_DEGREE_CREDITS = 52;

/**
 * School of Engineering graduate students need 2.0, not the 3.0 that applies to
 * every other LIU graduate program. Catalogue section 2.10 excepts engineering,
 * and 4.5.2 states 70% (2.0) outright: SoEN follows undergraduate CGPA rules so
 * its graduates qualify for the Lebanese Order of Engineers.
 */
export const GRADUATION_MIN_GPA = 2;
export const PROBATION_GPA = 2;

export const PROBATION_STATUS: AcademicStanding = {
  label: "Probation",
  minGpa: 0,
  tone: "probation",
};

/**
 * Inferred, not documented. MyLIU labels a 3.10 cumulative "Very Good", which
 * fits these thresholds, but only that one point is confirmed.
 */
export const GPA_STATUSES: AcademicStanding[] = [
  { label: "Excellent", minGpa: 3.5, tone: "distinguished" },
  { label: "Very good", minGpa: 3, tone: "honors" },
  { label: "Good", minGpa: 2.5, tone: "good" },
  { label: "Fair", minGpa: 2, tone: "good" },
  PROBATION_STATUS,
];

/** Reference points on the line, for the on-page scale table. */
export const SCALE_REFERENCES: ScaleReference[] = [
  { average: "90–100", qualityPoints: 4 },
  { average: "85", qualityPoints: 3.5 },
  { average: "80", qualityPoints: 3 },
  { average: "75", qualityPoints: 2.5 },
  { average: "70", qualityPoints: 2 },
  { average: "65", qualityPoints: 1.5 },
  { average: "60", qualityPoints: 1 },
  { average: "Below 60", qualityPoints: 0 },
];

export const LIU_CATALOGUE_URL =
  "https://syslb.liu.edu.lb/syslbdatadir/Documents/09_University_Catalog.pdf";

/** Axis ticks for the 0 to 4 GPA scale used by every chart on the page. */
export const GPA_AXIS_TICKS = [4, 3, 2, 1, 0];
/** Widest a column is allowed to get, so a two-semester chart stays readable. */
export const CHART_BAR_MAX_WIDTH = 24;
/**
 * Caps plot width to the data. Stretching two semesters across a full-width card
 * flattens the cumulative line and reads as no movement at all.
 */
export const CHART_WIDTH_PER_POINT = 170;

export const GPA_DECIMAL_PLACES = 2;
export const DEFAULT_TARGET_GPA = 3;
export const GPA_STORAGE_KEY = "mcce.gpa-calculator.v1";
