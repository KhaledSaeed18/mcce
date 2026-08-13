const UNITS = ["B", "KB", "MB", "GB", "TB"] as const;
const UNIT_STEP = 1024;
const SEMESTER_WORD_PATTERN = /\s*Semester$/;

export function formatBytes(bytes: number | null): string {
  if (bytes === null || bytes <= 0) {
    return "—";
  }

  let value = bytes;
  let unitIndex = 0;
  while (value >= UNIT_STEP && unitIndex < UNITS.length - 1) {
    value /= UNIT_STEP;
    unitIndex += 1;
  }

  const precision = unitIndex === 0 ? 0 : 1;
  return `${value.toFixed(precision)} ${UNITS[unitIndex]}`;
}

/** Locale and time zone are pinned so server and client render identical
 * text -- Intl.DateTimeFormat(undefined, ...) resolves to the runtime's
 * default locale/time zone, which differs between server and browser and
 * causes a hydration mismatch (React error #418). */
export function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(new Date(iso));
}

/** "First Year | Fall Semester" -> "First Year · Fall". */
export function formatSemesterLabel(semester: string | null): string {
  if (!semester) {
    return "";
  }
  return semester
    .split("|")
    .map((part) => part.trim().replace(SEMESTER_WORD_PATTERN, ""))
    .join(" · ");
}
