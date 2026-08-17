import {
  GPA_CALCULATOR_PATH,
  GPA_SHARE_PARAM,
  GPA_SHARE_SEPARATOR,
  GPA_SHARE_UNGRADED,
} from "@/config/gpa";
import type { GradeEntry } from "../types";

/**
 * Positional in curriculum order, so no course code reaches the URL. Trailing
 * ungraded slots are dropped: decoding treats a missing slot as ungraded, and
 * an early-in-the-degree student would otherwise carry a tail of placeholders.
 */
export function encodeShareValue(entries: GradeEntry[]): string {
  const slots = entries.map((entry) =>
    entry.average === null ? GPA_SHARE_UNGRADED : String(entry.average)
  );

  while (slots.at(-1) === GPA_SHARE_UNGRADED) {
    slots.pop();
  }

  return slots.join(GPA_SHARE_SEPARATOR);
}

export function buildShareUrl(origin: string, value: string): string {
  const search = new URLSearchParams({ [GPA_SHARE_PARAM]: value });

  return `${origin}${GPA_CALCULATOR_PATH}?${search}`;
}
