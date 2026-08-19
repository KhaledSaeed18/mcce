import type { MaterialType } from "../../src/lib/drive/types";

/**
 * First match wins within a segment. Assessments are tested before exams so an
 * in-semester quiz does not read as a midterm: the two sit in separate folders
 * and students look for them separately.
 */
const SEGMENT_PATTERNS: [MaterialType, RegExp][] = [
  ["assessment", /assessment|quiz/i],
  ["exam", /exam|midterm|\bfinal\b|\btests?\b/i],
  ["assignment", /assignment|homework|\bhw\b|project/i],
  ["exercise", /exercise|problem set|\bset \d|tutorial|practice/i],
  ["lab", /\blabs?\b|laborator|experiment/i],
  ["book", /\bbooks?\b|textbook/i],
  ["lecture", /lecture|material|slide|chapter|note|summar|session/i],
];

function matchSegment(segment: string): MaterialType | null {
  for (const [type, pattern] of SEGMENT_PATTERNS) {
    if (pattern.test(segment)) {
      return type;
    }
  }
  return null;
}

/**
 * Folders win over the file name, and the deepest folder wins over its parents,
 * so "Exams / Assignments / Assignment 03" reads as an assignment rather than
 * inheriting the exam label from the top of the path.
 */
export function classifyMaterialType(
  folderSegments: string[],
  fileName: string | null
): MaterialType {
  for (const segment of [...folderSegments].reverse()) {
    const match = matchSegment(segment);
    if (match) {
      return match;
    }
  }

  if (fileName) {
    return matchSegment(fileName) ?? "other";
  }

  return "other";
}
