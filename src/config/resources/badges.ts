import type { COURSE_CARD_COLORS } from "@/config/courses";
import type { AccessBadge, BadgeFilter } from "@/lib/resources/types";

export const ACCESS_BADGE_LABELS: Record<AccessBadge, string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
  student: "Student",
  trial: "Trial",
};

export const OPEN_SOURCE_LABEL = "Open Source";

/** One line each, for the filter legend and the badge tooltip. */
export const BADGE_FILTER_EXPLANATIONS: Record<BadgeFilter, string> = {
  free: "The core of the tool costs nothing: no trial clock, no card, no limit that matters for coursework.",
  freemium:
    "A real free tier covers coursework. Paid tiers add capacity or extras you can live without.",
  "open-source":
    "The source code is public under an open licence. You can read it, run it yourself, and cite it. Shown next to the cost badge, since open source software can still be hosted for a fee.",
  paid: "Payment is expected for the use that matters here. Listed only when a free alternative sits nearby or a library may provide it.",
  student:
    "Free or expanded after student verification, usually an academic email or a student program.",
  trial:
    "Free only for a limited time, then paid. A trial is never called free.",
};

/** Filter order, most-used first. */
export const BADGE_FILTERS: BadgeFilter[] = [
  "free",
  "open-source",
  "freemium",
  "trial",
  "paid",
];

/** Colour is never the only carrier: the badge text is always shown. */
export const ACCESS_BADGE_COLORS: Record<
  AccessBadge,
  (typeof COURSE_CARD_COLORS)[number]
> = {
  free: "chart-2",
  freemium: "chart-1",
  paid: "chart-5",
  student: "chart-3",
  trial: "chart-4",
};
export const ACCOUNT_REQUIRED_NOTE = "Account required.";
export const EXPERIMENTAL_NOTE = "New in 2026, still settling.";
