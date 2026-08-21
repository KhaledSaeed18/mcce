import {
  TUITION_DEFAULT_CREDITS_PER_SEMESTER,
  TUITION_DEFAULT_SEMESTERS_PER_YEAR,
  TUITION_MAX_SEMESTERS_PER_YEAR,
  TUITION_MIN_SEMESTERS_PER_YEAR,
} from "@/config/tuition";

export function createDefaultCredits(): number[] {
  return Array.from(
    { length: TUITION_DEFAULT_SEMESTERS_PER_YEAR },
    () => TUITION_DEFAULT_CREDITS_PER_SEMESTER
  );
}

export function clampSemesterCount(value: number): number {
  if (!Number.isFinite(value)) {
    return TUITION_DEFAULT_SEMESTERS_PER_YEAR;
  }

  return Math.min(
    TUITION_MAX_SEMESTERS_PER_YEAR,
    Math.max(TUITION_MIN_SEMESTERS_PER_YEAR, Math.round(value))
  );
}

/** Added semesters inherit the last entered value so the common case stays one edit. */
export function resizeCredits(current: number[], count: number): number[] {
  if (count <= current.length) {
    return current.slice(0, count);
  }

  const fallback = current.at(-1) ?? TUITION_DEFAULT_CREDITS_PER_SEMESTER;

  return [
    ...current,
    ...Array.from({ length: count - current.length }, () => fallback),
  ];
}
