import type { MaterialType } from "@/lib/drive/types";
import { findFileChip } from "./file-chip";
import type { TabLabel } from "./types";

const EXTENSION = /\.pdf$/i;
/** Tags that only say what the chip already says. */
const CHIP_TAG = /\[[^\]]*(?:solution|solved|book)[^\]]*\]/gi;
const COURSE_CODE = /\b[A-Z]{3,4}\d{3}[A-Z]?\b[-_]?/g;
const TERM = /(?:(?:Fall|Spring|Summer)[- ]?)?\d{4}-\d{4}/i;
/** A hyphen inside a year range like 2024-2025 stays; any other is a space. */
const PUNCTUATION = /[_()[\]]+|(?<!\d)-|-(?!\d)/g;
const LOWER_THEN_UPPER = /([a-z])(?=[A-Z])/g;
const LETTER_THEN_DIGIT = /([a-z])(?=\d)/g;
const DIGIT_THEN_LETTER = /(\d)(?=[A-Za-z])/g;
const SPACES = /\s+/g;

interface LabelSource {
  materialType: MaterialType | null;
  name: string;
}

function tidy(text: string): string {
  return text
    .replace(PUNCTUATION, " ")
    .replace(LOWER_THEN_UPPER, "$1 ")
    .replace(LETTER_THEN_DIGIT, "$1 ")
    .replace(DIGIT_THEN_LETTER, "$1 ")
    .replace(SPACES, " ")
    .trim();
}

function stripName(name: string): string {
  return name
    .replace(EXTENSION, "")
    .replace(CHIP_TAG, "")
    .replace(COURSE_CODE, "");
}

/** Short names for a row of tabs. The term drops from every name when all of
 * them share it, since it then tells the tabs apart from nothing. */
export function buildTabLabels(files: LabelSource[]): TabLabel[] {
  const stripped = files.map((file) => stripName(file.name));
  const terms = stripped.map((name) => name.match(TERM)?.[0].toLowerCase());
  const isTermShared =
    files.length > 1 && terms.every((term) => term && term === terms[0]);

  return files.map((file, index) => {
    const name = isTermShared
      ? stripped[index].replace(TERM, "")
      : stripped[index];
    return {
      chip: findFileChip(file.name, file.materialType),
      text: tidy(name) || file.name,
    };
  });
}
