import type { MaterialType } from "../../src/lib/drive/types";

/**
 * First match wins within a segment. Assessments are tested before exams so an
 * in-semester quiz does not read as a midterm: the two sit in separate folders
 * and students look for them separately.
 */
const SEGMENT_PATTERNS: [MaterialType, RegExp][] = [
  ["assessment", /assessment|quiz/iu],
  ["exam", /exam|midterm|\bfinal\b|\btests?\b/iu],
  ["assignment", /assignment|homework|\bhw\b|project/iu],
  ["exercise", /exercise|problem set|\bset \d|tutorial|practice/iu],
  ["lab", /\blabs?\b|laborator|experiment/iu],
  ["book", /\bbooks?\b|textbook/iu],
  ["lecture", /lecture|material|slide|chapter|note|summar|session/iu],
];

/**
 * A numbered folder groups one week's worth of files; it does not say what they
 * are. "Self Assessments / Lecture 06" holds self-assessments, so the category
 * folder above has to outrank the numbered one below it.
 */
const NUMBERED_GROUP =
  /^(?:lecture|chapter|set|assignment|homework|experiment|assessment)s?\s*\d+(?:\s*[&+-]\s*\d+)?$/iu;

function matchSegment(segment: string): MaterialType | null {
  for (const [type, pattern] of SEGMENT_PATTERNS) {
    if (pattern.test(segment)) {
      return type;
    }
  }
  return null;
}

function matchDeepestFirst(
  segments: string[],
  skipNumbered: boolean
): MaterialType | null {
  for (const segment of [...segments].reverse()) {
    if (skipNumbered && NUMBERED_GROUP.test(segment.trim())) {
      continue;
    }
    const match = matchSegment(segment);
    if (match) {
      return match;
    }
  }
  return null;
}

/**
 * Folders win over the file name, and the deepest folder wins over its parents,
 * except that a bare numbered folder defers to the category folder above it.
 */
export function classifyMaterialType(
  folderSegments: string[],
  fileName: string | null
): MaterialType {
  const fromCategory = matchDeepestFirst(folderSegments, true);
  if (fromCategory) {
    return fromCategory;
  }

  const fromNumbered = matchDeepestFirst(folderSegments, false);
  if (fromNumbered) {
    return fromNumbered;
  }

  if (fileName) {
    return matchSegment(fileName) ?? "other";
  }

  return "other";
}
