import type { MaterialType } from "../../src/lib/drive/types";

/**
 * First match wins within a segment, so a folder named "Exams+Assignments"
 * reads as exams: a student hunting a past paper is worse served by a miss
 * than a student hunting a homework sheet.
 */
const SEGMENT_PATTERNS: [MaterialType, RegExp][] = [
  ["exam", /exam|assessment|midterm|\bfinal\b|quiz|\btests?\b/i],
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
 * so "Exams+Assignments / Assignments | 2025-2026 / Assignment3" reads as an
 * assignment rather than inheriting the exam label from the top of the path.
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
