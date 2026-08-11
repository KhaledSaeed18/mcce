import { COURSE_CARD_COLORS } from "@/config/courses";

export interface MarginPatternItem {
  code: string;
  color: (typeof COURSE_CARD_COLORS)[number];
  rotation: number;
  top: number;
}

const LEFT_CODES = [
  "CENG507",
  "CENG566",
  "EENG527",
  "EENG587",
  "ENGG515",
] as const;

const RIGHT_CODES = ["CENG557", "CENG566L", "CENG675", "EENG537"] as const;

const BASE_ROTATION_DEG = 6;

function buildMarginPattern(codes: readonly string[]): MarginPatternItem[] {
  return codes.map((code, index) => ({
    code,
    color: COURSE_CARD_COLORS[index % COURSE_CARD_COLORS.length],
    rotation: index % 2 === 0 ? -BASE_ROTATION_DEG : BASE_ROTATION_DEG,
    top: ((index + 1) / (codes.length + 1)) * 100,
  }));
}

export const MARGIN_PATTERN_LEFT = buildMarginPattern(LEFT_CODES);
export const MARGIN_PATTERN_RIGHT = buildMarginPattern(RIGHT_CODES);
