/** Two four-digit years, which keeps a lone year in a book title from reading as a term. */
const ACADEMIC_YEAR_PATTERN = /(20\d{2})\s*[-/]\s*(20\d{2})/;
const TRAILING_TERM_PATTERN = /\b(fall|spring|sp|summer)[\s\-_|]*$/i;

const TERM_LABELS: Record<string, string> = {
  fall: "Fall",
  sp: "Spring",
  spring: "Spring",
  summer: "Summer",
};

function parseSegment(segment: string): string | null {
  const yearMatch = ACADEMIC_YEAR_PATTERN.exec(segment);
  if (!yearMatch) {
    return null;
  }

  const academicYear = `${yearMatch[1]}-${yearMatch[2]}`;
  const termMatch = TRAILING_TERM_PATTERN.exec(
    segment.slice(0, yearMatch.index)
  );
  if (!termMatch) {
    return academicYear;
  }

  return `${TERM_LABELS[termMatch[1].toLowerCase()]} ${academicYear}`;
}

/**
 * The file's own name outranks its folders here, the opposite of material type:
 * one "Exams+Assignments" folder holds papers from 2020-2021, 2024-2025, and
 * 2025-2026, so only the file name identifies which term a paper is from.
 */
export function parseTermLabel(
  folderSegments: string[],
  fileName: string | null
): string | null {
  const fromFileName = fileName ? parseSegment(fileName) : null;
  if (fromFileName) {
    return fromFileName;
  }

  for (const segment of [...folderSegments].reverse()) {
    const fromSegment = parseSegment(segment);
    if (fromSegment) {
      return fromSegment;
    }
  }

  return null;
}
