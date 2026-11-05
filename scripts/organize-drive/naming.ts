import { academicYearFor } from "../sync-drive/term-label";

const SOLUTION_ALIASES: [RegExp, string][] = [
  [/\[(?:solved|solution|solutions)\]/giu, "[Solution]"],
  [/\[solved-v(\d+)\]/giu, "[Solution]V$1-"],
  [/\[solution(\d+)\]/giu, "[Solution]V$1-"],
  [/\[solution-p(\d+)\]/giu, "[Solution]P$1-"],
  [/\[detailedsolution\]/giu, "[Detailed Solution]"],
  [/\[ai_solution\]/giu, "[AI Solution]"],
];

/** "SP" is how the assessment files spell Spring; the rest are already words. */
const TERM_WORDS: Record<string, string> = {
  fall: "Fall",
  sp: "Spring",
  spring: "Spring",
  summer: "Summer",
};

/** The lookahead keeps an already-correct "Fall-2024-2025" from expanding a second time. */
const SINGLE_YEAR_TERM =
  /\b(fall|spring|summer|sp)[\s\-_]?((?:19|20)\d{2})\b(?!\s*-\s*(?:19|20)\d{2})/giu;
const SPACED_ACADEMIC_YEAR =
  /\b(fall|spring|summer|sp)[\s\-_]?((?:19|20)\d{2})\s*-\s*((?:19|20)\d{2})\b/giu;
const PARENTHESISED_VERSION = /\(V(\d+)\)/giu;
const REPEATED_DASH = /-{2,}/gu;
const REPEATED_SPACE = /\s{2,}/gu;
const SPACED_DASH_PAIR = /-\s*-/gu;
const DASH_BEFORE_EXTENSION = /-(\.[a-z0-9]+)$/iu;

/**
 * Rewrites the term markers a file name already carries into one spelling.
 * Bare years with no term word are left alone: only the course's own semester
 * could resolve them, and guessing wrong would bury the file under a term it
 * was never sat in.
 */
export function normaliseTermMarkers(name: string): string {
  return name
    .replace(
      SPACED_ACADEMIC_YEAR,
      (_m, term: string, from: string, to: string) =>
        `${TERM_WORDS[term.toLowerCase()]}-${from}-${to}`
    )
    .replace(SINGLE_YEAR_TERM, (_m, term: string, year: string) => {
      const word = TERM_WORDS[term.toLowerCase()];
      return `${word}-${academicYearFor(word, Number(year))}`;
    });
}

export function normaliseSolutionMarkers(name: string): string {
  let out = name;
  for (const [pattern, replacement] of SOLUTION_ALIASES) {
    out = out.replace(pattern, replacement);
  }
  return out;
}

export function normaliseVersionMarkers(name: string): string {
  return name.replace(PARENTHESISED_VERSION, "V$1-");
}

/** Collapses the separator noise the rewrites above can leave behind. */
export function tidySeparators(name: string): string {
  return name
    .replace(REPEATED_DASH, "-")
    .replace(REPEATED_SPACE, " ")
    .replace(SPACED_DASH_PAIR, "-")
    .replace(DASH_BEFORE_EXTENSION, "$1")
    .trim();
}

export function normaliseFileName(name: string): string {
  return tidySeparators(
    normaliseVersionMarkers(
      normaliseSolutionMarkers(normaliseTermMarkers(name))
    )
  );
}
