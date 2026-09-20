import type { COURSE_CARD_COLORS } from "@/config/courses";
import type { AccessBadge, BadgeFilter } from "@/lib/resources/types";

export const ACCESS_BADGE_LABELS: Record<AccessBadge, string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
  student: "Student",
  trial: "Trial",
  university: "University Access",
};

export const OPEN_SOURCE_LABEL = "Open Source";

/** One line each, for the filter legend and the badge tooltip. */
export const BADGE_FILTER_EXPLANATIONS: Record<BadgeFilter, string> = {
  free: "Core use costs nothing, no trial clock, no card.",
  freemium: "A real free tier covers coursework; paid tiers add capacity.",
  "open-source": "Source is public under an open licence.",
  paid: "Payment expected for the relevant use.",
  student: "Free or expanded after student verification.",
  trial: "Free only for a limited time, then paid.",
  university: "Depends on an LIU subscription or campus licence.",
};

/** Filter order, most-used first. */
export const BADGE_FILTERS: BadgeFilter[] = [
  "free",
  "open-source",
  "freemium",
  "student",
  "university",
  "trial",
  "paid",
];

/** Colour is never the only carrier: the badge text is always shown. */
export const ACCESS_BADGE_COLORS: Record<
  AccessBadge,
  (typeof COURSE_CARD_COLORS)[number] | null
> = {
  free: "chart-2",
  freemium: "chart-1",
  paid: "chart-5",
  student: "chart-3",
  trial: "chart-4",
  university: null,
};

export const LIU_VERIFICATION_NOTE = "Confirm access with the LIU library.";
export const ACCOUNT_REQUIRED_NOTE = "Account required.";
export const EXPERIMENTAL_NOTE = "New in 2026, still settling.";
