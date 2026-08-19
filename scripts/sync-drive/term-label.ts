import { PAPER_MATERIAL_TYPES } from "../../src/config/materials";
import type { MaterialType } from "../../src/lib/drive/types";

/** Two four-digit years, which keeps a lone year in a book title from reading as a term. */
const ACADEMIC_YEAR_PATTERN = /(20\d{2})\s*[-/]\s*(20\d{2})/;
const TRAILING_TERM_PATTERN = /\b(fall|spring|sp|summer)[\s\-_|]*$/i;
const SEMESTER_TERM_PATTERN = /fall|spring|summer/i;
const BARE_YEAR_PATTERN = /\((19|20)(\d{2})\)|\b(19|20)(\d{2})\b/;

const TERM_LABELS: Record<string, string> = {
  fall: "Fall",
  sp: "Spring",
  spring: "Spring",
  summer: "Summer",
};

/** Fall opens an academic year; Spring and Summer close the one before them. */
const TERM_YEAR_OFFSET: Record<string, number> = {
  Fall: 0,
  Spring: -1,
  Summer: -1,
};

export function academicYearFor(term: string, year: number): string {
  const start = year + (TERM_YEAR_OFFSET[term] ?? 0);
  return `${start}-${start + 1}`;
}

export interface TermContext {
  materialType: MaterialType;
  /** The semester folder the course sits under, e.g. "First Year | Fall Semester". */
  semester: string | null;
}

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

function termOfSemester(semester: string | null): string | null {
  if (!semester) {
    return null;
  }
  const match = SEMESTER_TERM_PATTERN.exec(semester);
  return match ? TERM_LABELS[match[0].toLowerCase()] : null;
}

/**
 * A paper named only "(2021)Midterm" still says which term it belongs to, because
 * the course it sits in runs in exactly one semester. Restricted to exam and
 * assessment papers: a year in a book title or a lecture slide is a publication
 * date, not a term.
 */
function inferFromBareYear(
  fileName: string,
  context: TermContext
): string | null {
  if (!PAPER_MATERIAL_TYPES.has(context.materialType)) {
    return null;
  }

  const term = termOfSemester(context.semester);
  const match = BARE_YEAR_PATTERN.exec(fileName);
  if (!(term && match)) {
    return null;
  }

  const year = Number(`${match[1] ?? match[3]}${match[2] ?? match[4]}`);
  return `${term} ${academicYearFor(term, year)}`;
}

/**
 * The file's own name outranks its folders here, the opposite of material type:
 * one exam folder holds papers from 2020-2021, 2024-2025, and 2025-2026, so only
 * the file name identifies which term a paper is from.
 */
export function parseTermLabel(
  folderSegments: string[],
  fileName: string | null,
  context: TermContext
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

  return fileName ? inferFromBareYear(fileName, context) : null;
}
