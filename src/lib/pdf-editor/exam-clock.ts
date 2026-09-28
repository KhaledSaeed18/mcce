import type { ExamSession } from "./types";

const MS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 3600;

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

/** An exam of so many minutes, starting now. */
export function startExam(minutes: number, now: number): ExamSession {
  return {
    endsAt: now + minutes * SECONDS_PER_MINUTE * MS_PER_SECOND,
    minutes,
  };
}

/** How long is left, never less than nothing. */
export function getRemaining(session: ExamSession, now: number): number {
  return Math.max(0, session.endsAt - now);
}

/** Time left as a clock reads it: minutes and seconds, with hours in front
 * once there are any. A part second counts as a whole one, so the clock only
 * reads zero once time is really up. */
export function formatCountdown(ms: number): string {
  const total = Math.ceil(ms / MS_PER_SECOND);
  const hours = Math.floor(total / SECONDS_PER_HOUR);
  const minutes = Math.floor((total % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE);
  const seconds = total % SECONDS_PER_MINUTE;
  if (hours > 0) {
    return `${hours}:${pad(minutes)}:${pad(seconds)}`;
  }
  return `${pad(minutes)}:${pad(seconds)}`;
}

/** An exam's length the way it is said: "45 min", "2 h", "1 h 30 min". */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / SECONDS_PER_MINUTE);
  const rest = minutes % SECONDS_PER_MINUTE;
  if (hours === 0) {
    return `${rest} min`;
  }
  return rest === 0 ? `${hours} h` : `${hours} h ${rest} min`;
}

/** A stored exam, if what was read is one. */
export function parseExam(stored: unknown): ExamSession | null {
  if (typeof stored !== "object" || stored === null) {
    return null;
  }
  const { endsAt, minutes } = stored as Partial<ExamSession>;
  if (typeof endsAt !== "number" || typeof minutes !== "number") {
    return null;
  }
  return { endsAt, minutes };
}
